angular
  .module('app.home', [])
  .controller('HomeController', HomeController);

HomeController.$inject = ['$rootScope', '$scope', 'FirebaseConfig', '$translate'];

function HomeController ($rootScope, $scope, FirebaseConfig, $translate) {

  $scope.$on('$ionicView.loaded', function(e) {

  });

  var HomC = this;
  HomC.welcome_message = "Welcome Home";
  

};