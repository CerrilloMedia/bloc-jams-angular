(function() {
    function timecode() {
        return function(seconds) {
            var seconds = Number.parseFloat(seconds);
            
            if (Number.isNaN(seconds)) { // check if seconds is a number
                return '-:--';
            }
            
            var wholeSeconds = Math.floor(seconds);
            var minutes = Math.floor(wholeSeconds / 60);
            var remainingSeconds = wholeSeconds % 60;
            
            var output = minutes + ':';
            
            if (remainingSeconds < 10) {
                output += '0';
            }
            
            output += remainingSeconds;            
            
            /* enable this to utilize the buzz library toTimer method mm:ss timecode
            return buzz.toTimer(seconds);
            */
            
            return output;
        };
        
    }
    
    
    
    angular
        .module('blocJams')
        .filter('timecode', timecode);    
})();