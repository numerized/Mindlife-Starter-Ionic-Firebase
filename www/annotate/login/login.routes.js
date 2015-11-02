// login.routes.js
angular
    .module('app.login')
    .config(configure);

function configure($stateProvider) {
  $stateProvider
  .state('login', {
    url: "/login",
    templateUrl: "js/login/login.html",
    controller: 'LoginCtrl as LogC'
  })
  .state('register', {
    url: "/register",
    templateUrl: "js/login/register.html",
    controller: 'LoginCtrl'
  })
  .state('userLogin', {
    url: "/user-login",
    templateUrl: "js/login/user-login.html",
    controller: 'LoginCtrl'
  })
  .state('userLoginPasswordReset', {
    url: "/user-login-password-reset",
    templateUrl: "js/login/user-login-password-reset.html",
    controller: 'LoginCtrl'
  });
}
configure.$inject = ["$stateProvider"];




    