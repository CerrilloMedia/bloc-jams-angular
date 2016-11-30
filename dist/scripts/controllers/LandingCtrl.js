(function() {
    function LandingCtrl() {
        this.heroTitle = "Turn the Music up!";
    }
    
    angular
        .module('blocJams') // dependencies array has already been set in site.js
        .controller('LandingCtrl', LandingCtrl ); // ( controller-name, callback-function || array)
})();

