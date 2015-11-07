angular
  .module('app.home', [])
  .controller('HomeController', HomeController);

HomeController.$inject = ['$rootScope', '$scope', 'FirebaseFactory', '$translate'];

function HomeController ($rootScope, $scope, FirebaseFactory, $translate) {

  $scope.$on('$ionicView.loaded', function(e) {

  });

  var HomC = this;
  HomC.welcome_message = "Welcome Home";
  

};