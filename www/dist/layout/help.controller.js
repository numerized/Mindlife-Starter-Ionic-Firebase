angular.module("app.help",[]).controller("HelpController",["$scope","$ionicSlideBoxDelegate",function(e,n){e.currentSlide=0,e.nextSlide=function(){n.next()},e.previousSlide=function(){n.previous()},e.slideHasChanged=function(n){e.currentSlide=n},e.sliderUpdate=function(){var e=n.$getByHandle("theHelpSlider");e.update()}}]);