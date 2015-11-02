angular
  .module('app')
  .factory('myPrivacySettingsData');

function myPrivacySettingsData () {
	
  var myPrivacySettings = 
  { 'Questions' : 
  	{
  		'0':
    	{
  	  	'label' : "We’d love to know how you heard about iAspireLab:",
  		'type': "radio",
  		'other': true,
  		'replyNumber' : "-1",
  		'image' : "",
  		'options' : {
  			'0':"Through the Help2Help website",
  			'1':"Through Character Scotland",
  			'2':"I came across it on the internet",
  			'3':"A recommendation",
  			'4':"Through my school"
  		}
  	},
  	'1':
    	{
  	  	'label' : "If I win the Prize Draw or my suggestion(s) are incorporated in the full InspireAspire App I agree to my name being added to the winners list on the iAspireLab website",
  		'type': "yesno",
  		'image' : "",
  		'replyNumber' : "-1"
  	},
  	'2':
    	{
  	  	'label' : "As a valued contributor, would you like to receive the full InspireAspire App free of charge?",
  		'type': "yesno",
  		'image' : "",
  		'replyNumber' : "-1"
  	},
  	'3':
    	{
  	  	'label' : "Your first name:",
  		'type': "inputtext",
  		'image' : "",
  		'replyNumber' : "-1"
  	},
  	'4':
    	{
  	  	'label' : "Surname:",
  		'type': "inputtext",
  		'image' : "",
  		'replyNumber' : "-1"
  	},
  	'5':
    	{
  	  	'label' : "School name:",
  		'type': "inputtext",
  		'conditionQuestion': '0',
  		'conditionAnswer': '4',
  		'image' : "",
  		'replyNumber' : "-1"
  	},
  	'6':
    	{
  	  	'label' : "Your class:",
  		'type': "inputtext",
  		'conditionQuestion': '0',
  		'conditionAnswer': '4',
  		'image' : "",
  		'replyNumber' : "-1"
  	},
  	'7':
    	{
  	  	'label' : "Teacher assisting you:",
  		'type': "inputtext",
  		'conditionQuestion': '0',
  		'conditionAnswer': '4',
  		'image' : "",
  		'replyNumber' : "-1"
  	},
  	'8':
    	{
  	  	'label' : "City:",
  		'type': "inputtext",
  		'image' : "",
  		'replyNumber' : "-1"
  	},
  	'9':
    	{
  	  	'label' : "Country:",
  		'type': "inputtext",
  		'image' : "",
  		'replyNumber' : "-1"
  	},
  	'10':
    	{
  	  	'label' : "Your email:",
  		'type': "inputtext",
  		'init': "Auth.",
  		'image' : "",
  		'replyNumber' : "-1"
  	},
  	'11':
    	{
  	  	'label' : "Would you like to receive iAspireLab newsletter",
  		'type': "yesno",
  		'image' : "",
  		'replyNumber' : "-1"
  	},
  	'12':
    	{
  	  	'label' : "I agree to my teachers and evaluators viewing my iAspireLab entries",
  		'type': "yesno",
  		'conditionQuestion': '0',
  		'conditionAnswer': '4',
  		'image' : "",
  		'replyNumber' : "-1"
  	}
  	}
  };

  return myPrivacySettings;
};