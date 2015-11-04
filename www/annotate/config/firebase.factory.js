angular
  .module('app')
  .factory('FirebaseConfig', FirebaseConfig);
  
function FirebaseConfig ($firebaseAuth) {
  var root_url = _Config.firebaseUrl;

  return {
  	'root_url': root_url, 
  	'welcome_message_url': root_url+'/welcome_message',
  	'users_url': root_url+'/users/'
  };
}
FirebaseConfig.$inject = ["$firebaseAuth"];