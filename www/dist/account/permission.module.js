angular.module("fooModule",["permission"]).run(["Permission","$q","$firebaseAuth",function(e,r,n){e.defineRole("Anonymous",function(e){var r=new Firebase("https://mindlife-starter-ion.firebaseio.com/"),o=n(r);return o.$getAuth()?!0:!1}).defineRole("User",function(e){var r=null,o=new Firebase(_Config.firebaseUrl),i=n(o);return r=i.$getAuth(),console.log("AuthCheck User"),console.log(i.$requireAuth()),i.$requireAuth()?!0:!1}).defineRole("Admin",function(e){var o=r.defer(),i=new Firebase(_Config.firebaseUrl),u=n(i);return console.log("AuthCheck Admin"),u.$requireAuth()?o.resolve():o.reject(),o.promise})}]);