angular
  .module('fooModule', ['permission'])
  .run(function (Permission, $q, $firebaseAuth) {
    // Define anonymous role
    Permission
    .defineRole('Anonymous', function (stateParams) {
      // If the returned value is *truthy* then the user has the role, otherwise they don't
      var ref = new Firebase(_Config.firebaseUrl);
      var authObj = $firebaseAuth(ref);
      if(authObj.$getAuth())
      {
        return false;
      }
      return true;
      
    })
    .defineRole('User', function (stateParams) {

      var deferred = $q.defer();
      // This time we will return a promise
      // If the promise *resolves* then the user has the role, if it *rejects* (you guessed it)
      var ref = new Firebase(_Config.firebaseUrl);
      var authData = $firebaseAuth(ref).$getAuth();
      //authData = authObj.$getAuth();

      var permissionUrl = _Config.firebaseUrl+'users/'+authData.uid+'/permission';

      var userPermissionRef = new Firebase(permissionUrl);
      userPermissionRef.on('value', function(snapshot) {
        //console.log(snapshot.val().role)
        if (snapshot.val().role == 'User') {
          console.log('AuthCheck User Passed');
          deferred.resolve();
        }
        else
        {
          console.log('AuthCheck User Failed, user is only '+snapshot.val().role+'. Needed: User');
          deferred.reject();
        }
      });

      return deferred.promise;
      
    })
    // A different example for admin
    .defineRole('Admin', function (stateParams) {
      var deferred = $q.defer();
      // This time we will return a promise
      // If the promise *resolves* then the user has the role, if it *rejects* (you guessed it)
      var ref = new Firebase(_Config.firebaseUrl);
      var authData = $firebaseAuth(ref).$getAuth();
      //authData = authObj.$getAuth();

      var permissionUrl = _Config.firebaseUrl+'users/'+authData.uid+'/permission';

      var userPermissionRef = new Firebase(permissionUrl);
      userPermissionRef.on('value', function(snapshot) {
        //console.log(snapshot.val().role)
        if (snapshot.val().role == 'Admin') {
          console.log('AuthCheck Admin Passed');
          deferred.resolve();
        }
        else
        {
          console.log('AuthCheck Admin Failed, user is only '+snapshot.val().role+'. Needed: Admin');
          deferred.reject();
        }
      });

      return deferred.promise;
    })

    .defineManyRoles(['Trainer', 'Student'], function (stateParams, roleName) {
      var deferred = $q.defer();
      console.log(roleName);
      // This time we will return a promise
      // If the promise *resolves* then the user has the role, if it *rejects* (you guessed it)
      var ref = new Firebase(_Config.firebaseUrl);
      var authData = $firebaseAuth(ref).$getAuth();
      //authData = authObj.$getAuth();

      var permissionUrl = _Config.firebaseUrl+'users/'+authData.uid+'/permission';

      var userPermissionRef = new Firebase(permissionUrl);
      userPermissionRef.on('value', function(snapshot) {
        //console.log(snapshot.val().role)
        if (snapshot.val().role == roleName) {
          console.log('AuthCheck '+roleName+' Passed');
          deferred.resolve();
        }
        else
        {
          console.log('AuthCheck '+roleName+' Failed, user is only '+snapshot.val().role+'. Needed: '+roleName);
          deferred.reject();
        }
      });

      return deferred.promise;
    });


  });