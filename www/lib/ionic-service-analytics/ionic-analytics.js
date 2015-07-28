/*!
 * Ionic Analytics Client
 * Copyright 2014 Drifty Co. http://drifty.com/
 * See LICENSE in this repository for license information
 */
(function(){
angular.module('ionic.service.analytics', ['ionic.service.core'])

.value('VERSION_NUMBER', '0.2.0')

/**
 * @ngdoc service
 * @name $ionicAnalytics
 * @module ionic.services.analytics
 * @description
 *
 * A simple yet powerful analytics tracking system.
 *
 * The simple format is eventCollection, eventData. Both are arbitrary but the eventCollection
 * should be the same as previous events if you wish to query on them later.
 *
 * @usage
 * ```javascript
 * $ionicAnalytics.track('order', {
 *   price: 39.99,
 *   item: 'Time Machine'
 * });
 *
 */
.provider('$ionicAnalytics', function() {

  this.$get = [
    '$q',
    '$timeout',
    '$rootScope',
    '$ionicApp',
    '$ionicUser',
    '$interval',
    '$http',
    'persistentStorage',
  function($q, $timeout, $rootScope, $ionicApp, $ionicUser, $interval, $http, persistentStorage) {

    var options = {};

    var api = {
      getAppId: function() {
        return $ionicApp.getApp().app_id;
      },
      getApiKey: function() {
        return $ionicApp.getApiKey();
      },
      getApiServer: function() {
        var server = $ionicApp.getValue('analytics_api_server');
        if (!server) {
          var msg = 'Ionic Analytics: You are using an old version of ionic-service-core. Update by running:\n    ' +
                    'ionic rm ionic-service-core\n    ' +
                    'ionic add ionic-service-core';
          throw Error(msg);
        }
        return server;
      },
      getAnalyticsKey: function() {
        return this.analyticsKey;
      },
      setAnalyticsKey: function(v) {
        this.analyticsKey = v;
      },
      hasAnalyticsKey: function() {
        return !!this.analyticsKey;
      },
      requestAnalyticsKey: function() {

        var req = {
          method: 'GET',
          url: $ionicApp.getApiUrl() + '/api/v1/app/' + this.getAppId() + '/keys/write',
          headers: {
            'Authorization': "basic " + btoa(this.getAppId() + ':' + this.getApiKey())
          },
		      withCredentials: false
        };
        return $http(req);
      },
      postEvent: function(name, data) {
        var payload = {
          name: [data]
        };

        var analyticsKey = this.getAnalyticsKey();
        if (!analyticsKey) {
          throw Error('Cannot send events to the analytics server without an Analytics key.')
        }

        var req = {
          method: 'POST',
          url: this.getApiServer() + '/api/v1/events/' + this.getAppId(),
          data: payload,
          headers: {
            "Authorization": analyticsKey,
            "Content-Type": "application/json"
          },
		  withCredentials: false
        }

        return $http(req);
      },
      postEvents: function(events) {
        var analyticsKey = this.getAnalyticsKey();
        if (!analyticsKey) {
          throw Error('Cannot send events to the analytics server without an Analytics key.')
        }

        var req = {
          method: 'POST',
          url: this.getApiServer() + '/api/v1/events/' + this.getAppId(),
          data: events,
          headers: {
            "Authorization": analyticsKey,
            "Content-Type": "application/json"
          },
		  withCredentials: false
        }

        return $http(req);
      }
    }

    var cache = {
      get: function(key) {
        key = this.scopeKey(key);
        return persistentStorage.retrieveObject(key);
      },
      set: function(key, value) {
        key = this.scopeKey(key);
        return persistentStorage.storeObject(key, value);
      },
      scopeKey: function(key) {
        return 'ionic_analytics_' + key + '_' + api.getAppId();
      }
    };

    var useEventCaching = true,
        dispatchInterval,
        dispatchIntervalTime;

    function connectedToNetwork() {
      // Can't access navigator stuff? Just assume connected.
      if (typeof navigator.connection === 'undefined' ||
          typeof navigator.connection.type === 'undefined' ||
          typeof Connection === 'undefined') {
        return true;
      }

      // Otherwise use the PhoneGap Connection plugin to determine the network state
      var networkState = navigator.connection.type;
      return networkState == Connection.ETHERNET ||
             networkState == Connection.WIFI ||
             networkState == Connection.CELL_2G ||
             networkState == Connection.CELL_3G ||
             networkState == Connection.CELL_4G ||
             networkState == Connection.CELL;
    }

    function dispatchQueue() {
      var eventQueue = cache.get('event_queue') || {};

      if (Object.keys(eventQueue).length === 0) return;
      if (!connectedToNetwork()) return;



      persistentStorage.lockedAsyncCall(cache.scopeKey('event_dispatch'), function() {

        // Send the analytics data to the proxy server
        return api.postEvents(eventQueue);
      }).then(function(data) {

        // Success from proxy server. Erase event queue.
        console.log('Ionic Analytics: sent events', eventQueue);
        cache.set('event_queue', {});

      }, function(err) {

        if (err === 'in_progress') {
        } else if (err === 'last_call_interrupted') {
          cache.set('event_queue', {});
        } else {

          // If we didn't connect to the server at all -> keep events
          if (!err.status) {
            console.error('Error sending analytics data: Failed to connect to analytics server.');
          }

          // If we connected to the server but our events were rejected -> erase events
          else {
            console.error('Error sending analytics data: Server responded with error', eventQueue, {
              'status': err.status,
              'error': err.data
            });
            cache.set('event_queue', {});
          }
        }
      });
    }

    function enqueueEvent(collectionName, eventData) {
      if (options.dryRun) {
        console.log('Ionic Analytics: event recieved but not sent (dryRun active):', collectionName, eventData);
        return;
      }

      console.log('Ionic Analytics: enqueuing event to send later:', collectionName, eventData);

      // Add timestamp property to the data
      if (!eventData.keen) {
        eventData.keen = {};
      }
      eventData.keen.timestamp = new Date().toISOString();

      // Add the data to the queue
      var eventQueue = cache.get('event_queue') || {};
      if (!eventQueue[collectionName]) {
        eventQueue[collectionName] = [];
      }
      eventQueue[collectionName].push(eventData);

      // Write the queue to disk
      cache.set('event_queue', eventQueue);
    }

    function setDispatchInterval(value) {
      // Set how often we should send batch events to Keen, in seconds.
      // Set this to a nonpositive number to disable event caching
      dispatchIntervalTime = value;

      // Clear the existing interval and set a new one.
      if (dispatchInterval) {
        $interval.cancel(dispatchInterval);
      }

      if (value > 0) {
        dispatchInterval = $interval(function() { dispatchQueue(); }, value * 1000);
        useEventCaching = true;
      } else {
        useEventCaching = false;
      }
    }

    function getDispatchInterval() {
      return dispatchIntervalTime;
    }

    var globalProperties = {};
    var globalPropertiesFns = [];

    return {

      // Register to get an analytics key
      register: function(optionsParam) {

        if (!api.getAppId() || !api.getApiKey()) {
          var msg = 'You need to provide an app id and api key before calling $ionicAnalytics.register().\n    ' +
                    'See http://docs.ionic.io/v1.0/docs/io-quick-start';
          throw new Error(msg);
        }

        options = optionsParam || {};
        if (options.dryRun) {
          console.log('Ionic Analytics: dryRun mode is active. Analytics will not send any events.')
        }

        // Request Analytics key from server.
        var promise = api.requestAnalyticsKey().then(function(resp) {

          var key = resp.data.write_key;
          api.setAnalyticsKey(key);
          return resp;

        }, function(err) {

          if (err.status == 401) {
            var msg = 'The api key and app id you provided did not register on the server.\n    ' +
                      'See http://docs.ionic.io/v1.0/docs/io-quick-start';
            console.error(msg)
          } else if (err.status == 404) {
            var msg = 'The app id you provided ("' + api.getAppId() + '") was not found on the server.\n    ' +
                      'See http://docs.ionic.io/v1.0/docs/io-quick-start';
            console.error(msg);
          } else {
            console.error('Error registering your api key with the server.', err);
          }

          return $q.reject(err);
        });

        var self = this;
        promise.then(function() {
          console.log('Ionic Analytics: successfully registered analytics key');

          setDispatchInterval(30);
          $timeout(function() {
            dispatchQueue();
          });
        });

        return promise;
      },
      unsetGlobalProperty: function(prop) {
        if (typeof prop === 'string') {
          delete globalProperties[prop];
        }
        else if (typeof prop === 'function') {
          var i = globalPropertiesFns.indexOf(prop);
          if (i == -1) {
            throw Error('Ionic Analytics: The function passed to unsetGlobalProperty was not a global property.');
          }
          globalPropertiesFns.splice(i, 1);
        }
        else {
          throw Error('Ionic Analytics: unsetGlobalProperty parameter must be a string or function.');
        }
      },
      setGlobalProperties: function(prop) {
        if (typeof prop === 'object') {
          for (var key in prop) {
            if (!prop.hasOwnProperty(key)) {
              continue;
            }

            globalProperties[key] = prop[key];
          }
        }
        else if (typeof prop === 'function') {
          globalPropertiesFns.push(prop);
        }
        else {
          throw Error('Ionic Analytics: setGlobalProperties parameter must be an object or function.');
        }
      },
      setDispatchInterval: function(v) {
        return setDispatchInterval(v);
      },
      getDispatchInterval: function() {
        return getDispatchInterval();
      },
      track: function(eventCollection, eventData) {

        if (!api.getAppId() || !api.getApiKey()) {
          var msg = 'You must provide an app id and api key to identify your app before tracking analytics data.\n    ' +
                    'See http://docs.ionic.io/v1.0/docs/io-quick-start'
          throw new Error(msg)
        }

        if (!eventData) eventData = {};

        for (var key in globalProperties) {
          if (!globalProperties.hasOwnProperty(key)) {
            continue;
          }

          if (eventData[key] === void 0) {
            eventData[key] = globalProperties[key];
          }
        };

        for (var i = 0; i < globalPropertiesFns.length; i++) {
          var fn = globalPropertiesFns[i];
          fn.call($rootScope, eventCollection, eventData);
        };

        if (useEventCaching) {
          $timeout(function() {
            enqueueEvent(eventCollection, eventData);
          })
        } else {
          $timeout(function() {
            if (options.dryRun) {
              console.log('Ionic Analytics: dryRun active, will not send event: ', eventCollection, eventData);
            } else {
              api.postEvent(eventCollection, eventData);
            }
          })
        }
      },
    };
  }];
})

//================================================================================
// Global events
//================================================================================

.run([
  '$ionicAnalytics',
  '$ionicApp',
  '$ionicUser',
  'VERSION_NUMBER',
function($ionicAnalytics, $ionicApp, $ionicUser, VERSION_NUMBER) {
  $ionicAnalytics.setGlobalProperties(function(eventCollection, eventData) {

    eventData._user = angular.copy($ionicUser.get());
    eventData._app = {
      app_id: $ionicApp.getApp().app_id,
      analytics_version: VERSION_NUMBER
    };

  })
}])

.run(['$ionicAnalytics', '$state', function($ionicAnalytics, $state) {
  $ionicAnalytics.setGlobalProperties(function(eventCollection, eventData) {

    if (!eventData._ui) eventData._ui = {};
    eventData._ui.active_state = $state.current.name;

  });
}])


//================================================================================
// Utils
//================================================================================

.factory('domSerializer', function() {

  function elementFullCssPath(element) {
    // iterate up the dom
    var selectors = [];
    while (element.tagName !== 'HTML') {
      var selector = element.tagName.toLowerCase();

      var id = element.getAttribute('id');
      if (id) {
        selector += "#" + id;
      }

      var className = element.className;
      if (className) {
        var classes = className.split(' ');
        for (var i = 0; i < classes.length; i++) {
          var c = classes[i];
          if (c) {
            selector += '.' + c;
          }
        };
      }

      var childIndex = Array.prototype.indexOf.call(element.parentNode.children, element);
      selector += ':nth-child(' + (childIndex + 1) + ')';

      element = element.parentNode;
      selectors.push(selector);
    }

    return selectors.reverse().join('>');
  }

  function elementIdentifierOrId(element) {
    // 1. ion-track-name directive
    var name = element.getAttribute('ion-track-name');
    if (name) {
      return name;
    }

    // 2. id
    var id = element.getAttribute('id');
    if (id) {
      return id;
    }

    // 3. no unique identifier --> return null
    return null;
  }

  return {
    elementSelector: function(element) {
      return elementFullCssPath(element);
    },
    elementName: function(element) {
      return elementIdentifierOrId(element);
    }
  }
})


angular.module('ionic.service.analytics')

.provider('$ionicAutoTrack',[function(){

  var trackersDisabled = {},
      allTrackersDisabled = false;

  this.disableTracking = function(tracker) {
    if (tracker) {
     trackersDisabled[tracker] = true;
    } else {
      allTrackersDisabled = true;
    }
  }

  this.$get = [function() {
    return {
      isEnabled: function(tracker) {
        return !allTrackersDisabled && !trackersDisabled[tracker];
      }
    }
  }]
}])


//================================================================================
// Auto trackers
//================================================================================


.run(['$ionicAutoTrack', '$ionicAnalytics', function($ionicAutoTrack, $ionicAnalytics) {
  if (!$ionicAutoTrack.isEnabled('Load')) {
    return;
  }
  $ionicAnalytics.track('Load');    
}])

.run([
  '$ionicAutoTrack',
  '$document',
  '$ionicAnalytics',
  'domSerializer',
function($ionicAutoTrack, $document, $ionicAnalytics, domSerializer) {
  if (!$ionicAutoTrack.isEnabled('Tap')) {
    return;
  }

  $document.on('click', function(event) {
    // want coordinates as a percentage relative to the target element
    var box = event.target.getBoundingClientRect(),
        width = box.right - box.left,
        height = box.bottom - box.top,
        normX = (event.pageX - box.left) / width,
        normY = (event.pageY - box.top) / height;

    var eventData = {
      coordinates: {
        x: event.pageX,
        y: event.pageY
      },
      target: domSerializer.elementSelector(event.target),
      target_identifier: domSerializer.elementName(event.target)
    };

    if (isFinite(normX) && isFinite(normY)) {
      eventData.coordinates.x_norm = normX;
      eventData.coordinates.y_norm = normY;
    }

    $ionicAnalytics.track('Tap', {
      _ui: eventData
    });

  });
}])

.run([
  '$ionicAutoTrack',
  '$ionicAnalytics',
  '$rootScope',
function($ionicAutoTrack, $ionicAnalytics, $rootScope) {
  if (!$ionicAutoTrack.isEnabled('State Change')) {
    return;
  }

  $rootScope.$on('$stateChangeSuccess', 
    function(event, toState, toParams, fromState, fromParams) 
  {
    $ionicAnalytics.track('State Change', {
      from: fromState.name,
      to: toState.name
    })
  });

}])


//================================================================================
// ion-track-$EVENT
//================================================================================

/**
 * @ngdoc directive
 * @name ionTrackClick
 * @module ionic.service.analytics
 * @restrict A
 * @parent ionic.directive:ionTrackClick
 *
 * @description
 *
 * A convenient directive to automatically track a click/tap on a button
 * or other tappable element.
 *
 * @usage
 * ```html
 * <button class="button button-clear" ion-track-click ion-track-event="cta-tap">Try now!</button>
 * ```
 */

.directive('ionTrackClick', ionTrackDirective('click'))
.directive('ionTrackTap', ionTrackDirective('tap'))
.directive('ionTrackDoubletap', ionTrackDirective('doubletap'))
.directive('ionTrackHold', ionTrackDirective('hold'))
.directive('ionTrackRelease', ionTrackDirective('release'))
.directive('ionTrackDrag', ionTrackDirective('drag'))
.directive('ionTrackDragLeft', ionTrackDirective('dragleft'))
.directive('ionTrackDragRight', ionTrackDirective('dragright'))
.directive('ionTrackDragUp', ionTrackDirective('dragup'))
.directive('ionTrackDragDown', ionTrackDirective('dragdown'))
.directive('ionTrackSwipeLeft', ionTrackDirective('swipeleft'))
.directive('ionTrackSwipeRight', ionTrackDirective('swiperight'))
.directive('ionTrackSwipeUp', ionTrackDirective('swipeup'))
.directive('ionTrackSwipeDown', ionTrackDirective('swipedown'))
.directive('ionTrackTransform', ionTrackDirective('hold'))
.directive('ionTrackPinch', ionTrackDirective('pinch'))
.directive('ionTrackPinchIn', ionTrackDirective('pinchin'))
.directive('ionTrackPinchOut', ionTrackDirective('pinchout'))
.directive('ionTrackRotate', ionTrackDirective('rotate'))


/**
 * Generic directive to create auto event handling analytics directives like:
 *
 * <button ion-track-click="eventName">Click Track</button>
 * <button ion-track-hold="eventName">Hold Track</button>
 * <button ion-track-tap="eventName">Tap Track</button>
 * <button ion-track-doubletap="eventName">Double Tap Track</button>
 */
function ionTrackDirective(domEventName) {
  return ['$ionicAnalytics', '$ionicGesture', function($ionicAnalytics, $ionicGesture) {

    var gesture_driven = [
      'drag', 'dragstart', 'dragend', 'dragleft', 'dragright', 'dragup', 'dragdown',
      'swipe', 'swipeleft', 'swiperight', 'swipeup', 'swipedown',
      'tap', 'doubletap', 'hold',
      'transform', 'pinch', 'pinchin', 'pinchout', 'rotate'
    ];
    // Check if we need to use the gesture subsystem or the DOM system
    var isGestureDriven = false;
    for(var i = 0; i < gesture_driven.length; i++) {
      if(gesture_driven[i] == domEventName.toLowerCase()) {
        isGestureDriven = true;
      }
    }
    return {
      restrict: 'A',
      link: function($scope, $element, $attr) {
        var capitalized = domEventName[0].toUpperCase() + domEventName.slice(1);
        // Grab event name we will send
        var eventName = $attr['ionTrack' + capitalized];

        if(isGestureDriven) {
          var gesture = $ionicGesture.on(domEventName, handler, $element);
          $scope.$on('$destroy', function() {
            $ionicGesture.off(gesture, domEventName, handler);
          });
        } else {
          $element.on(domEventName, handler);
          $scope.$on('$destroy', function() {
            $element.off(domEventName, handler);
          });
        }


        function handler(e) {
          var eventData = $scope.$eval($attr.ionTrackData) || {};
          if(eventName) {
            $ionicAnalytics.track(eventName, eventData);
          } else {
            $ionicAnalytics.trackClick(e.pageX, e.pageY, e.target, {
              data: eventData
            });
          }
        }
      }
    }
  }];
}

})();