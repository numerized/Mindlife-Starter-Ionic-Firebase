angular.module('app', [
  'ionic',
  'app.help',
  'app.home',
  'pascalprecht.translate', 
  'ngResource', 
  'firebase', 
  'ngCordova'])

.run(runBlock)

function runBlock($injector, $firebaseAuth, $ionicPlatform, $state, $rootScope, $timeout, $cordovaDevice, FirebaseConfig, $cordovaGlobalization, $translate, $cordovaStatusbar, $ionicPopup) {

  checkAuthRights();
  checkRouteRights();
  
  $rootScope.spinner = false;
  $translate.use('en');

  function checkAuthRights(){

    console.log("authCheck")

    var ref = new Firebase(FirebaseConfig.root_url);
    $rootScope.authObj = $firebaseAuth(ref);

    $rootScope.authObj.$onAuth(function(authData) {
      if (authData === null) {
        console.log("Not logged in yet");
        $state.go('login');
      } else {
        $rootScope.onAuthUser(); // This will display the user's name in our view
        if($state.$current.name == "login")
          $state.go('tabs.home');
      }
    });
  }

  function checkRouteRights(){
    
    console.log("routeCheck")
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      console.log('routeChange')
      if(toState && toState.data && Array.isArray(toState.data.restrictAccess)){
        console.log('routeChangeif')
        var restricted = toState.data.restrictAccess;
        console.log(restricted+' '+toState.name+' '+$rootScope.authData.firebase.role)
        var logged = $rootScope.authData.firebase.role;
        console.log(logged+' '+restricted.indexOf(logged))
        if(logged && restricted.indexOf('notLogged') > -1){
          event.preventDefault();
          $state.go('tabs.account');
        } else if(!logged && restricted.indexOf('logged') > -1){
          event.preventDefault();
          $state.go('login');
        } else if(logged && restricted.indexOf(logged) == -1){
          console.log('you don\'t have the right')
          event.preventDefault();
          
        }
      }
    });
  }

  $rootScope.goHome = function ()
  {
    $state.go('tabs.home');
  }

  $rootScope.goHelp = function ()
  {
    $state.go('tabs.help');
  }

  $rootScope.goAccount = function ()
  {
    $state.go('tabs.account');
  }

  $rootScope.unAuth = function ()
  {
    var ref = new Firebase(FirebaseConfig.root_url);
    ref.unauth();
    $state.go('login');    
  }

  $rootScope.onAuthUser = function () {

    // we would probably save a profile when we register new users on our site
    // we could also read the profile to see if it's null
    // here we will just simulate this with an isNewUser boolean
    var ref = new Firebase(FirebaseConfig.users_url);

    var onAuthCallback = function(authData) {
      if (authData) {

        var userRef = new Firebase(FirebaseConfig.users_url+authData.uid);
        $rootScope.authData = authData;

        $timeout(function () {          

          if(authData.provider == 'twitter')
          {
            $rootScope.ownerPictureUrl = authData.twitter.cachedUserProfile.profile_image_url;
          }
          else if (authData.provider == 'facebook')
          {
            $rootScope.ownerPictureUrl = authData.facebook.cachedUserProfile.picture.data.url;
          }

          // Attach an asynchronous callback to read the data at our posts reference
          userRef.once('value', function(snapshot) {
            if (!snapshot.val()) {
              userRef.set({
                provider: authData.provider,
                role:'User',
                name: getName(authData),
                email: getEmail(authData)?getEmail(authData):null,
                picture: $rootScope.ownerPictureUrl?$rootScope.ownerPictureUrl:null,
                accountCreationDate: Firebase.ServerValue.TIMESTAMP
              })
              $rootScope.authData.firebase = 
              {
                provider: authData.provider,
                role:'User',
                name: getName(authData),
                email: getEmail(authData)?getEmail(authData):null,
                picture: $rootScope.ownerPictureUrl?$rootScope.ownerPictureUrl:null,
                accountCreationDate: 'now'
              };
            }
            else {
              userRef.update({
                name: getName(authData),
                email: getEmail(authData)?getEmail(authData):null,
                picture: $rootScope.ownerPictureUrl?$rootScope.ownerPictureUrl:null,
                lastConnexionDate:Firebase.ServerValue.TIMESTAMP
              });
              $rootScope.authData.firebase = snapshot.val();
            }
          });
        });     
      }
    };
    
    // find a suitable name based on the meta info given by each provider
    function getName(authData) {
      switch(authData.provider) {
         case 'password':
           return authData.password.email.replace(/@.*/, '');
         case 'twitter':
           return authData.twitter.displayName;
         case 'facebook':
           return authData.facebook.displayName;
         case 'google':
           return authData.google.displayName;
      }
    }

    function getEmail(authData) {
      switch(authData.provider) {
         case 'password':
           return authData.password.email;
         case 'twitter':
           return authData.twitter.displayName;
         case 'facebook':
           return authData.facebook.email;
         case 'google':
           return authData.google.email;
      }
    }

    // Attach the callback
    ref.onAuth(onAuthCallback);
    
  }

  $ionicPlatform.ready(function() {
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
      
      //  Check for network connexion while using the starter for mobile
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
}
