// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'ionic.service.analytics', 'mysurvey.controllers', 'ionic.service.core', 'ionic.service.push', 'login.controllers', 'starter.controllers', 'starter.services', 'pascalprecht.translate', 'ngResource', 'firebase', 'ngCordova'])


.run(function($ionicPlatform, $timeout, $rootScope, $sce, $state, $translate, $cordovaDevice, $ionicAnalytics) {
  
  $rootScope.goHomeAndAnim = function ()
  {
    
    if($rootScope.categoryClassPrevious)
      $rootScope.categoryClass = $rootScope.categoryClassPrevious;
    $rootScope.categoryClassPrevious = null;
    $state.go('tab.home');
  }

  $rootScope.goHelp = function ()
  {
    $rootScope.categoryClassPrevious = $rootScope.categoryClass;
    $rootScope.categoryClass = $sce.trustAsHtml(".bar {background: #FF9856!important;} .co-content div div div { border-radius: 50%; background-image:url(img/cards/CONNECTED/category_CONNECTED.png); background-size:cover; background-position: center;} ion-content {background: linear-gradient(to top left, #ffe3bc, #FFDCAC 10%, #F9C79E 20%, #F4BB93 27%, #F9B483 35%, #FFAC77 50%, #FF9856 63%, #f58e4b 93%, #f58e4b);}.list h2, .list p {color: rgb(98, 13, 13) !important;} input[type='text'], textarea {border: 0; color: rgb(55, 68, 82)!important; font-size: 20px;  line-height: 1.2em;}");
    $state.go('tab.help');
  }

  $rootScope.goAccount = function ()
  {
    $rootScope.categoryClassPrevious = $rootScope.categoryClass;
    $rootScope.categoryClass = $sce.trustAsHtml(".bar {background: #B5D36A!important;} .co-content div div div {border-radius: 50%; background-image:url(img/cards/SUSTAINABLE/category_SUSTAINABLE.png); background-size:cover; background-position: center;} ion-content {background: linear-gradient(to top left, #E0EDC5, #d1e1af 10%, #C5E08B 20%, #BEDA80 27%, #BBD57A 35%, #BBD57A 50%, #B5D36A 63%, #9AB84F 93%, #8bb862);} .list h2, .list p {color: rgb(55, 68, 82) !important} input[type='text'], textarea {border: 0; color: rgb(55, 68, 82)!important; font-size: 20px; line-height: 1.2em;}");
    $state.go('tab.account');
  }

  $ionicPlatform.ready(function() {

    $ionicAnalytics.register();
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    // Check for network connection at startup on mobile
    if(window.Connection) {
      if(navigator.connection.type == Connection.NONE) {
        $ionicPopup.confirm({
          title: 'No Internet Connection',
          content: 'Sorry, no Internet connectivity detected. Please reconnect and try again.'
        })
        .then(function(result) {
          if(!result) {
            ionic.Platform.exitApp();
          }
        });
      }
      // console.log("online:" + navigator.onLine);
      //  Check for network connexion while using the app for mobile
      $rootScope.online = navigator.onLine ? 'online' : 'offline';
      $rootScope.$apply();

      if (window.addEventListener) {
        window.addEventListener("online", function() {
          $rootScope.online = "online";
          $rootScope.$apply();
        }, true);
        window.addEventListener("offline", function() {
          $rootScope.online = "offline";
          $rootScope.$apply();
        }, true);
      } else {
        document.body.ononline = function() {
          $rootScope.online = "online";
          $rootScope.$apply();
        };
        document.body.onoffline = function() {
          $rootScope.online = "offline";
          $rootScope.$apply();
        };
      }
    }

    //check network connexion all devices through firebase to adapt for desktop
    /*    var connectedRef = new Firebase(FirebaseConfig.connected);
    connectedRef.on("value", function(snap) {
      if (snap.val() === true) {
        $rootScope.online = "online";
        $rootScope.$apply();
      } else {
        $rootScope.online = "offline";
        $rootScope.$apply();
      }
    });

    */

    if(!$rootScope.uid && $state.$current.name !== 'login')
    {
      $rootScope.authData = null;
      $state.go('login');
    }
    

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      $cordovaStatusbar.style();
      //$cordovaStatusbar.hide();
    }

    if (window.navigator.language)
    {
      $rootScope.globalization = {"value": window.navigator.language};
      $translate.use($rootScope.globalization.value);
    }
    else if (window.navigator.userLanguage)
    {
      $rootScope.globalization = {"value": window.navigator.userLanguage};
      $translate.use($rootScope.globalization.value);
    }

    $rootScope.device = $cordovaDevice.getDevice();

    $cordovaGlobalization.getPreferredLanguage().then(
      function(result) {
        $rootScope.globalization = result;
        $rootScope.globalization.value = $rootScope.globalization.value.substring(0,2);
        $translate.use($rootScope.globalization.value);
        // result
      },
      function(error) {
        $rootScope.globalization = error;
        // error
    });
  }, false);
})

.config(['$ionicConfigProvider', function($ionicConfigProvider) {
  
  if(!ionic.Platform.isIOS())
    $ionicConfigProvider.scrolling.jsScrolling(false);
  $ionicConfigProvider.views.transition('android');
  
}])

.config(function($stateProvider, $urlRouterProvider, $ionicAppProvider) {

  // Identify app
  $ionicAppProvider.identify({
    app_id: 'eebbab84',
    api_key: '0f73db399e48c3b8562c7353460960fb0903af6985aae132',
    // If true, will attempt to send development pushes
    dev_push: true
  });

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('login', {
      url: "/login",
      templateUrl: "templates/login.html",
      controller: 'LoginCtrl'
    })

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('tab.help', {
      url: "/help",
      views: {
        'tab-help': {
          controller: "HelpCtrl",
          templateUrl: "templates/tab-help.html"
        }
      }
    })

  // Each tab has its own nav history stack:
  .state('tab.home', {
    url: '/tab-home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })

  .state('tab.chat-detail', {
    url: '/chats/:chatId',
    views: {
      'tab-chats': {
        templateUrl: 'templates/chat-detail.html',
        controller: 'ChatDetailCtrl'
      }
    }
  })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

  .state('tab.myprivacysettings', {
    url: "/account/myprivacysettings",
    views: {
      'tab-account': {
        controller: "mySurveyCtrl",
        templateUrl: "templates/tab-myprivacysettings.html"
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

});
