(function() {
    function SongPlayer(Fixtures) {
        var SongPlayer = {};
        
        var albumRepeat = null; // future functionality
        
        /*******************
        * @desc CurrentAlbum object
        * @type {Object}
        */        
        var currentAlbum = Fixtures.getAlbum();
        
        /*******************
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;        
        
        /*******************
        * @function setSong
        * @desc Stops currently playing song and Loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        var setSong = function(song) {
            if (currentBuzzObject) { // if song is already playing, stop it before playing another track
                stopSong(SongPlayer.currentSong);
            }
                
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            SongPlayer.currentSong = song;
        };
        
        /*******************
        * @function playSong
        * @desc 
        * @param {Object} song
        */
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };
        
        /*******************
        * @function stopSong
        * @desc stop currentBuzzObject from playing & set song.playing object to false
        # @param {Object} song
        */        
        var stopSong = function(song) {
            currentBuzzObject.stop();
            song.playing = null;
        }
        
        /*******************
        * @method SongPlayer.play
        * @desc test play status of song object and assign proper private function
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong === song) {   // if current song is the same as clicked on
                if ( currentBuzzObject.isPaused() ) {       // if song is already paused
                    playSong(song);                         // play the song 
                }
            }
        };
        
        /*******************
        * @function getSongIndex
        * @desc objtain song index of current playing song
        * @param {Object} song
        */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
        
        /*******************
        * @desc Active song object from list of songs
        * @type {Object}
        */
        SongPlayer.currentSong = null;
        
        /*******************
        * @method SongPlayer.pause
        * @desc pause currently playing song, update status of song object
        * @param {Object} song
        */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        /*******************
        * @method SongPlayer.previous
        * @desc change song index to previous index
        */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong); // pass song object to getSongIndex
            currentSongIndex--;
            
            if (currentSongIndex < 0 && albumRepeat === null) { // if song is incremented to beyond index values ( less than 0)
                // currentBuzzObject.stop();
                // SongPlayer.currentSong.playing = null;
                stopSong(SongPlayer.currentSong);
            } else { // index must be greater than 0, pass new object as argument
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        /*******************
        * @method SongPlayer.next
        * @desc change song index to next index in current album. stop if index is null/undef
        */
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong); // pass song object to getSongIndex
            currentSongIndex++;
            
            if (currentSongIndex > currentAlbum.songs.length-1 && albumRepeat === null) { // if song is incremented to beyond index values ( greater than 0)
                // currentBuzzObject.stop();
                // SongPlayer.currentSong.playing = null;
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        }
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();