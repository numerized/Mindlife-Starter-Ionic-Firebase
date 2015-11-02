angular
  .module('starter.home', [])
  .controller('HomeController', HomeController);

HomeController.$inject = ['FirebaseConfig', 'Chats'];

function HomeController (FirebaseConfig, Chats) {
  var vm = this;
  vm.welcome_message = 'lol';

}