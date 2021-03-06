// home.routes.js
angular
    .module('app.home')
    .config(configure);

function configure($stateProvider) {
  $stateProvider
  .state('tabs.home', {
    url: "/home",
    parent: "tabs",
    cache: true, //required
    views: {
      'tab-home': {
        controller: 'HomeController as HomC',
        templateUrl: "js/home/home.html"
      }
    },
    data: {
      permissions: {
        only: ['Admin'],
        redirectTo: 'tabs.account'
      }
    }
  });
}
