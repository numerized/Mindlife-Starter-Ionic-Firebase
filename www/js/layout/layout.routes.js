angular
  .module('app')
  .config(configure);

function configure($stateProvider){
  $stateProvider
  .state('tabs', {
    url: "/tab",
    abstract: true,
    templateUrl: "js/layout/tabs.html"
  })
};