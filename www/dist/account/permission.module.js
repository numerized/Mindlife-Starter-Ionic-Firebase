angular.module("permissionSetter",["permission"]).run(["Permission","$q","$firebaseAuth",function(e,r,n){e.defineRole("Anonymous",function(e){var r=new Firebase(_Config.firebaseUrl),o=n(r).$getAuth();return o?!1:!0}).defineRole("User",function(e){var o=r.defer(),s=new Firebase(_Config.firebaseUrl),i=n(s).$getAuth(),l=_Config.firebaseUrl+"users/"+i.uid+"/permission",u=new Firebase(l);return u.on("value",function(e){"User"==e.val().role?(console.log("AuthCheck User Passed"),o.resolve()):(console.log("AuthCheck User Failed, user is only "+e.val().role+". Needed: User"),o.reject())}),o.promise}).defineRole("Admin",function(e){var o=r.defer(),s=new Firebase(_Config.firebaseUrl),i=n(s).$getAuth(),l=_Config.firebaseUrl+"users/"+i.uid+"/permission",u=new Firebase(l);return u.on("value",function(e){"Admin"==e.val().role?(console.log("AuthCheck Admin Passed"),o.resolve()):(console.log("AuthCheck Admin Failed, user is only "+e.val().role+". Needed: Admin"),o.reject())}),o.promise}).defineManyRoles(["Trainer","Student"],function(e,o){var s=r.defer();console.log(o);var i=new Firebase(_Config.firebaseUrl),l=n(i).$getAuth(),u=_Config.firebaseUrl+"users/"+l.uid+"/permission",a=new Firebase(u);return a.on("value",function(e){e.val().role==o?(console.log("AuthCheck "+o+" Passed"),s.resolve()):(console.log("AuthCheck "+o+" Failed, user is only "+e.val().role+". Needed: "+o),s.reject())}),s.promise})}]);