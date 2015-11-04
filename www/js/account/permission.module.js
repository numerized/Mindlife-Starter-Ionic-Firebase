angular
  .module('fooModule', ['permission'])
  .run(function (Permission, $q, $firebaseAuth) {
    // Define anonymous role
    Permission
    .defineRole('Anonymous', function (stateParams) {
      // If the returned value is *truthy* then the user has the role, otherwise they don't
      var ref = new Firebase('https://mindlife-starter-ion.firebaseio.com/');
      var authObj = $firebaseAuth(ref);
      if(authObj.$getAuth())
      {
        return true;
      }
      return false;
      
    })
    .defineRole('User', function (stateParams) {
      // This time we will return a promise
      // If the promise *resolves* then the user has the role, if it *rejects* (you guessed it)
      var authData = null;
      var ref = new Firebase(_Config.firebaseUrl);
      var authObj = $firebaseAuth(ref);
      authData = authObj.$getAuth();

      console.log('AuthCheck User');
      console.log(authObj.$requireAuth());
      if (authObj.$requireAuth()) {
        return true;
      }
      else
      {          
        return false;
      }
      
    })
    // A different example for admin
    .defineRole('Admin', function (stateParams) {
      var deferred = $q.defer();

      var ref = new Firebase(_Config.firebaseUrl);
      var authObj = $firebaseAuth(ref);
      console.log('AuthCheck Admin');
      //console.log(authObj.$waitForAuth())
     
      if (authObj.$requireAuth()) {
        deferred.resolve();
      } else {
        deferred.reject();
      }

      return deferred.promise;
    });
  });