function runBlock(e,n,o,a,i,r,t,l,u,c,s,d){function g(){var e=new Firebase(l.root_url);i.authObj=n(e),i.authObj.$onAuth(function(e){null===e?a.go("login"):(p(),("login"==a.$current.name||"register"==a.$current.name||"userLogin"==a.$current.name)&&a.go("tabs.home"))})}g(),i.spinner=!1,c.use("en"),i.goHome=function(){a.go("tabs.home")},i.goHelp=function(){a.go("tabs.help")},i.goAccount=function(){a.go("tabs.account")},i.unAuth=function(){var e=new Firebase(l.root_url);e.unauth(),a.go("login")};var p=function(){function e(e){switch(e.provider){case"password":return e.password.email.replace(/@.*/,"");case"twitter":return e.twitter.displayName;case"facebook":return e.facebook.displayName;case"google":return e.google.displayName}}function n(e){switch(e.provider){case"password":return e.password.email;case"twitter":return e.twitter.displayName;case"facebook":return e.facebook.email;case"google":return e.google.email}}var o=new Firebase(l.users_url),a=function(o){if(o){var a=new Firebase(l.users_url+o.uid);i.authData=o,r(function(){"twitter"==o.provider?i.ownerPictureUrl=o.twitter.cachedUserProfile.profile_image_url:"facebook"==o.provider&&(i.ownerPictureUrl=o.facebook.cachedUserProfile.picture.data.url),a.child("account").once("value",function(r){r.val()?(a.child("account").update({name:e(o),email:n(o)?n(o):null,picture:i.ownerPictureUrl?i.ownerPictureUrl:null,lastConnexionDate:Firebase.ServerValue.TIMESTAMP}),i.authData.firebase=r.val()):(a.child("account").set({provider:o.provider,name:e(o),email:n(o)?n(o):null,picture:i.ownerPictureUrl?i.ownerPictureUrl:null,accountCreationDate:Firebase.ServerValue.TIMESTAMP}),a.child("permission").set({role:"User"}))})})}};o.onAuth(a)};o.ready(function(){window.Connection&&(navigator.connection.type==Connection.NONE&&d.confirm({title:"No Internet Connection",content:"Sorry, no Internet connectivity detected. Please reconnect and try again."}).then(function(e){e||ionic.Platform.exitApp()}),i.online=navigator.onLine?"online":"offline",i.$apply(),window.addEventListener?(window.addEventListener("online",function(){i.online="online",i.$apply()},!0),window.addEventListener("offline",function(){i.online="offline",i.$apply()},!0)):(document.body.ononline=function(){i.online="online",i.$apply()},document.body.onoffline=function(){i.online="offline",i.$apply()})),window.cordova&&window.cordova.plugins.Keyboard&&(cordova.plugins.Keyboard.hideKeyboardAccessoryBar(!0),cordova.plugins.Keyboard.disableScroll(!0)),window.StatusBar&&s.style(),window.navigator.language?(i.globalization={value:window.navigator.language},c.use(i.globalization.value)):window.navigator.userLanguage&&(i.globalization={value:window.navigator.userLanguage},c.use(i.globalization.value)),i.device=t.getDevice(),u.getPreferredLanguage().then(function(e){i.globalization=e,i.globalization.value=i.globalization.value.substring(0,2),c.use(i.globalization.value)},function(e){i.globalization=e})},!1)}angular.module("app",["ionic","app.help","app.home","pascalprecht.translate","ngResource","firebase","ngCordova","permission","permissionSetter"]).run(runBlock),runBlock.$inject=["Permission","$firebaseAuth","$ionicPlatform","$state","$rootScope","$timeout","$cordovaDevice","FirebaseFactory","$cordovaGlobalization","$translate","$cordovaStatusbar","$ionicPopup"];