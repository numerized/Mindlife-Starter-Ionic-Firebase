angular
  .module('starter.home', [])
  .controller('HomeController', HomeController);

HomeController.$inject = ['FirebaseConfig'];

function HomeController (FirebaseConfig) {

  var vm = this;
  vm.welcome_message = "LOL";

};