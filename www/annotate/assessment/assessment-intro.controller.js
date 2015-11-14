/**
* @ngdoc controller
* @name app.controller:AssessmentIntroController
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
  .controller('AssessmentIntroController', AssessmentIntroController);

AssessmentIntroController.$inject = ['$rootScope','$scope', '$timeout', 'FirebaseFactory', '$firebaseObject', 'AssessmentTemplateFactory', '$translate', '$state', '$ionicLoading'];

function AssessmentIntroController ($rootScope, $scope, $timeout, FirebaseFactory, $firebaseObject, AssessmentTemplateFactory, $translate, $state, $ionicLoading) {

  var AsIC = this;
  AsIC.loaded = false;
  
  $scope.$on("$ionicView.beforeEnter", function () {
    showLoading();
    AsIC.loaded = false;
    
    $timeout(function (){
      showAssessmentIntro();
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
    AsIC.loaded = true;
    $ionicLoading.hide();
  }; 

  var showAssessmentIntro = function () {
    
    AsIC.selectedLang = 'en-GB';
    var userCurrentAssessment = new Firebase(FirebaseFactory.assessments($scope.authData.uid));
    // download the data into a local object
    var userCurrentAssessmentObject = $firebaseObject(userCurrentAssessment);
    //$scope.entered = false;
    userCurrentAssessmentObject.$bindTo($scope, "AsIC.userCurrentAssessmentData");
    
    userCurrentAssessmentObject.$loaded().then(function() {
      if(userCurrentAssessmentObject.header == null)
      {
        userCurrentAssessmentObject.header = AssessmentTemplateFactory.header(AsIC.selectedLang);
        userCurrentAssessmentObject.$save();
      }

      if(userCurrentAssessmentObject.prerequisiteForm == null)
      {
        userCurrentAssessmentObject.prerequisiteForm = AssessmentTemplateFactory.prerequisiteForm(AsIC.selectedLang);
        userCurrentAssessmentObject.$save();
      }
      hideLoading();
    })
  };

  //console.log(AsIC.config);

  AsIC.setLang = function(lang) {
    
    $translate.use(lang.substring(0, 2));
    AsIC.selectedLang = lang;

    var userCurrentAssessment = new Firebase(FirebaseFactory.assessments($scope.authData.uid));
    // download the data into a local object
    var userCurrentAssessmentObject = $firebaseObject(userCurrentAssessment);
    //$scope.entered = false;
    userCurrentAssessmentObject.$bindTo($scope, "AsIC.userCurrentAssessmentData");
    
    userCurrentAssessmentObject.$loaded().then(function() {
    
      AsIC.prerequisiteForm = AssessmentTemplateFactory.prerequisiteForm(AsIC.selectedLang);
      angular.forEach(AsIC.prerequisiteForm, function (value, key) {
        value.reply = userCurrentAssessmentObject['prerequisiteForm'][key].reply?userCurrentAssessmentObject['prerequisiteForm'][key].reply:null;

      })

      userCurrentAssessmentObject.preferences = {'language':lang};
      userCurrentAssessmentObject.prerequisiteForm = AsIC.prerequisiteForm;
      userCurrentAssessmentObject.header = AssessmentTemplateFactory.header(AsIC.selectedLang);

      userCurrentAssessmentObject.$save();

      
    })
    
    AsIC.header = AssessmentTemplateFactory.header(lang);
    
    $rootScope.$broadcast('rzSliderForceRender');

  }

  AsIC.startQuestionnaire = function() {
    $rootScope.loaded = false;
    $state.go('tabs.assessment');
    
  }

}