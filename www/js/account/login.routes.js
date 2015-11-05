// login.routes.js
angular
    .module('app')
    .config(configure);

function configure($stateProvider) {
  $stateProvider
  .state('login', {
    url: "/login",
    templateUrl: "js/account/login.html",
    controller: 'LoginController as LogC'
  })
  .state('register', {
    url: "/register",
    templateUrl: "js/account/register.html",
    controller: 'LoginController as LogC'
  })
  .state('userLogin', {
    url: "/user-login",
    templateUrl: "js/account/user-login.html",
    controller: 'LoginController as LogC'
  })
  .state('userLoginPasswordReset', {
    url: "/user-login-password-reset",
    templateUrl: "js/account/user-login-password-reset.html",
    controller: 'LoginController as LogC'
  })
  .state('tabs.account', {
    url: "/account",
    views: {
      'tab-account': {
        controller: "AccountController as AccC",
        templateUrl: "js/account/account.html"
      }
    }
  });
}