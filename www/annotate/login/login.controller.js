angular
	.module('app.login', [])

.controller('LoginCtrl', ["$scope", "$rootScope", "$timeout", "$location", "$interval", "$state", "FirebaseConfig", "$firebaseObject", "$firebaseArray", "$firebaseAuth", "$translate", function ($scope, $rootScope, $timeout, $location, $interval, $state, FirebaseConfig, $firebaseObject, $firebaseArray, $firebaseAuth, $translate) {

	var times = 0;
	$rootScope.firstTimeUser = false;
	$scope.login = {};
	$rootScope.login_message = null;
	$rootScope.spinner = false;

 	var register = {};

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
}])

.controller('AccountCtrl', ["$sce", "$scope", "$rootScope", "$state", "$firebaseObject", "$cordovaStatusbar", "FirebaseConfig", "$translate", function ($sce, $scope, $rootScope, $state, $firebaseObject, $cordovaStatusbar, FirebaseConfig, $translate) {
  
	$rootScope.spinner = false;

	$scope.$on('$ionicView.enter', function(e) {		

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

	$scope.unAuth = function ()
	{
		var ref = new Firebase(FirebaseConfig.root_url);
		ref.unauth();
		$scope.gotoLogin();
		
	}

	$scope.gotoLogin = function () {
		$rootScope.privateData = null;
		$state.go('login');
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

}]);
