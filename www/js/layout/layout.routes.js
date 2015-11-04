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
        only: ['Admin']
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
};