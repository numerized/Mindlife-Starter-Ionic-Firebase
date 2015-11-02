angular
  .module('starter')
  .directive('textarea', textarea);

function textarea () {
    return {
        restrict: 'E',
        scope: {
            'noIonic': '='
        },
        link: function(scope, element, attr){
            if(scope.noIonic){
                element.bind('touchend  touchmove touchstart', function(e){
                    e.stopPropagation();
                });    
            } 
        }
    }
};