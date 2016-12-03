(function() {
    function SongPlayer() {
        var SongPlayer = {};
        /**
        * @desc song object placeholder
        * @type {Object}
        */
        var currentSong = null;
        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;        
        
        /**
        * @function setSong
        * @desc Stops currently playing song and Loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        var setSong = function(song) {
            if (currentBuzzObject) { // if song is already playing, stop it first
                currentBuzzObject.stop(); // stop song playing
                currentSong.playing = null;
            }
                
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            currentSong = song;
        };
        
        /**
        * @function playSong
        * @desc 
        * @param {Object} song
        */
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };
        
        /**
        * @method SongPlayer.play
        * @desc test play status of song object and assign proper private function
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            if (currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (currentSong === song) { // if current song is the same as clicked on
                if ( currentBuzzObject.isPaused() ) { // if song is already paused
                    playSong(song);
                }
            }
        };
        
        /**
        * @method SongPlayer.pause
        * @desc pause currently playing song, update status of song object
        * @param {Object} song
        */
        SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
        }
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();