/**
 * @ngdoc controller
 * @name account.controller:AccountController
 * @element textarea
 * @function
 *
 * @description
 * Generate the account view
 *
 * **Note:** This is my first doc page
 *
 * @example
   <example module="rfx">
     <file name="index.html">
         <textarea ng-model="text"rx-autogrow class="input-block-level"></textarea>
         <pre>{{text}}</pre>
     </file>
   </example>
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