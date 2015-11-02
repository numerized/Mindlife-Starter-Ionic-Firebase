angular.module('starter', [
  'ionic', 
  'login.controllers', 
  'starter.controllers',
  'starter.home',
  'pascalprecht.translate', 
  'ngResource', 
  'firebase', 
  'ngCordova'])

.run(["$firebaseAuth", "$ionicSlideBoxDelegate", "$sce", "$ionicPlatform", "$state", "$rootScope", "$timeout", "$interval", "$cordovaDevice", "$firebaseObject", "FirebaseConfig", "$cordovaGlobalization", "$translate", "$cordovaStatusbar", "$ionicPopup", function($firebaseAuth, $ionicSlideBoxDelegate, $sce, $ionicPlatform, $state, $rootScope, $timeout, $interval, $cordovaDevice, $firebaseObject, FirebaseConfig, $cordovaGlobalization, $translate, $cordovaStatusbar, $ionicPopup) {

  
  $rootScope.spinner = false;
  $translate.use('en');

  $rootScope.goHomeAndAnim = function ()
  {
    $state.go('tabs.home', null, { reload: true, notify: true });
  }

  $rootScope.goHelp = function ()
  {
    $state.go('tabs.help');
  }

  $rootScope.goAccount = function ()
  {
    $state.go('tabs.account');
  }

  var ref = new Firebase(FirebaseConfig.root_url);
  $rootScope.authObj = $firebaseAuth(ref);

  $rootScope.authObj.$onAuth(function(authData) {
    if (authData === null) {
      //console.log("Not logged in yet");
    } else {
      //$rootScope.onAuthUser(); // This will display the user's name in our view
      console.log("Logged in as", authData.uid);
      $state.go('tabs.home');

    }
  });

  $rootScope.unAuth = function ()
  {
    var ref = new Firebase(FirebaseConfig.root_url);
    ref.unauth();
    $rootScope.privateData = null;
    $state.go('login');
    
  }

  $rootScope.onAuthUser = function () {

    // we would probably save a profile when we register new users on our site
    // we could also read the profile to see if it's null
    // here we will just simulate this with an isNewUser boolean
    var ref = new Firebase(FirebaseConfig.users_url);

    var onAuthCallback = function(authData) {
      if (authData) {
        console.log(FirebaseConfig.users_url+authData.uid)
        var userRef = new Firebase(FirebaseConfig.root_url+authData.uid);
        
        $timeout(function () {
          $rootScope.authData = authData;

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

            //console.log('test')
            
            if (!snapshot.val()) {
              userRef.set({
                provider: authData.provider,
                name: getName(authData),
                email: getEmail(authData)?getEmail(authData):null,
                picture: $rootScope.ownerPictureUrl,
                accountCreationDate: Firebase.ServerValue.TIMESTAMP
              });
            }
            else {
              userRef.update({
                name: getName(authData),
                email: getEmail(authData)?getEmail(authData):null,
                picture: $rootScope.ownerPictureUrl,
                lastConnexionDate:Firebase.ServerValue.TIMESTAMP
              });
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

  $rootScope.register = function (email, password) {

    $rootScope.spinner = true;
    $rootScope.authObj.$createUser({
      email: email,
      password: password
    }).then(function(userData) {
      console.log("User " + userData.uid + " created successfully!");
      $rootScope.login_message = 'your account has been created, you\'ll now be connected automatically';

      return $rootScope.authObj.$authWithPassword({
        email: email,
        password: password
      });
    }).catch(function(error) {
        if(error.code == "INVALID_ARGUMENTS")
        {
          $rootScope.login_message = 'invalid credentials';
          
        }
        else if(error.code == "INVALID_USER")
        {
          $rootScope.login_message = 'invalid_user';
          
        }
        else if(error.code == "INVALID_EMAIL")
        {
          $rootScope.login_message = 'The email provided is invalid';
          
        }
        else if(error.code == "EMAIL_TAKEN")
        {
          $rootScope.login_message = 'The email provided is already taken';
          $rootScope.userLogin(email, password);
          
        }
        else if(error)
        {
          $rootScope.login_message = 'Please verify your informations';
          //$rootScope.userLogin(email, password);
        }
      
      $rootScope.spinner = false;
    });
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
}]);
