(function() {
    function seekBar($document) {
        
        var calculatePercent = function(seekBar, event) {
            var offsetX = event.pageX - seekBar.offset().left;
            var seekBarWidth = seekBar.width();
            var offsetXPercent = offsetX / seekBarWidth;
            offsetXPercent = Math.max(0, offsetXPercent);
            offsetXPercent = Math.min(1, offsetXPercent);
            return offsetXPercent;            
        };
        
        return {
            templateUrl: '/templates/directives/seek_bar.html',
            replace: true,
            restrict: 'E',
            scope: {
                onChange: '&'
            },
            link: function(scope, element, attributes) {
                scope.value = 0;
                scope.max = 100;
                
                var seekBar = $(element); // adding jQuery
                
                attributes.$observe('value', function(newValue) {
                    scope.value = newValue;
                });
                
                attributes.$observe('max', function(newValue) {
                    scope.max = newValue;
                })
                
                var percentString = function() {
                    var value = scope.value;
                    var max = scope.max;
                    var percent = value / max * 100;
                    return percent +"%";
                };
                
                scope.fillStyle = function() {
                    return { width: percentString() };
                };
                
                scope.thumbStyle = function() {
                    return { left: percentString() };
                };
                
                // Click Handler
                scope.onClickSeekBar = function(event) {
                    var percent = calculatePercent(seekBar, event);
                    scope.value = percent * scope.max;
                    notifyOnChange(scope.value);
                };
                
                // attach mousemove to ng-mousedown
                scope.trackThumb = function() {
                    $document.bind('mousemove.thumb', function(event) {
                        var percent = calculatePercent(seekBar, event);
                        scope.$apply(function() { // must wrap function in apply for Angular to invoke the changes immediately
                            scope.value = percent * scope.max;
                            notifyOnChange(scope.value);
                        });
                    });
                    
                    $document.bind('mouseup.thumb', function() {
                        $document.unbind('mousemove.thumb');
                        $document.unbind('mouseup.thumb');
                    });
                };
                
                // update the value of (value) attribute in the DOM for seek-bar directive
                var notifyOnChange = function(newValue) {
                    if (typeof scope.onChange === 'function') {
                        scope.onChange({value: newValue}); // pass newValue through onChange attribute into setCurrentTime function
                    }
                }
            }
        };
    }
    
    angular
        .module('blocJams')
        .directive('seekBar', ['$document', seekBar]);
})();