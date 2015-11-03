angular
  .module('app')
  .controller('AccountController', AccountController);

AccountController.$inject = ['FirebaseConfig'];

function AccountController (FirebaseConfig) {

  console.log(Config);
  var AccC = this;
  AccC.config = Config;
  AccC.welcome_message = "Account";

};