angular.module("fooModule",["permission"]).run(["Permission","$q","$firebaseAuth",function(e,r,o){e.defineRole("Anonymous",function(e){var r=new Firebase(_Config.firebaseUrl),n=o(r).$getAuth();return n?!1:!0}).defineRole("User",function(e){var n=r.defer(),s=new Firebase(_Config.firebaseUrl),i=o(s).$getAuth(),l=_Config.firebaseUrl+"users/"+i.uid+"/permission",u=new Firebase(l);return u.on("value",function(e){"User"==e.val().role?(console.log("AuthCheck User Passed"),n.resolve()):(console.log("AuthCheck User Failed, user is only "+e.val().role+". Needed: User"),n.reject())}),n.promise}).defineRole("Admin",function(e){var n=r.defer(),s=new Firebase(_Config.firebaseUrl),i=o(s).$getAuth(),l=_Config.firebaseUrl+"users/"+i.uid+"/permission",u=new Firebase(l);return u.on("value",function(e){"Admin"==e.val().role?(console.log("AuthCheck Admin Passed"),n.resolve()):(console.log("AuthCheck Admin Failed, user is only "+e.val().role+". Needed: Admin"),n.reject())}),n.promise}).defineManyRoles(["Trainer","Student"],function(e,n){var s=r.defer();console.log(n);var i=new Firebase(_Config.firebaseUrl),l=o(i).$getAuth(),u=_Config.firebaseUrl+"users/"+l.uid+"/permission",a=new Firebase(u);return a.on("value",function(e){e.val().role==n?(console.log("AuthCheck "+n+" Passed"),s.resolve()):(console.log("AuthCheck "+n+" Failed, user is only "+e.val().role+". Needed: "+n),s.reject())}),s.promise})}]);