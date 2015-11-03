angular
  .module('app')
  .controller('AccountController', AccountController);

AccountController.$inject = ['FirebaseConfig'];

function AccountController (FirebaseConfig) {

  var vm = this;
  vm.welcome_message = "Account";

};