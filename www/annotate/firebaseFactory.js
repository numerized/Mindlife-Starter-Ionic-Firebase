angular
  .module('starter')
  .factory('FirebaseConfig', FirebaseConfig);
  
function FirebaseConfig ($firebaseAuth) {
  var root_url = 'https://mindlife-starter-ion.firebaseio.com/';

  return {
  	'root_url': root_url, 
  	'welcome_message_url': root_url+'/welcome_message',
  	'users_url': root_url+'/users'
  };
}
FirebaseConfig.$inject = ["$firebaseAuth"];