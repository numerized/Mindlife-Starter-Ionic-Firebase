angular
  .module('app.home', [])
  .controller('HomeController', HomeController);

HomeController.$inject = ['FirebaseConfig', '$translate'];

function HomeController (FirebaseConfig, $translate, $scope) {

  $scope.$on('$ionicView.beforeEnter', function(e) {

    console.log(Config);

  });

  var HomC = this;
  HomC.welcome_message = "Welcome Home";
  

};