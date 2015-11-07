/**
* @ngdoc controller
* @name app.controller:LoginController
* 
* @description
* Generate the login views
*
* **Note:** This is my second doc page
*
**/

angular
  .module('app')
  .controller('LoginController', LoginController);

function LoginController($rootScope, $scope, $state, FirebaseFactory) {

  var ref = new Firebase(FirebaseFactory.root_url);
  var register = {};
  var LogC = this;
	LogC.login = {};
	LogC.login_message = null;
	LogC.spinner = false;

  /**
  * @ngdoc method
  * @name register
  * @methodOf app.controller:LoginController
  * @description
  * Register a new user to Firebase Auth system
  *
  * @param {string} email Email of the new user
  * @param {string} password Password of the new user
  * @returns {Array} The returned item...
  */

  LogC.register = function (email, password) {

    LogC.spinner = true;
    $scope.authObj.$createUser({
      email: email,
      password: password
    }).then(function(userData) {
      console.log("User " + userData.uid + " created successfully!");
      LogC.login_message = 'your account has been created, you\'ll now be connected automatically';
      return $scope.authObj.$authWithPassword({
        email: email,
        password: password
      });
    }).catch(function(error) {
        if(error.code == "INVALID_ARGUMENTS")
        {
          LogC.login_message = 'invalid credentials';
          
        }
        else if(error.code == "INVALID_USER")
        {
          LogC.login_message = 'invalid_user';
          
        }
        else if(error.code == "INVALID_EMAIL")
        {
          LogC.login_message = 'The email provided is invalid';
          
        }
        else if(error.code == "EMAIL_TAKEN")
        {
          LogC.login_message = 'The email provided is already taken';
          $scope.userLogin(email, password);
          
        }
        else if(error)
        {
          LogC.login_message = 'Please verify your informations';
          //$scope.userLogin(email, password);
        }
      console.error("Error: ", error.code);
      LogC.spinner = false;
    });
  }

  /**
  * @ngdoc method
  * @name userLogin
  * @methodOf app.controller:LoginController
  * @description
  * Logs in a existing user to Firebase Auth system and triggers the $rootScope.onAuth method
  *
  * @param {string} email Email of the existing user
  * @param {string} password Password of the existing user
  */

	LogC.userLogin = function (email, password) {
		
	  LogC.spinner = true;
	      	
    $scope.authObj.$authWithPassword({
      email: email,
      password: password
    }).then(function(authData) {
      LogC.login_message = 'signin you up...';
    }, function(error) 
    {

      if(error.code == "INVALID_ARGUMENTS")
  		{
  			LogC.login_message = 'invalid credentials';
  			
  		}
  		else if(error.code == "INVALID_USER")
  		{
  			LogC.login_message = 'This email is not registered';
  			
  		}
  		else if(error.code == "INVALID_EMAIL")
  		{
  			LogC.login_message = 'The email provided is invalid';
  			
  		}
  		else if(error.code == "INVALID_PASSWORD")
  		{
  			LogC.login_message = 'The password provided is incorrect';
  			
  		}
  		else if(error.code == "EMAIL_TAKEN")
  		{
  			LogC.login_message = 'The email provided is already taken';
  			LogC.userLogin(email, password);
  			
  		}
  		else if(error)
  		{
  			LogC.login_message = 'Please verify your informations';
  			//LogC.userLogin(email, password);
  		}
  		LogC.spinner = false;
    });
  }

  /**
  * @ngdoc method
  * @name userRegister
  * @methodOf app.controller:LoginController
  * @description
  * Change current state to register state
  */

	LogC.userRegister = function () {
		$state.go('register');
	}

  /**
  * @ngdoc method
  * @name userLoginPage
  * @methodOf app.controller:LoginController
  * @description
  * Change current state to userLogin state
  */

	LogC.userLoginPage = function () {
		$state.go('userLogin');
	}

  /**
  * @ngdoc method
  * @name returnToLogin
  * @methodOf app.controller:LoginController
  * @description
  * Change current state to login state
  */

	LogC.returnToLogin = function () {
   	$state.go('login');
  }

  /**
  * @ngdoc method
  * @name googleLogin
  * @methodOf app.controller:LoginController
  * @description
  * Try to log the user with his google credentials.
  */

	LogC.googleLogin = function() {
        
    LogC.spinner = true;

    ref.authWithOAuthPopup("google",function(error,authData) {
		  if (error) {
		    console.log("Authentication Failed!", error);
		    if (error.code === 'TRANSPORT_UNAVAILABLE') {
		        ref.authWithOAuthRedirect("google", function(error, authData) {
		        	if (error) {
				    	console.log("Login Failed!", error);
				    	LogC.spinner = false;
				  } else {
				    LogC.authData = authData;
				    LogC.onAuthUser();
				  }
		        }, {
				  scope: "email"
				});
		      } else {
		      	LogC.spinner = false;
		        console.log(error);
		      }
		  } else {
		    // We'll never get here, as the page will redirect on success.
		  }
		}, {
		  scope: "email"
		});
	}

  /**
  * @ngdoc method
  * @name twitterLogin
  * @methodOf app.controller:LoginController
  * @description
  * Try to log the user with his twitter credentials.
  */

	LogC.twitterLogin = function() 
	{
		LogC.spinner = true;

		ref.authWithOAuthPopup("twitter",function(error,authData) {
		  if (error) {
		    console.log("Authentication Failed!", error);
		    if (error.code === 'TRANSPORT_UNAVAILABLE') {
		        ref.authWithOAuthRedirect("twitter", function(error, authData) {
		        	if (error) {
				    	console.log("Login Failed!", error);
				    	LogC.spinner = false;
				  } else {
				    LogC.authData = authData;
				    LogC.onAuthUser();
				  }
		        });
		      } else {
		      	LogC.spinner = false;
		        console.log(error);
		      }
		  } else {
		    // We'll never get here, as the page will redirect on success.
		    LogC.authData = authData;
			LogC.onAuthUser();
		  }
		});
	}

  /**
  * @ngdoc method
  * @name fbLogin
  * @methodOf app.controller:LoginController
  * @description
  * Try to log the user with his facebook credentials.
  */

	LogC.fbLogin = function ()
	{
		LogC.spinner = true;
		
		ref.authWithOAuthPopup("facebook",function(error,authData) {
		  if (error) {
		    console.log("Authentication Failed!", error);
		    if (error.code === 'TRANSPORT_UNAVAILABLE') {
		        ref.authWithOAuthRedirect("facebook", function(error, authData) {
		        	if (error) {
				    	console.log("Login Failed!", error);
				    	LogC.spinner = false;
				  } else {
				    //LogC.authData = authData;
				    //LogC.onAuthUser();
				  }
		        });
		      } else {
		      	LogC.spinner = false;
		        console.log(error);
		      }
		  } else {
		    // We'll never get here, as the page will redirect on success.
		    //LogC.authData = authData;
			//LogC.onAuthUser();
		  }
		})
	}

  /**
  * @ngdoc method
  * @name fbAppLogin
  * @methodOf app.controller:LoginController
  * @description
  * Try to log the user with his pre-installed facebook app, if app is not installed the user is redirected to the normal fb login function.
  */

	LogC.fbAppLogin = function ()
	{
		LogC.spinner = true;

		var fbAppGetFriends = function (friendsData)
		{
			LogC.friendsData = friendsData;
			LogC.onAuthUser();
		}

		var fbAppLoginError = function (error) {

			LogC.spinner = false;
			LogC.$apply();

		};

		var fbAppLoginSuccess = function (userData) {

			ref.authWithOAuthToken("facebook", userData.authResponse.accessToken, function(error, authData) {
			if (error) {
			  LogC.spinner = false;
			  console.log("Login Failed!", error);
			} else {
				LogC.authData = authData;
				LogC.fbData = userData;
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

  /**
  * @ngdoc method
  * @name userLoginPasswordReset
  * @methodOf app.controller:LoginController
  * @description
  * Sends an email with password reset instructions
  */

	LogC.userLoginPasswordReset = function(email)
	{

    LogC.spinner = true;		
		
		ref.resetPassword({
		  email: email?email:'null@verynull.com'
		}, function(error) {
		  if (error) {
			LogC.login_message = "Please verify your email: " + error;
			LogC.spinner = false;
			$scope.$apply();	
		  } else {
		    LogC.login_message = "Password reset email sent successfully to "+email;
		    LogC.spinner = false;
		    $scope.$apply();
		  }
		});

	}
}