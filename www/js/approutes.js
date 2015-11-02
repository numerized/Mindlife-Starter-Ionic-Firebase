angular
    .module('starter')
    .config(config);

function config ($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

  $stateProvider

    .state('login', {
      url: "/login",
      templateUrl: "templates/login.html",
      controller: 'LoginCtrl'
    })
    .state('register', {
      url: "/register",
      templateUrl: "templates/register.html",
      controller: 'LoginCtrl'
    })
    .state('userLogin', {
      url: "/user-login",
      templateUrl: "templates/user-login.html",
      controller: 'LoginCtrl'
    })
    .state('userLoginPasswordReset', {
      url: "/user-login-password-reset",
      templateUrl: "templates/user-login-password-reset.html",
      controller: 'LoginCtrl'
    })
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })
    .state('tabs.home', {
      url: "/home",
      parent: "tabs",
      cache: true, //required
      views: {
        'tab-home': {
          templateUrl: "templates/tab-home.html",
          controller: 'HomeCtrl'
        }
      }
    })    
    .state('tabs.account', {
      url: "/account",
      views: {
        'tab-account': {
          controller: "AccountCtrl",
          templateUrl: "templates/tab-account.html"
        }
      }
    })
    .state('tabs.myprivacysettings', {
      url: "/myprivacysettings",
      views: {
        'tab-myprivacysettings': {
          controller: "mySurveyCtrl",
          templateUrl: "templates/tab-myprivacysettings.html"
        }
      }
    })
    .state('tabs.help', {
      url: "/help",
      views: {
        'tab-help': {
          controller: "HelpCtrl",
          templateUrl: "templates/tab-help.html"
        }
      }
    })
    
    

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

}