angular
  .module('app')
  .controller('AccountController', AccountController);

AccountController.$inject = ['FirebaseConfig'];

function AccountController (FirebaseConfig) {

  console.log(_Config);
  var AccC = this;
  AccC.config = _Config;
  AccC.welcome_message = "Account";

};