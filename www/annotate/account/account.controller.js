/**
* @ngdoc controller
* @name app.controller:AccountController
* @requires FirebaseConfig
* @function
*
* @description
* Generate the account view
*
* **Note:** This is my first doc page
*
*/
angular
  .module('app')
  .controller('AccountController', AccountController);

AccountController.$inject = ['FirebaseConfig'];

function AccountController (FirebaseConfig) {

  var AccC = this;
  AccC.config = _Config;
  AccC.welcome_message = "Account";

};