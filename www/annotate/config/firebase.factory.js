/**
 *@ngdoc service
 *@name app.factory:FirebaseFactory
**/

angular
  .module('app')
  .factory('FirebaseFactory', FirebaseFactory);
  
function FirebaseFactory ($firebaseAuth) {
  var root_url = _Config.firebaseUrl;

  return {
  	'root_url': root_url, 
  	'welcome_message_url': root_url+'/welcome_message',
  	'users_url': root_url+'/users/'
  };
}
FirebaseFactory.$inject = ["$firebaseAuth"];