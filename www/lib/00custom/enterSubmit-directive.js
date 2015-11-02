/* recommended */
/* calendar-range.directive.js */

/**
* @desc order directive that is specific to the order module at a company named Acme
* @example <div acme-order-calendar-range></div>
*/
angular
  .module('app')
  .directive('enterSubmit', enterSubmit);

function enterSubmit() {
    /* implementation details */
    return {
    restrict: 'A',
    link: function (scope, elem, attrs) {
     
      elem.bind('keydown', function(event) {
        var code = event.keyCode || event.which;
                
        if (code === 13) {
          if (!event.shiftKey) {
            event.preventDefault();
            scope.$apply(attrs.enterSubmit);
          }
        }
      });
    }
  }
};