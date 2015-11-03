angular
  .module('permissions.setter', ['permission', 'user'])
  .run(["Permission", "User", function (Permission, User) {
    // Define anonymous role
    Permission.defineRole('anonymous', function (stateParams) {
      // If the returned value is *truthy* then the user has the role, otherwise they don't
      if (!User) {
        return true; // Is anonymous
      }
      return false;
    });
  }]);