function FirebaseConfig(e){var r="https://mindlife-starter-ion.firebaseio.com/";return{root_url:r,welcome_message_url:r+"/welcome_message",users_url:r+"/users"}}angular.module("app").factory("FirebaseConfig",FirebaseConfig),FirebaseConfig.$inject=["$firebaseAuth"];