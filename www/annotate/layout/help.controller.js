angular
  .module('app.help', [])
  .controller('HelpController', ["$scope", "$ionicSlideBoxDelegate", "$state", "$firebaseArray", "FirebaseConfig", "$ionicScrollDelegate", function($scope, $ionicSlideBoxDelegate, $state, $firebaseArray, FirebaseConfig, $ionicScrollDelegate) {

  $scope.currentSlide = 0;

  $scope.nextSlide = function() {
      $ionicSlideBoxDelegate.next();
  };
  
  $scope.previousSlide = function() {
    $ionicSlideBoxDelegate.previous();
  };

  $scope.slideHasChanged = function(index) {
    $scope.currentSlide = index;
  }

  $scope.sliderUpdate = function()
  {
    var slider = $ionicSlideBoxDelegate.$getByHandle('theHelpSlider');

    slider.update();
  }

}])
