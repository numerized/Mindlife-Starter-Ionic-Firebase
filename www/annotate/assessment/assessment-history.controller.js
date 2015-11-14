/**
* @ngdoc controller
* @name app.controller:AssessmentHistoryController
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
  .controller('AssessmentHistoryController', AssessmentHistoryController);

AssessmentHistoryController.$inject = ['$rootScope','$scope', '$timeout', 'FirebaseFactory', '$firebaseObject', 'AssessmentTemplateFactory', '$translate', '$state', '$ionicLoading'];

function AssessmentHistoryController ($rootScope, $scope, $timeout, FirebaseFactory, $firebaseObject, AssessmentTemplateFactory, $translate, $state, $ionicLoading) {

  var AsHC = this;
  AsHC.loaded = false;
  
  $scope.$on("$ionicView.beforeEnter", function () {
    showLoading();
    AsHC.loaded = false;
    //console.log(AsHC.authData.uid);
    //var userCurrentAssessment = new Firebase(FirebaseFactory.assessments(AsHC.authData.uid));
    // download the data into a local object
    //var userCurrentAssessmentObject = $firebaseObject(userCurrentAssessment);
    //$scope.entered = false;
    //userCurrentAssessmentObject.$bindTo(AsHC, "userCurrentAssessmentData");
    $timeout(function (){
      showAssessmentHistory();
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
    AsHC.loaded = true;
    $ionicLoading.hide();
  }; 

  var showAssessmentHistory = function () {
    
    var userHistoryAssessment = new Firebase(FirebaseFactory.history($scope.authData.uid));

    userHistoryAssessment.once("value", function(snapshot) {
      AsHC.numAssessments = snapshot.numChildren();
      AsHC.historyAssessments = snapshot.val();
      hideLoading();
    });


  };

}