angular
  .module('app')
  .config(ionicConfig);

function ionicConfig ($ionicConfigProvider) {
  
  if(!ionic.Platform.isIOS())
    $ionicConfigProvider.scrolling.jsScrolling(false);
  $ionicConfigProvider.views.transition('android');
  
};