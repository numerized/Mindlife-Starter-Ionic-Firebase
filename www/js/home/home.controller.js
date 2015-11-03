angular
  .module('app.home', [])
  .controller('HomeController', HomeController);

HomeController.$inject = ['FirebaseConfig', '$translate'];

function HomeController (FirebaseConfig, $translate) {

  var HomC = this;
  HomC.welcome_message = "Welcome Home";
  console.log(Config);

};