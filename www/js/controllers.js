angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('HomeCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('HelpCtrl', function($scope, $ionicSlideBoxDelegate, $state, $firebaseArray, FirebaseConfig, $ionicScrollDelegate) {

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

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
});
