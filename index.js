window.addEventListener('DOMContentLoaded', () => {
    const elements = {
        playButton: document.querySelector("#play_button"),
        pauseButton: document.querySelector("#pause_button"),
        leftSkipButton: document.querySelector("#left_skip_button"),
        rightSkipButton: document.querySelector("#right_skip_button"),
        loopButton: document.querySelector("#loop_button"),
        shuffleButton: document.querySelector("#shuffle_button"),
        progressSlider: document.querySelector("#progress_slider"),
        audio: document.querySelector("audio"),
        albumArt: document.querySelector("#album_art"),
        sidebar: document.getElementById("sidebar"),
        toggleSidebarBtn: document.getElementById("toggle_sidebar"),
        playlistContainer: document.getElementById("playlist_items"),
        songName: document.getElementById('song_name'),
        artistName: document.getElementById('artist_name'),
        backgroundOverlay: document.getElementById("background_overlay")
    };

    let playerState = {
        isLooping: false,
        isShuffling: false,
        currentTrack: 0,
        isPlaying: false
    };

    const MOBILE_BREAKPOINT = 488;

    function isMobile() {
        return window.innerWidth <= MOBILE_BREAKPOINT;
    }

    const rawSongs = [
        "Yung Kai — Wildflower",
        "Bôa — Duvet",
        "The Marias — Sienna",
        "Ed Sheeran — Perfect",
        "Prateek Kuhad — Co2",
        "Taylor Swift — Love Story",
        "The Beatles — Here Comes the Sun",
        "The Rare Occasions — Notion",
        "Two Door Club — What You Know",
        "The Weeknd — Starboy",
        "Jptrockerz — Basanta",
    ];

    const playlist = rawSongs.map(name => {
        const [artist, track] = name.split(" — ");
        return {
            file: `playlist/${name}.mp3`,
            cover: `cover/${track}.jpeg`,
            artist,
            track
        };
    });

    function initializePlayer() {
        elements.albumArt.style.animationPlayState = 'paused';
        setPlayPauseButtonState(false);
        
        // Load first song
        elements.audio.src = playlist[playerState.currentTrack].file;
        updateSongInfo(playerState.currentTrack);
        populatePlaylist();
        updateActiveListItem();
    }

    function setPlayPauseButtonState(isPlaying) {
        playerState.isPlaying = isPlaying;
        elements.playButton.style.display = isPlaying ? "none" : "inline-block";
        elements.pauseButton.style.display = isPlaying ? "inline-block" : "none";
    }

    function updateSongInfo(index) {
        const track = playlist[index];
        elements.songName.innerHTML = track.track;
        elements.artistName.innerHTML = track.artist;
        elements.albumArt.src = track.cover;
        updateBackground(index);
    }

    function updateBackground(index) {
        const encodedURL = encodeURI(playlist[index].cover);
        elements.backgroundOverlay.style.backgroundImage = `url(${encodedURL})`;
    }
    
});

