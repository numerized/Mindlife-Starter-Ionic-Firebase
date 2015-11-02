angular
    .module('app')
    .config(config);

function config ($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

  $stateProvider
    .state('tabs.account', {
      url: "/account",
      views: {
        'tab-account': {
          controller: "AccountController as AccC",
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
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

}