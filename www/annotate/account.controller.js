angular
  .module('app.account', [])
  .controller('AccountController', AccountController);

AccountController.$inject = ['FirebaseConfig'];

function AccountController (FirebaseConfig) {

  var vm = this;
  vm.welcome_message = "LOLAccount";

};