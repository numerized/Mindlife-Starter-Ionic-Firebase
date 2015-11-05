angular
  .module('app')
  .config(configure);

function configure($stateProvider){
  $stateProvider
  .state('tabs', {
    url: "/tab",
    abstract: true,
    templateUrl: "js/layout/tabs.html",
    data: {
      permissions: {
        only: ['Trainer', 'Student', 'User', 'Admin'],
        redirectTo: 'login'
      }
    }
  })
  .state('tabs.help', {
    url: "/help",
    views: {
      'tab-help': {
        controller: "HelpController",
        templateUrl: "js/layout/help.html"
      }
    }
  })
}
configure.$inject = ["$stateProvider"];;