/**
* @ngdoc controller
* @name app.controller:AccountController
* @requires app.factory:FirebaseFactory
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

AccountController.$inject = ['FirebaseFactory'];

function AccountController (FirebaseFactory) {

  var AccC = this;
  AccC.config = _Config;
  AccC.welcome_message = "Account";

};