angular
  .module('starter.home')
  .controller('HomeController', HomeController);

HomeController.$inject = ['$scope','FirebaseConfig'];

function HomeController ($scope, FirebaseConfig) {

  var vm = this;
  this.welcome_message = "LOL";
  console.log(vm.welcome_message);

  return vm;

}