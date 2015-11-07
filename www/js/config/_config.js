/**
 *@ngdoc interface
 *@name _Config
 *@description Project Path: www/js/config/_config.js<br/><br/> JSON type format file hosting the list of parameters and constants to pass throughout the app
**/

var _Config = (function(){
  'use strict';
  var cfg = {
    firebaseUrl:'https://mindlife-starter-ion.firebaseio.com/',
    appVersion: '~',
    debug: true, // to toggle features between dev & prod
    verbose: true, // should log in console more infos
    track: false, // should send tracking events to a server
    storage: true, // should save data to browser storage
    storagePrefix: 'app-', // prefix all stoarge entries with this prefix
    emailSupport: 'kevin@help.org.uk',
    backendUrl: 'data', // 'http://myserver.com/api/v1',
    parse: {
      applicationId: '',
      restApiKey: ''
    },
    gcm: {
      // create project here : https://console.developers.google.com/
      senderID: '263462318850', // Google project number
      apiServerKey: 'AIzaSyDzM4XzyW9HWJNol9OePz4cAXi7QbVANOs' // used only to send notifications
    },
    contact: {
      name:'Mindlife-Starter-Ionic-Firebase',
      adressline1:'Adress line 1',
      adressline2:'Adress line 2',
      postcode:'POSTCODE',
      city:'CITY',
      country:'COUNTRY',
      phone1:'phone1',
      phone2:'phone2',
      email:'youremail@yourdomain.com',
      website:'http://yourwebsite.com'
    }
  };
  return cfg;
})();
