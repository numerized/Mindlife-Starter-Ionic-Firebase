angular.module('login.controllers', [])

.controller('LoginCtrl', function ($scope, $rootScope, $timeout, $location, $interval, $state, FirebaseConfig, $firebaseObject, $firebaseArray, $firebaseAuth, $translate) {

	var times = 0;
	$rootScope.firstTimeUser = false;
	$scope.login = {};
	$rootScope.login_message = null;
	$rootScope.spinner = false;
	
	var ref = new Firebase(FirebaseConfig.root_url);
  	$rootScope.uid = null;
  	$rootScope.privateData = null;
  	$scope.authObj = $firebaseAuth(ref);

  	var register = {};

  	$scope.authObj.$onAuth(function(authData) {
	  if (authData === null) {
	    //console.log("Not logged in yet");
	  } else {
	  	$scope.onAuthUser(); // This will display the user's name in our view
	    //console.log("Logged in as", authData.uid);
	  }
	  
	});

	$scope.unAuth = function ()
	{
		var ref = new Firebase(FirebaseConfig.root_url);
		ref.unauth();
		$rootScope.uid = null;
		$rootScope.privateData = null;
		$scope.returnToLogin();
		
	}

	$scope.onAuthUser = function () {

		// we would probably save a profile when we register new users on our site
		// we could also read the profile to see if it's null
		// here we will just simulate this with an isNewUser boolean

		var ref = new Firebase(FirebaseConfig.user);


		var onAuthCallback = function(authData) {
		  if (authData) {

		  	if($rootScope.device)
		  	{

			  	Ionic.io();

				// this will give you a fresh user or the previously saved 'current user'
				var ionicUser = Ionic.User.current();

				// if the user doesn't have an id, you'll need to give it one.
				if (!ionicUser.id) {
				  	ionicUser.id = Ionic.User.anonymousId();
					ionicUser.set('name', getName(authData));
					ionicUser.set('email', getEmail(authData));
				  	// user.id = 'your-custom-user-id';
				}

				var push = new Ionic.Push({
			      "debug": true,
			      "onNotification": function(notification) {
			        var payload = notification.payload;
			      },
			      "onRegister": function(data) {
			        
			      }
			    });

			    

				console.log('2 times' +times);

				$timeout(function () {
					var callback = function(data) {
						console.log('callback0');
						push.addTokenToUser(ionicUser);
						ionicUser.save();
					}
					
					push.register(callback);
					
				});

				console.log('3 times' +times);
				// Identifies a user with the Ionic User service
				//$scope.identifyUser = function() {
				//console.log('Ionic User: Identifying with Ionic User service');		

				// You can store JavaScript strings, numbers, booleans, arrays, and json objects.
				// strings

			}

			/*

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

			*/
			//};
		    
		    $rootScope.authData = authData;
			$rootScope.uid = authData.uid;
			var userRef = new Firebase(FirebaseConfig.user+'/'+authData.uid);
			// Attach an asynchronous callback to read the data at our posts reference
			userRef.once('value', function(dataSnapshot) {
				var refUserCards = new Firebase(FirebaseConfig.user+'/'+$rootScope.authData.uid+'/cards');
			    var FirebaseUserCards = $firebaseArray(refUserCards);
			    FirebaseUserCards.$loaded(
			    	function(v)
				    {
				    	$rootScope.userCards = FirebaseUserCards;
				    }
			    );

			    $rootScope.numberActivitiesCounter = 0;
				$rootScope.wheelProgress = 0;

				// anything you want can go here and will safely be run on the next digest.
				var refUserCardsStatistics = new Firebase(FirebaseConfig.user+'/'+$rootScope.authData.uid+'/cards/statistics');
				var FirebaseUserCardsStatistics = $firebaseObject(refUserCardsStatistics);
				FirebaseUserCardsStatistics.$loaded(function(v)
					{
					  $rootScope.statistics = v;
					  $timeout(function() {

					  	if($rootScope.device)
	  					{
				  	  		ionicUser.set('numberActivities', v.numberActivities);
							ionicUser.save();
						}

						if(!v.numberActivities)
						{
							refUserCardsStatistics.set({
							numberActivities: 0
							});

						}
					  })
					}
				);

				// anything you want can go here and will safely be run on the next digest.
				var refUserCardsCategoryStatistics = new Firebase(FirebaseConfig.user+'/'+$rootScope.authData.uid+'/cards/categoryStatistics');
				var FirebaseUserCardsCategoryStatistics = $firebaseObject(refUserCardsCategoryStatistics);
				FirebaseUserCardsCategoryStatistics.$loaded(function(w)
					{
					  $rootScope.categoryStatistics = w;
					}
				);
			  if (!dataSnapshot.val()) {
			  	
			  	ref.child(authData.uid).set({
			      provider: authData.provider,
			      email: getEmail(authData),
			      name: getName(authData)
			    });

				    $rootScope.firstTimeUser = true;
					$state.go('tabs.myprivacysettings');

				}
				else {

					$state.go('home');

				};

			});
		

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
		
	}

    $scope.register = function (email, password) {

    	$rootScope.spinner = true;
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
		  		$scope.userLogin(email, password);
		  		
		  	}
		  	else if(error)
		  	{
		  		$rootScope.login_message = 'Please verify your informations';
		  		//$scope.userLogin(email, password);
		  	}
		  console.error("Error: ", error.code);
		  $rootScope.spinner = false;
		});
    }

    $scope.returnToLogin = function () {

    	$state.go('login');
    }

	$scope.userLogin = function (email, password) {
		
	  $rootScope.spinner = true;
	  //$rootScope.auth = $firebaseAuth(ref);
    	
      $scope.authObj.$authWithPassword({
        email: email,
        password: password
      }).then(function(authData) {
        $rootScope.login_message = 'signin you up...';
        //$rootScope.authData = authData;
		//$scope.onAuthUser();
		//$state.go('home');
      }, function(error) {
        if(error.code == "INVALID_ARGUMENTS")
		{
			$rootScope.login_message = 'invalid credentials';
			
		}
		else if(error.code == "INVALID_USER")
		{
			$rootScope.login_message = 'This email is not registered';
			
		}
		else if(error.code == "INVALID_EMAIL")
		{
			$rootScope.login_message = 'The email provided is invalid';
			
		}
		else if(error.code == "INVALID_PASSWORD")
		{
			$rootScope.login_message = 'The password provided is incorrect';
			
		}
		else if(error.code == "EMAIL_TAKEN")
		{
			$rootScope.login_message = 'The email provided is already taken';
			$scope.userLogin(email, password);
			
		}
		else if(error)
		{
			$rootScope.login_message = 'Please verify your informations';
			//$scope.userLogin(email, password);
		}
		$rootScope.spinner = false;
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
		        }, {
				  scope: "email"
				});
		      } else {
		      	$rootScope.spinner = false;
		        console.log(error);
		      }
		  } else {
		    // We'll never get here, as the page will redirect on success.
		  }
		}, {
		  scope: "email"
		});
	}

	$scope.twitterLogin = function() 
	{
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
				    //$rootScope.authData = authData;
				    //$scope.onAuthUser();
				  }
		        });
		      } else {
		      	$rootScope.spinner = false;
		        console.log(error);
		      }
		  } else {
		    // We'll never get here, as the page will redirect on success.
		    //$rootScope.authData = authData;
			//$scope.onAuthUser();
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

	$scope.userLoginPasswordReset = function(email)
	{
		
		$rootScope.spinner = true;		
		
		ref.resetPassword({
		  email: email?email:'null@verynull.com'
		}, function(error) {
		  if (error) {
			$rootScope.login_message = "Please verify your email:" + error;
			$rootScope.spinner = false;
			$rootScope.$apply();	
		  } else {
		    $rootScope.login_message = "Password reset email sent successfully to "+email;
		    $rootScope.spinner = false;
		    $rootScope.$apply();
		  }
		});

	}
})

.controller('AccountCtrl', function ($sce, $scope, $rootScope, $state, $firebaseObject, $cordovaStatusbar, FirebaseConfig, $translate) {
  
	$rootScope.spinner = false;
	$scope.$on('$ionicView.enter', function(e) {		

		$rootScope.categoryClass = $sce.trustAsHtml(".bar {background: #B5D36A!important;} div.co-circle-progress > div.co-content {background-color: #B5D36A} .co-content div div div {border-radius: 50%; background-image:url(img/cards/SUSTAINABLE/category_SUSTAINABLE.svg); background-size:cover; background-position: center;} ion-view {background: linear-gradient(to top left, #E0EDC5, #d1e1af 10%, #C5E08B 20%, #BEDA80 27%, #BBD57A 35%, #BBD57A 50%, #B5D36A 63%, #9AB84F 93%, #8bb862);} .list h2, .list p {color: rgb(55, 68, 82) !important} input[type='text'], textarea {border: 0; color: rgb(55, 68, 82)!important; font-size: 20px; line-height: 1.2em;}");
		var ref = new Firebase(FirebaseConfig.welcome_message);
		// download the data into a local object
		var syncObject = $firebaseObject(ref);
		// synchronize the object with a three-way data binding
		// click on `index.html` above to see it used in the DOM!
		syncObject.$bindTo($scope, "privateData");
		
	});

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

	// kick off the platform web client
	Ionic.io();

	// this will give you a fresh user or the previously saved 'current user'
	var ionicUser = Ionic.User.current();

	// Identifies a user with the Ionic User service
	$scope.identifyUser = function() {
		//console.log('Ionic User: Identifying with Ionic User service');		

		// if the user doesn't have an id, you'll need to give it one.
		if (!ionicUser.id) {
		  ionicUser.id = Ionic.User.anonymousId();
		  // user.id = 'your-custom-user-id';
		}

		// You can store JavaScript strings, numbers, booleans, arrays, and json objects.

		// strings
		ionicUser.set('name', getName($rootScope.authData));

		ionicUser.set('email', getEmail($rootScope.authData));

		ionicUser.save().then(function(){
		  $scope.identified = true;
		  $scope.$apply();
		  alert('Thanks, you can desactivate them in your Apple device settings / iAspireLab / Notifications control panel');
		});

		var push = new Ionic.Push({
		  "debug": false,
		  "onNotification": function(notification) {
		   	$state.go(notification.payload.$state, null, notification.payload.$stateParams)
		  },
		  "onRegister": function(data) {
		    console.log(data.token);

		  }
		});

		var callback = function(data) {
		  	push.addTokenToUser(ionicUser);
			ionicUser.save();
			console.log(ionicUser);
		  
		}

		push.register(callback);

		/*

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

		*/
	};

	// Registers a device for push notifications and stores its token
	$scope.pushRegister = function() {

		var push = new Ionic.Push({
		  "debug": false,
		  "onNotification": function(notification) {
		    $scope.payload = notification.payload;
		    $scope.$apply();
		   	$state.go(notification.payload.$state, null, notification.payload.$stateParams)
		  },
		  "onRegister": function(data) {
		    console.log(data.token);

		  }
		});

		var callback = function(data) {
		  	push.addTokenToUser(ionicUser);
			ionicUser.save();
			console.log(ionicUser);
		  
		}

		push.register(callback);


		/*

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

		*/
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
		facebookConnectPlugin.showDialog( { method: "send", name: "name", picture: "http://i.imgur.com/g3Qc1HN.png", link: "http://www.iAspireLab.com", caption: "caption of choice", description: "description of choice" }, 
	    function (response) { alert(JSON.stringify(response)) },
	    function (response) { alert(JSON.stringify(response)) });
	}

	$scope.postFbStatus = function () {
		facebookConnectPlugin.showDialog( { method: "feed", name: "name", picture: "http://i.imgur.com/g3Qc1HN.png", link: "http://www.iAspireLab.com", caption: "iAspireLab", description: "description of choice" }, 
	    function (response) { alert(JSON.stringify(response)) },
	    function (response) { alert(JSON.stringify(response)) });
	}

	$scope.changePassword = function () {
		
		var ref = new Firebase(FirebaseConfig.root_url);
		ref.changePassword({
		  email       : "bobtony@firebase.com",
		  oldPassword : "correcthorsebatterystaple",
		  newPassword : "neatsupersecurenewpassword"
		}, function(error) {
		  if (error === null) {
		    console.log("Password changed successfully");
		  } else {
		    console.log("Error changing password:", error);
		  }
		});
	}    

});
