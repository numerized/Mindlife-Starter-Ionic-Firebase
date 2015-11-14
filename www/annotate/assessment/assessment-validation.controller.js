/**
* @ngdoc controller
* @name app.controller:AssessmentValidationController
* @requires app.factory:FirebaseFactory
* @function
*
* @description
* Generate the assessment validation view
*
*
*/
angular
  .module('app')
  .controller('AssessmentValidationController', AssessmentValidationController);

AssessmentValidationController.$inject = ['$rootScope','$scope', '$timeout', 'FirebaseFactory', '$firebaseObject', '$firebaseArray', 'AssessmentTemplateFactory', '$translate', '$state', '$ionicLoading', '$ionicHistory'];

function AssessmentValidationController ($rootScope, $scope, $timeout, FirebaseFactory, $firebaseObject, $firebaseArray, AssessmentTemplateFactory, $translate, $state, $ionicLoading, $ionicHistory) {

  var AsVC = this;
  AsVC.loaded = false;
  //$scope.entered = false;

  $scope.$on("$ionicView.beforeEnter", function () {
    
    showLoading();
    $timeout(function (){
      showAssessmentValidation();
    });
  });

  $scope.$on("$ionicView.afterEnter", function () { 
    
  });

  var showLoading = function() {
    AsVC.loaded = false;
    $ionicLoading.show({
      template: '<ion-spinner></ion-spinner>'
    });
  };

  var hideLoading = function(){
    AsVC.loaded = true;
    $ionicLoading.hide();
  };

  var showAssessmentValidation = function() {

    AsVC.selectedLang = 'en-GB';
    var userCurrentAssessment = new Firebase(FirebaseFactory.assessments($scope.authData.uid));
    // download the data into a local object
    var userCurrentAssessmentObject = $firebaseObject(userCurrentAssessment);
    //$scope.entered = false;
    userCurrentAssessmentObject.$bindTo($scope, "AsVC.userCurrentAssessmentData");
    
    userCurrentAssessmentObject.$loaded().then(function() {
      if(userCurrentAssessmentObject.header == null)
      {
        userCurrentAssessmentObject.header = AssessmentTemplateFactory.header(AsVC.selectedLang);
        userCurrentAssessmentObject.$save();
      }

      if(userCurrentAssessmentObject.prerequisiteForm == null)
      {
        userCurrentAssessmentObject.prerequisiteForm = AssessmentTemplateFactory.prerequisiteForm(AsVC.selectedLang);
        userCurrentAssessmentObject.$save();
      }
      hideLoading();
    })
    

  }

  AsVC.translate = function(value)
  {
      return AssessmentTemplateFactory.getConfigLabelByScore(AsVC.selectedLang, value)?AssessmentTemplateFactory.getConfigLabelByScore(AsVC.selectedLang, value):' ';
  }

  AsVC.setLang = function(lang) {
    
    $translate.use(lang.substring(0, 2));
    AsVC.selectedLang = lang;

    var userCurrentAssessment = new Firebase(FirebaseFactory.assessments($scope.authData.uid));
    // download the data into a local object
    var userCurrentAssessmentObject = $firebaseObject(userCurrentAssessment);
    //$scope.entered = false;
    userCurrentAssessmentObject.$bindTo($scope, "AsVC.userCurrentAssessmentData");
    
    userCurrentAssessmentObject.$loaded().then(function() {
    
      AsVC.prerequisiteForm = AssessmentTemplateFactory.prerequisiteForm(AsVC.selectedLang);
      angular.forEach(AsVC.prerequisiteForm, function (value, key) {
        value.reply = userCurrentAssessmentObject['prerequisiteForm'][key].reply?userCurrentAssessmentObject['prerequisiteForm'][key].reply:null;
      })

      userCurrentAssessmentObject.preferences = {'language':lang};
      userCurrentAssessmentObject.prerequisiteForm = AsVC.prerequisiteForm;
      userCurrentAssessmentObject.header = AssessmentTemplateFactory.header(AsVC.selectedLang);

      userCurrentAssessmentObject.$save();
      
    })
    
    AsVC.header = AssessmentTemplateFactory.header(lang);
    
    $rootScope.$broadcast('rzSliderForceRender');

  }

  AsVC.submitAnswers = function () {

    $ionicHistory.nextViewOptions({
      disableAnimate: true,
      disableBack: true
    });

    var userCurrentAssessmentHistory = new Firebase(FirebaseFactory.history($scope.authData.uid));
    // download the data into a local object
    var userCurrentAssessmentHistoryArray = $firebaseArray(userCurrentAssessmentHistory);
    //$scope.entered = false;    
    userCurrentAssessmentHistoryArray.$add ({
      assessment:AsVC.userCurrentAssessmentData,
      date:Firebase.ServerValue.TIMESTAMP
    }
    ).then(function(ref) {
      var userCurrentAssessment = new Firebase(FirebaseFactory.assessments($scope.authData.uid));
      // download the data into a local object
      var userCurrentAssessmentObject = $firebaseObject(userCurrentAssessment);

      userCurrentAssessmentObject.$loaded().then(function() {
        userCurrentAssessmentObject.questions = {};
        userCurrentAssessmentObject.prerequisiteForm = {};
        userCurrentAssessmentObject.header = {};
        userCurrentAssessmentObject.config = {};
        userCurrentAssessmentObject.preferences = {};

        userCurrentAssessmentObject.$save();
      })

      $state.go('tabs.assessmentResults')
    });


  
    
  }

  

}