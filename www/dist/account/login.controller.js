function LoginController(e,n,o,i){var s=new Firebase(i.root_url),t=this;t.login={},t.login_message=null,t.spinner=!1,t.register=function(e,o){t.spinner=!0,n.authObj.$createUser({email:e,password:o}).then(function(i){return console.log("User "+i.uid+" created successfully!"),t.login_message="your account has been created, you'll now be connected automatically",n.authObj.$authWithPassword({email:e,password:o})})["catch"](function(i){"INVALID_ARGUMENTS"==i.code?t.login_message="invalid credentials":"INVALID_USER"==i.code?t.login_message="invalid_user":"INVALID_EMAIL"==i.code?t.login_message="The email provided is invalid":"EMAIL_TAKEN"==i.code?(t.login_message="The email provided is already taken",n.userLogin(e,o)):i&&(t.login_message="Please verify your informations"),console.error("Error: ",i.code),t.spinner=!1})},t.returnToLogin=function(){o.go("login")},t.userLogin=function(e,o){t.spinner=!0,n.authObj.$authWithPassword({email:e,password:o}).then(function(e){t.login_message="signin you up..."},function(n){"INVALID_ARGUMENTS"==n.code?t.login_message="invalid credentials":"INVALID_USER"==n.code?t.login_message="This email is not registered":"INVALID_EMAIL"==n.code?t.login_message="The email provided is invalid":"INVALID_PASSWORD"==n.code?t.login_message="The password provided is incorrect":"EMAIL_TAKEN"==n.code?(t.login_message="The email provided is already taken",t.userLogin(e,o)):n&&(t.login_message="Please verify your informations"),t.spinner=!1})},t.userRegister=function(){o.go("register")},t.userLoginPage=function(){o.go("userLogin")},t.returnToLogin=function(){o.go("login")},t.googleLogin=function(){t.spinner=!0,s.authWithOAuthPopup("google",function(e,n){e&&(console.log("Authentication Failed!",e),"TRANSPORT_UNAVAILABLE"===e.code?s.authWithOAuthRedirect("google",function(e,n){e?(console.log("Login Failed!",e),t.spinner=!1):(t.authData=n,t.onAuthUser())},{scope:"email"}):(t.spinner=!1,console.log(e)))},{scope:"email"})},t.twitterLogin=function(){t.spinner=!0,s.authWithOAuthPopup("twitter",function(e,n){e?(console.log("Authentication Failed!",e),"TRANSPORT_UNAVAILABLE"===e.code?s.authWithOAuthRedirect("twitter",function(e,n){e?(console.log("Login Failed!",e),t.spinner=!1):(t.authData=n,t.onAuthUser())}):(t.spinner=!1,console.log(e))):(t.authData=n,t.onAuthUser())})},t.fbLogin=function(){t.spinner=!0,s.authWithOAuthPopup("facebook",function(e,n){e&&(console.log("Authentication Failed!",e),"TRANSPORT_UNAVAILABLE"===e.code?s.authWithOAuthRedirect("facebook",function(e,n){e&&(console.log("Login Failed!",e),t.spinner=!1)}):(t.spinner=!1,console.log(e)))})},t.fbAppLogin=function(){t.spinner=!0;var e=function(e){t.friendsData=e,t.onAuthUser()},n=function(e){t.spinner=!1,t.$apply()},o=function(n){s.authWithOAuthToken("facebook",n.authResponse.accessToken,function(o,i){o?(t.spinner=!1,console.log("Login Failed!",o)):(t.authData=i,t.fbData=n,facebookConnectPlugin.api("/me/friends?fields=id,name,picture",["user_friends"],e,function(e){alert(""+e)}))})};facebookConnectPlugin.login(["public_profile","email","user_friends"],o,n)},t.userLoginPasswordReset=function(e){t.spinner=!0,s.resetPassword({email:e?e:"null@verynull.com"},function(o){o?(t.login_message="Please verify your email: "+o,t.spinner=!1,n.$apply()):(t.login_message="Password reset email sent successfully to "+e,t.spinner=!1,n.$apply())})}}angular.module("app").controller("LoginController",LoginController),LoginController.$inject=["$rootScope","$scope","$state","FirebaseConfig"];