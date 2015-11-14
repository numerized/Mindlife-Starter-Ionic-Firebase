/**
* @ngdoc controller
* @name app.controller:AssessmentResultController
* @requires app.factory:FirebaseFactory
* @function
*
* @description
* Generate the assessment view
*
*
*/
angular
  .module('app')
  .controller('AssessmentResultController', AssessmentResultController);

AssessmentResultController.$inject = ['$rootScope','$scope', '$timeout', 'FirebaseFactory', '$firebaseObject', 'AssessmentTemplateFactory', '$translate', '$state', '$ionicLoading', '$ionicHistory'];

function AssessmentResultController ($rootScope, $scope, $timeout, FirebaseFactory, $firebaseObject, AssessmentTemplateFactory, $translate, $state, $ionicLoading, $ionicHistory) {

  var AsRC = this;
  AsRC.loaded = false;
  
  $scope.$on("$ionicView.beforeEnter", function () {
    showLoading();
    AsRC.loaded = false;
    //console.log(AsRC.authData.uid);
    //var userCurrentAssessment = new Firebase(FirebaseFactory.assessments(AsRC.authData.uid));
    // download the data into a local object
    //var userCurrentAssessmentObject = $firebaseObject(userCurrentAssessment);
    //$scope.entered = false;
    //userCurrentAssessmentObject.$bindTo(AsRC, "userCurrentAssessmentData");
    $timeout(function (){
      showAssessmentResult();
    });
      
  }); 

  $scope.$on("$ionicView.afterEnter", function () {
    
  });

  var showLoading = function() {
    $ionicLoading.show({
      noBackdrop:false,
      template: '<ion-spinner></ion-spinner>'
    });
  };

  var hideLoading = function(){
    AsRC.loaded = true;
    $ionicLoading.hide();
  }; 

  var showAssessmentResult = function () {
    
    
      hideLoading();
  };

  
  AsRC.goBackHome = function() {
    $ionicHistory.nextViewOptions({
      disableAnimate: true,
      disableBack: true
    });

    $state.go('tabs.home');
    
  }

}