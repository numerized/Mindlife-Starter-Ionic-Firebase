angular.module('mysurvey.controllers', [])

.controller('mySurveyCtrl', function($scope, $rootScope, myPrivacySettingsData, $firebaseArray, FirebaseConfig, $ionicScrollDelegate) {

	$scope.myprivacysettingsData = myPrivacySettingsData;

	$scope.priority = ['not interested at all', 'no opinion', 'a little interested', 'very interested', 'fantastic idea'];
	$scope.yesno = ['no','yes'];

	var refMyPrivacySettings = new Firebase(FirebaseConfig.user+'/'+$rootScope.uid+'/privacy/');
	$scope.myPrivacySettings = $firebaseArray(refMyPrivacySettings);

	$scope.myPrivacySettings.$loaded(function(v)
		{
			var priority = 0;
			
			if(typeof v[0] == "undefined")
			{

				angular.forEach(myPrivacySettingsData.Questions, function(value, key) {

					refMyPrivacySettings.child(value.label).setWithPriority(value, priority);
					priority = priority+1;
				});
			}
		}	
	);
	
	$scope.onFocus = function() {
    	$scope.focused = true;
    }

    $scope.onHold = function () {
    	if($scope.focused == true)
			$ionicScrollDelegate.freezeAllScrolls(true);
	}

	$scope.onRelease = function (){
	   $ionicScrollDelegate.freezeAllScrolls(false);
	}

	$scope.saveReply = function (index, Category, questionLabel, replyText, replyNumber, type){
		
		var refCategory = new Firebase(FirebaseConfig.user+'/'+$rootScope.uid+'/privacy/');
    	var refCategoryArray = $firebaseArray(refCategory);

    	refCategoryArray.$loaded(function(v) {

    		var questionExists = refCategoryArray.$getRecord(questionLabel);    	    	

			questionExists.replyText = replyText;
			questionExists.replyNumber = replyNumber;
			
			if(questionExists.replyText)
			{

				questionExists.timestamp = Firebase.ServerValue.TIMESTAMP
				refCategoryArray.$save(questionExists);

			}
			

    	});

	}

	$scope.minus = function (index, Category, questionLabel, replyText, replyNumber){
		
		var refCategory = new Firebase(FirebaseConfig.user+'/'+$rootScope.uid+'/survey/'+Category+'/');
    	var refCategoryArray = $firebaseArray(refCategory);
    	refCategoryArray.$loaded(function(v) {

    		var questionExists = refCategoryArray.$getRecord(questionLabel);    	    	
			questionExists.replyText = replyText;
			questionExists.replyNumber = Number(replyNumber)-1;
			questionExists.timestamp = Firebase.ServerValue.TIMESTAMP
			refCategoryArray.$save(questionExists);

    	});

	}

	$scope.plus = function (index, Category, questionLabel, replyText, replyNumber){
		
		var refCategory = new Firebase(FirebaseConfig.user+'/'+$rootScope.uid+'/survey/'+Category+'/');
    	var refCategoryArray = $firebaseArray(refCategory);
    	refCategoryArray.$loaded(function(v) {

    		var questionExists = refCategoryArray.$getRecord(questionLabel);    	    	
			questionExists.replyText = replyText;
			questionExists.replyNumber = Number(replyNumber)+1;
			questionExists.timestamp = Firebase.ServerValue.TIMESTAMP
			refCategoryArray.$save(questionExists);

    	});

	}
	
});