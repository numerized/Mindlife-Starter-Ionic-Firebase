app.factory('FirebaseConfig', ["$firebaseAuth", function($firebaseAuth) {
	var root_url = 'https://audimatr.firebaseio.com';
	
	return {
		'root_url': root_url, 
		'welcome_message': root_url+'/welcome_message',
		'user': root_url+'/users',
		'activities': root_url+'/activities',
		'connected': root_url+'/.info/connected'
	};
}])