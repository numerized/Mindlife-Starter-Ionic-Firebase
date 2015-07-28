angular.module('login.controllers', [])

.controller('LoginCtrl', function ($scope, $rootScope, $timeout, $location, $interval, $state, FirebaseConfig, $firebaseObject, $firebaseArray, $firebaseAuth, $translate) {

	$scope.login = {};
	$rootScope.spinner = false;
	var ref = new Firebase(FirebaseConfig.root_url);
  	$rootScope.uid = null;
  	$rootScope.privateData = null;
  	$scope.authObj = $firebaseAuth(ref);

  	var register = {};

  	$scope.authObj.$onAuth(function(authData) {
	  if (authData === null) {
	    console.log("Not logged in yet");
	  } else {
	    console.log("Logged in as", authData.uid);
	  }
	  $scope.onAuthUser(); // This will display the user's name in our view
	});

	$scope.onAuthUser = function () {

		// we would probably save a profile when we register new users on our site
		// we could also read the profile to see if it's null
		// here we will just simulate this with an isNewUser boolean

		var ref = new Firebase(FirebaseConfig.user);

		var onAuthCallback = function(authData) {
		  if (authData) {
		    
		    $rootScope.authData = authData;
			$rootScope.uid = authData.uid;
			var userRef = new Firebase(FirebaseConfig.user+'/'+authData.uid);
			// Attach an asynchronous callback to read the data at our posts reference
			userRef.once('value', function(dataSnapshot) {
			  if (!dataSnapshot.val()) {
			  	ref.child(authData.uid).set({
			      provider: authData.provider,
			      name: getName(authData)
			    });
			  }
			});

			
			// anything you want can go here and will safely be run on the next digest.
			var refUserCardsStatistics = new Firebase(FirebaseConfig.user+'/'+$rootScope.authData.uid+'/cards/statistics');
			var FirebaseUserCardsStatistics = $firebaseObject(refUserCardsStatistics);
			FirebaseUserCardsStatistics.$loaded(function(v)
				{
				  $rootScope.statistics = v;
				  $timeout(function() {

				      if(!v.numberActivities)
				      {
				      	refUserCardsStatistics.set({
							numberActivities: 0
						});

				  	}
				  })
				}
			);

		    if(typeof $rootScope.authData !== "undefined")
			{
				$rootScope.spinner = false;
				$state.go('tab.home');
			}
			else
			{
				console.log('uid login ctrl not present');		
				$rootScope.privateData = null;
				document.location.reload(false);
			}
		  }
		};
		// Attach the callback
		ref.onAuth(onAuthCallback);
		
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
		
	}

    $scope.register = function (email, password) {

    	$scope.authObj.$createUser({
		  email: email,
		  password: password
		}).then(function(userData) {
		  console.log("User " + userData.uid + " created successfully!");
		  $rootScope.login_message = 'your account has been created, you\'ll now be connected automatically';

		  return $scope.authObj.$authWithPassword({
		    email: email,
		    password: password
		  });
		}).then(function(authData) {
		  console.log("Logged in as:", authData.uid);
		  	$rootScope.authData = authData;
			$scope.onAuthUser();
			$state.go('tab.home');
		}).catch(function(error) {
			if(error.code == "INVALID_PASSWORD")
			  	{
			  		$rootScope.login_message = 'invalid_password';
			  		
			  	}
			  	else if(error.code == "INVALID_USER")
			  	{
			  		$rootScope.login_message = 'invalid_user';
			  		
			  	}
		  console.error("Error: ", error);
		});
    }

    $scope.returnToLogin = function () {

    	$state.go('login');
    }

	$scope.userLogin = function (email, password) {
		
		$rootScope.spinner = true;
		$rootScope.auth = $firebaseAuth(ref);
    	
      $scope.authObj.$authWithPassword({
        email: email,
        password: password
      }).then(function(authData) {
        $rootScope.login_message = 'signin you up...';
        $rootScope.authData = authData;
		$scope.onAuthUser();
		$state.go('tab.home');
      }, function(error) {
        if (error = 'INVALID_EMAIL') {
          $rootScope.login_message = 'email invalid or not signed up — trying to sign you up!';
          $scope.register(email, password);
        } else if (error = 'INVALID_PASSWORD') {
        	console.log(error);
          $rootScope.login_message = 'invalid_password';
          
        } else if(error.code == "INVALID_USER") {
        	console.log(error);
	  		$rootScope.login_message = 'invalid_user';
	  		
	  	} else {
          console.log(error);
        }
      });
    }

	$scope.userRegister = function () {
		
		//simple redirect new test again
		$state.go('register');
	}

	$scope.userLoginPage = function () {
		
		//simple redirect new test again
		$state.go('userLogin');
	}

	$scope.returnToLogin = function () {

    	$state.go('login');
    }

	$scope.googleLogin = function() {
        $rootScope.spinner = true;
        var ref = new Firebase(FirebaseConfig.root_url);
        ref.authWithOAuthPopup("google",function(error,authData) {
		  if (error) {
		    console.log("Authentication Failed!", error);
		    if (error.code === 'TRANSPORT_UNAVAILABLE') {
		        ref.authWithOAuthRedirect("google", function(error, authData) {
		        	if (error) {
				    	console.log("Login Failed!", error);
				    	$rootScope.spinner = false;
				  } else {
				    $rootScope.authData = authData;
				    $scope.onAuthUser();
				  }
		        });
		      } else {
		      	$rootScope.spinner = false;
		        console.log(error);
		      }
		  } else {
		    // We'll never get here, as the page will redirect on success.
		  }
		});
	}

	$scope.twitterLogin = function() {
		$rootScope.spinner = true;
        var ref = new Firebase(FirebaseConfig.root_url);
		ref.authWithOAuthPopup("twitter",function(error,authData) {
		  if (error) {
		    console.log("Authentication Failed!", error);
		    if (error.code === 'TRANSPORT_UNAVAILABLE') {
		        ref.authWithOAuthRedirect("twitter", function(error, authData) {
		        	if (error) {
				    	console.log("Login Failed!", error);
				    	$rootScope.spinner = false;
				  } else {
				    $rootScope.authData = authData;
				    $scope.onAuthUser();
				  }
		        });
		      } else {
		      	$rootScope.spinner = false;
		        console.log(error);
		      }
		  } else {
		    // We'll never get here, as the page will redirect on success.
		    $rootScope.authData = authData;
			$scope.onAuthUser();
		  }
		});
	}

	$scope.fbLogin = function ()
	{
		$rootScope.spinner = true;
		var ref = new Firebase(FirebaseConfig.root_url);
		ref.authWithOAuthPopup("facebook",function(error,authData) {
		  if (error) {
		    console.log("Authentication Failed!", error);
		    if (error.code === 'TRANSPORT_UNAVAILABLE') {
		        ref.authWithOAuthRedirect("facebook", function(error, authData) {
		        	if (error) {
				    	console.log("Login Failed!", error);
				    	$rootScope.spinner = false;
				  } else {
				    $rootScope.authData = authData;
				    $scope.onAuthUser();
				  }
		        });
		      } else {
		      	$rootScope.spinner = false;
		        console.log(error);
		      }
		  } else {
		    // We'll never get here, as the page will redirect on success.
		    $rootScope.authData = authData;
			$scope.onAuthUser();
		  }
		})
	}

	$scope.fbAppLogin = function ()
	{
		$rootScope.spinner = true;
		var fbAppGetFriends = function (friendsData)
		{
			$rootScope.friendsData = friendsData;
			$scope.onAuthUser();
		}

		var fbAppLoginError = function (error) {

			$rootScope.spinner = false;
			$scope.$apply();

		};

		var fbAppLoginSuccess = function (userData) {

			var ref = new Firebase(FirebaseConfig.root_url);

			ref.authWithOAuthToken("facebook", userData.authResponse.accessToken, function(error, authData) {
			if (error) {
			  $rootScope.spinner = false;
			  console.log("Login Failed!", error);
			} else {
				$rootScope.authData = authData;
				$rootScope.fbData = userData;
				facebookConnectPlugin.api("/me/friends?fields=id,name,picture",["user_friends"],
					fbAppGetFriends,
					function (error) { alert("" + error) }
					);
				}
			});
		}

		facebookConnectPlugin.login(["public_profile", "email", "user_friends"],
		    fbAppLoginSuccess,
		    fbAppLoginError
		);
	}
})

.controller('AccountCtrl', function ($scope, $rootScope, $state, $ionicUser, $ionicPush, $firebaseObject, $cordovaStatusbar, FirebaseConfig, $translate) {
  
  $rootScope.spinner = false;

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

  // Handles incoming device tokens
  $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
    alert("Successfully registered token " + data.token);
    console.log('Ionic Push: Got token ', data.token, data.platform);
    $scope.token = data.token;
  });

  // Identifies a user with the Ionic User service
  $scope.identifyUser = function() {
    console.log('Ionic User: Identifying with Ionic User service');

    var user = $ionicUser.get();
    if(!user.user_id) {
      // Set your user_id here, or generate a random one.
      user.user_id = $rootScope.uid;
    };

    // Add some metadata to your user object.
    angular.extend(user, {
      name: getName($rootScope.authData),
      provider: $rootScope.authData.provider,
      token:$scope.token
    });

    // Identify your user with the Ionic User Service
    $ionicUser.identify(user).then(function(){
      $scope.identified = true;
      alert('Identified user ' + user.name + '\n ID ' + user.user_id);
    });
  };

  // Registers a device for push notifications and stores its token
  $scope.pushRegister = function() {
    console.log('Ionic Push: Registering user');

    // Register with the Ionic Push service.  All parameters are optional.
    $ionicPush.register({
      canShowAlert: true, //Can pushes show an alert on your screen?
      canSetBadge: true, //Can pushes update app icon badges?
      canPlaySound: true, //Can notifications play a sound?
      canRunActionsOnWake: true, //Can run actions outside the app,
      onNotification: function(notification) {
        // Handle new push notifications here
        $state.go(notification.$state);        
        return true;
      }
    });
  };
  
  $scope.unAuth = function ()
  {
  	var ref = new Firebase(FirebaseConfig.root_url);
  	ref.unauth();
  	$scope.gotoLogin();
  	
  }

  $scope.gotoLogin = function () {
  	$rootScope.uid = null;
  	$rootScope.privateData = null;
  	document.location.reload(false);
  }

  $scope.inviteFbFriend = function () {
  	facebookConnectPlugin.showDialog( { method: "send", name: "name", picture: "http://i.imgur.com/g3Qc1HN.png", link: "http://www.vice.com", caption: "caption of choice", description: "description of choice" }, 
        function (response) { alert(JSON.stringify(response)) },
        function (response) { alert(JSON.stringify(response)) });
  }

  $scope.postFbStatus = function () {
  	facebookConnectPlugin.showDialog( { method: "feed", name: "name", picture: "http://i.imgur.com/g3Qc1HN.png", link: "http://www.vice.com", caption: "caption of choice", description: "description of choice" }, 
        function (response) { alert(JSON.stringify(response)) },
        function (response) { alert(JSON.stringify(response)) });
  }

  
  	var ref = new Firebase(FirebaseConfig.welcome_message);
  	// download the data into a local object
    var syncObject = $firebaseObject(ref);
    // synchronize the object with a three-way data binding
    // click on `index.html` above to see it used in the DOM!
    syncObject.$bindTo($scope, "privateData");
    

})

.controller('PasswordResetCtrl', function ($scope, $rootScope, $state, $ionicUser, $ionicPush, $firebaseObject, $cordovaStatusbar, FirebaseConfig, $translate) {

	$scope.userLoginPasswordReset = function(email)
	{

		var ref = new Firebase(FirebaseConfig.root_url);
		ref.resetPassword({
		    email : email
		  }, function(error) {
		  if (error === null) {
		  	console.log("Password reset email sent successfully");
		    $scope.login_message = "Password reset email sent successfully";
		  } else {
		  	console.log("Error sending password reset email:", error);
		    $scope.login_message = "Error sending password reset email: "+error;
		  }
		});

	}

});
