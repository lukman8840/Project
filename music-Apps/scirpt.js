
let progress = document.getElementById("progress");
let song = document.getElementById("song");
let cntrl = document.getElementById("cntrl");
const artistDisplay = document.getElementById("artist");
const trackTittleDisplay = document.getElementById("trackTittle");


const playlist = [
    { artist: "Emeli", title: "Akon Love me or die", source: "https://res.cloudinary.com/dnfgsppzf/video/upload/v1701448961/emeli_mpguri.mp4" },
    {artist: "Thinking", title: "without me", source: "https://res.cloudinary.com/dnfgsppzf/video/upload/v1701449396/Halsey_-_Without_Me_Lyrics_a3jblj.mp4"},
    {artist: "All over Again", title: "Legend", source: "https://res.cloudinary.com/dnfgsppzf/video/upload/v1701449639/John_Legend_-_All_Of_Me__Azonto_Version___Prod__r7glfd.mp3"},
    {artist: "Namej", title: "Dama Dake Nafara haduwa", source: "https://res.cloudinary.com/dnfgsppzf/video/upload/v1701449801/Namenj_-_Dama__feat._Hamisu_Breaker___Official_Video_256k_klub0v.mp3" },
    {artist: "Namej", title: "Dabanne", source: "https://res.cloudinary.com/dnfgsppzf/video/upload/v1701449870/Namenj_-_Dabanne__Official_Music_Video_256k_lakqqr.mp3"},
    {artist: "Theri", title: "Sanam Teri Aksam", source: "https://res.cloudinary.com/dnfgsppzf/video/upload/v1701449955/Sanam_Teri_Kasam_Title_Song_Official_Video_Harshvardhan_Mawra_Himesh_Reshammiy_oomtmn.mp3"},
    {artist: "Unstoppable", title: "Sia", source: "https://res.cloudinary.com/dnfgsppzf/video/upload/v1701449955/Sanam_Teri_Kasam_Title_Song_Official_Video_Harshvardhan_Mawra_Himesh_Reshammiy_oomtmn.mp3"},
    {artist: "Theri", title: "Theri sangyara", source: "https://res.cloudinary.com/dnfgsppzf/video/upload/v1701449955/Sanam_Teri_Kasam_Title_Song_Official_Video_Harshvardhan_Mawra_Himesh_Reshammiy_oomtmn.mp3"},
    {artist: "Somebody", title: "Somebody to Hold", source: "https://res.cloudinary.com/dnfgsppzf/video/upload/v1701450190/Ahmerdy_-_Kallabi__OFFICIAL_AUDIO_128k_xb51xy.mp4"},
];


let currentTrackIndex = 0;

loadTrack();

function loadTrack() {
    const currentTrack = playlist[currentTrackIndex];
    if (currentTrack) {
        artistDisplay.textContent = currentTrack.artist;
        trackTittleDisplay.textContent = currentTrack.title;
        song.src = currentTrack.source;
        song.load();

        // Check if the player was playing the previous track and resume playing
        if (cntrl.classList.contains("fa-pause")) {
            song.play().catch(error => console.error(error));
        }
    }
}




song.addEventListener("loadedmetadata", function () {
    progress.max = song.duration;
    progress.value = song.currentTime;
});
    function nextTrack() {
        currentTrackIndex = (currentTrackIndex + 1)% playlist.length;
        loadTrack()
    }
song.addEventListener("ended", function () {
    // When the current track ends, automatically play the next track
    nextTrack();
});


// Use the timeupdate event to continuously update the progress bar during playback
song.addEventListener("timeupdate", function () {
    progress.value = song.currentTime;
});


function playPause() {
    // Check if the 'song' element is found
    if (song) {
        if (cntrl.classList.contains("fa-pause")) {
            song.pause();
            cntrl.classList.remove("fa-pause");
            cntrl.classList.add("fa-play");
        } else {
            song.play().catch(error => console.error(error));
            cntrl.classList.remove("fa-play");
            cntrl.classList.add("fa-pause");
        }
    } else {
        console.error("Cannot find the 'song' element.");
    }
}

function newTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack();
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack();
}


if(song.play()){
    setInterval(()=> {
        progress.value = song.currentTime;
    },500);

}
    progress.onchange = function(){
        song.play();
        song.currentTime = progress.value;
        cntrl.classList.add("fa-pause");
        cntrl.classList.remove("fa-play");
    }
