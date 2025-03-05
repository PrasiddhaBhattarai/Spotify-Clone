const spotifyLogo = document.querySelector(".spotify");
const searchSVG = document.querySelector(".search-svg");
const searchInput = document.querySelector(".search-input");
const searchBar = document.querySelector(".search-bar");
const browseButton = document.querySelector(".browse-btn");
const homeButton = document.querySelector(".home-btn");
const homeButtonUseSVG = document.querySelector(".home-btn-use-svg");
const browseButtonUseSVG = document.querySelector(".browse-btn-use-svg");
const libraryButton = document.querySelector(".library-btn");
const playButton = document.querySelector(".play-btn");
const songsList = document.querySelector(".songs-list").getElementsByTagName("ul")[0];

const left = document.querySelector(".left");
const right = document.querySelector(".right");
const right1 = document.querySelector(".right1");
const right2 = document.querySelector(".right2");
const right3 = document.querySelector(".right3");
const popularArtists = document.querySelector(".popular-artists").children[1];
const showAllArtists = document.querySelector(".popular-artists").querySelector(".show-all");
const popularAlbums = document.querySelector(".popular-albums").children[1];
const showAllAlbums = document.querySelector(".popular-albums").querySelector(".show-all");
const labelLibrary = document.querySelector(".label-library");

const play = document.querySelector("#play");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");
const playingSong = document.querySelector(".song-info");
const currentTime = document.querySelector(".current-time");
const totalDuration = document.querySelector(".total-duration");
const seekBarInner = document.querySelector(".seek-bar-inner");
const seekBarProgress = document.querySelector(".seek-bar-progress");
const seekPointer = document.querySelector(".seek-pointer");
const seekLabel = document.querySelector(".label-seek-bar-inner");
const volumeBarInner = document.querySelector(".volume-bar-inner");
const volumeBarProgress = document.querySelector(".volume-bar-progress");


searchBar.addEventListener("mouseover", () => {
    searchSVG.setAttribute("style", "fill: white");
});

searchBar.addEventListener("mouseout", () => {
    // console.log(searchSVG.getAttribute("style"));
    searchSVG.setAttribute("style", "fill: rgb(179,179,179)");
});

searchBar.addEventListener("click", () => {
    searchInput.focus();
});

searchInput.addEventListener("input", (e) => {
    browseButton.classList.toggle("hide", e.currentTarget.value != "");
});

spotifyLogo.addEventListener("mousein", () => {
    homeButton.click();
})

homeButton.addEventListener("click", () => {
    if (homeButtonUseSVG.getAttribute("href") === "#home-hollow") {
        changeSVG(homeButtonUseSVG, "#home-filled");
        changeSVG(browseButtonUseSVG, "#browse-hollow");
        right1.classList.remove("hide");
        right2.classList.add("hide");
    }
});

browseButton.addEventListener("click", () => {
    if (browseButtonUseSVG.getAttribute("href") === "#browse-hollow") {
        changeSVG(browseButtonUseSVG, "#browse-filled");
        changeSVG(homeButtonUseSVG, "#home-hollow");
        right1.classList.add("hide");
        right2.classList.remove("hide");
    }
});

function changeSVG(use, to) {
    use.setAttribute("href", to);
};

libraryButton.addEventListener("click", () => {
    if (left.style.width == "5vw") {
        labelLibrary.textContent = `Collapse Your Library`;
        WidthSet([".recent-card-img"], "width: 20%");
        left.style.width = `${23}vw`;
        right.style.width = `${76}vw`;
        hideToggleAll([".library-txt", ".create-playlist-btn", ".recent-card-info"]);
    }
    else {
        labelLibrary.textContent = `Expand Your Library`;
        WidthSet([".recent-card-img"], "width: 100%");
        left.style.width = `${5}vw`;
        right.style.width = `${94}vw`;
        hideToggleAll([".library-txt", ".create-playlist-btn", ".recent-card-info"]);
    }
})
// .songs-list
function hideToggleAll(arr) {
        arr.forEach((_class) => {
            if (_class == ".recent-card-info") {
                const element = [...document.querySelector(".songs-list").querySelectorAll(_class)];
                for (const e of element) {
                    e.classList.toggle("hide");
                }
            }
            else {
                const element = [...document.querySelectorAll(_class)];
                for (const e of element) {
                    e.classList.toggle("hide");
                }
            }
        });
}
function WidthSet(arr, width) {
    arr.forEach((_class) => {
        if (_class == ".recent-card-info") {
            const element = [...document.querySelector(".songs-list").querySelectorAll(_class)];
            for (const e of element) {
                e.setAttribute("style", `${width}`);
            }
        }
        else {
            const element = [...document.querySelectorAll(_class)];
            for (const e of element) {
                e.setAttribute("style", `${width}`);
            }
        }
    });
}

showAllAlbums.addEventListener("click", () => {
    document.querySelector(".popular-artists").classList.toggle("hide");
    document.querySelector(".popular-albums").querySelector(".card-container").classList.toggle("grid-auto-row-zero");
    if (showAllAlbums.textContent == "Hide") {
        showAllAlbums.textContent = "Show all";
    }
    else{
        showAllAlbums.textContent = "Hide"
        showAllAlbums.style.paddingRight = "1rem"
    }
});

showAllArtists.addEventListener("click", () => {
    document.querySelector(".popular-albums").classList.toggle("hide");
    document.querySelector(".popular-artists").querySelector(".card-container").classList.toggle("grid-auto-row-zero");
    if (showAllArtists.textContent == "Hide") {
        showAllArtists.textContent = "Show all";
    }
    else{
        showAllArtists.textContent = "Hide"
        showAllArtists.style.paddingRight = "1rem"
    }
});

// object to store songs for individual album
// eg: allAlbums[Vaaqif] : [Aaftab, Aakhri, ...]
let allAlbums = {};
// to store all available albums of a artist
// eg: allArtists[Ed Sheeran] : ['Blow', "I Don't Care"]
let allArtists = {};
// let allSongs = [];


function createAlbum(info, img) {
    let card = `<div class="card">
              <img src="${img}" alt="Album_cover_image">
               <p class="p1">${info.title}</p>
               <p class="p2">${info.description}</p>
               <button class="play-btn">
               <svg height="24" viewBox="0 0 24 24"><path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path></svg>
               </button>
            </div>`;
    popularAlbums.insertAdjacentHTML("beforeend", card);
    info.description.forEach(e => {
        let albumsArray = [];
        // if previously includes albums
        if (allArtists[e.trim()]) {
            albumsArray = allArtists[e.trim()];
        }
        albumsArray.push(info.title);
        allArtists[e.trim()] = albumsArray;
    })
}

function createArtist(artistName, img){
    let card = `<div class="card">
              <img src="${img}" alt="Artist_Image">
               <p class="p1">${artistName}</p>
               <p class="p2">Artist</p>
               <button class="play-btn">
               <svg height="24" viewBox="0 0 24 24"><path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path></svg>
               </button>
            </div>`;
    popularArtists.insertAdjacentHTML("beforeend", card);
}


class Song {
    constructor(songID, songHref, songImage, songName, artistName) {
        this.songID = songID;
        this.songHref = songHref;
        this.songImage = songImage;
        this.songName = songName;
        this.artistName = artistName;
    }
}

let audio = new Audio();
let audioSrc = null;
let currPlaylist = null;

async function getSongs() {
    try {
        let a = await fetch("/albums/");
        let response = await a.text();
        let div = document.createElement("div");
        div.innerHTML = response;
        let anchors = div.getElementsByTagName("a");

        for (const e of Array.from(anchors)) {
            if (e.href.includes("/albums/")) {
                let album = e.href.split("/").slice(-1)[0];
                let songs = [];

                let json = await fetch(`/albums/${album}/info.json`);
                let response = await json.json();
                let img = await fetch(`/albums/${album}/album%20cover.jpeg`);

                let fetchSongs = await fetch(`${e.href}/`);
                let res = await fetchSongs.text();
                let div2 = document.createElement("div");
                div2.innerHTML = res;
                let anchors2 = div2.getElementsByTagName("a");
                let id = 0;

                for (const e of Array.from(anchors2)) {
                    if (e.href.endsWith(".mp3")) {
                        let songName = e.href.split("/").pop().split(".").shift().replace(/%20/g, " ");
                        let song = new Song(++id, e.href, img.url, songName, response.description);
                        songs.push(song);
                    }
                }

                // console.log(songs);

                allAlbums[response.title] = songs;
                createAlbum(response, img.url, songs);
            }
        }
    } catch (error) {
        console.error('Error fetching songs:', error);
    }
}


async function main() {
    await getSongs();

    //Popular albums event listener
    let albumCards = [...popularAlbums.getElementsByClassName("card")];
    albumCards.forEach(e => {
        e.addEventListener("click", () => {
            let albumName = e.querySelector(".p1").textContent;
            let currSongs = allAlbums[albumName];
            if (left.style.width == "5vw"){
                libraryButton.click();
            }
            songsList.innerHTML="";
            loadSongs(currSongs);
            playSong(currSongs[0], currSongs);
        })
    });

    //Artist cards creation
    for (const artist in allArtists) {
        let artistName = artist.replaceAll(/[/./-]/g, " ").toLowerCase();
        let href = `/artist_image/${artistName}.jpeg`;
        createArtist(artist,href);
    }

    //Popular artist event listener
    let artistCards = [...popularArtists.getElementsByClassName("card")];
    artistCards.forEach(e => {
        e.addEventListener("click", () => {
            let artistName = e.querySelector(".p1").textContent;
            songsList.innerHTML = "";
            if (left.style.width == "5vw"){
                libraryButton.click();
            }
            let songs = [];
            for (let i= 0; i< allArtists[artistName].length; i++) {
                let song = allAlbums[allArtists[artistName][i]][0];
                let songNew = new Song((i+1), song.songHref, song.songImage, song.songName, song.artistName);
                songs.push(songNew);
                // loadSongs(allAlbums[allArtists[artistName][i]]);
            }
            loadSongs(songs);
            playSong(songs[0], songs);
        })
    });

    //for loader
    const loaderWrapper = document.querySelector('.loader-wrapper');
    setTimeout(() => {
        loaderWrapper.style.opacity = '0';
        loaderWrapper.addEventListener('transitionend', () => {
            loaderWrapper.classList.add('loaded');// added class to stop animation
            loaderWrapper.style.display = 'none';
        });
    }, 1);
};

main();

function loadSongs(album) {
    for (const key in album) {
        const song = album[key];
        let li = document.createElement("li");
        li.dataset.song = key;
        // let songName = song.split("/").pop().split(".").shift().replace(/%20/g, " ");
        li.innerHTML = `<div class="recent-card flex">
                         <div class="recent-card-img relative">
                            <img class="playlist" src=${song.songImage}>
                            <img class="hide recent-card-img-play" src="SVG/play2.svg" alt="play">
                         </div>
                         <div class="recent-card-info flex column justify-center">
                            <p class="p1">${song.songName}</p>
                            <p class="p2 color-gray">${song.artistName}</p>
                         </div>
                        </div>`
        songsList.appendChild(li);
        li.addEventListener("click", () => {
            playSong(album[li.dataset.song], album);
        });
    }
    // Array.from(songsList.children).forEach((li) => {
    //     li.addEventListener("click", () => {
    //         playSong(album[li.dataset.song], album);
    //     });
    // });
}


const playSong = (song, album) => {
    if (audioSrc != null) {
        audio.pause();
        audioSrc = song.songHref;
        play.setAttribute("src", "SVG/play.svg");
    }

    currPlaylist = album;

    //when a single is playing,
    //the audio needs to be restarted on previous and next button click
    if (currPlaylist.length == 1 && audio.src == audioSrc) {
        //audio.pause();
        audio.currentTime = 0;
        audio.play();
        play.setAttribute("src", "SVG/pause.svg");
        return;
    }

    //for Playing songs-info
    playingSong.innerHTML = `
                    <img class="playlist" src=${song.songImage}>
                    <div class="recent-card-info flex column justify-center">
                    <p class="p1">${song.songName}</p>
                    <p class="p2 color-gray">${song.artistName}</p>
                    </div>`
    //so that song name is never hidden
    playingSong.children[1].classList.remove("hide");

    //first time playing
    if (audioSrc == null) {
        audio.volume = 0.8;
        document.querySelector(".volumeValue").textContent = audio.volume * 100;
        volumeBarProgress.value = audio.volume * 100;
        volumeBarProgress.classList.remove("hide");
        volumeProgressWidth();
    }

    audioSrc = song.songHref;
    audio.src = audioSrc;

    audio.play();
    // setTimeout(() => {
    //     totalDuration.classList.remove("hide");
    //     totalDuration.textContent = formatSeconds(audio.duration);
    // }, 100);
    play.click();

    seekPointer.classList.remove("hide");
};

audio.addEventListener("timeupdate", () => {
    currentTime.classList.remove("hide");
    totalDuration.classList.remove("hide");
    currentTime.textContent = formatSeconds(audio.currentTime);
    totalDuration.textContent = formatSeconds(audio.duration);
    if (audio.currentTime === audio.duration) {
        next.click();
    }
    seekBarProgress.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
});

function formatSeconds(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60);
    // .padStart(2, "0")
    const formattedMins = mins < 10 ? '0' + mins : mins;
    const formattedSecs = secs < 10 ? '0' + secs : secs;

    return `${formattedMins}:${formattedSecs}`;
}


document.addEventListener('keydown', function (event) {
    if (event.key === 'MediaPlayPause') {
        play.click();
    }
});
play.addEventListener("click", () => {
    if (audioSrc == null) {
        return;
    }
    if (play.getAttribute("src") == "SVG/play.svg") {
        audio.play();
        play.setAttribute("src", "SVG/pause.svg");
    } else {
        audio.pause();
        play.setAttribute("src", "SVG/play.svg");
    }
});

previous.addEventListener("click", () => {
    if (audioSrc == null) {
        return;
    }
    // if playlist or single song is playing
    if (currPlaylist.length == 1) {
        playSong(currPlaylist[0], currPlaylist);
    }
    else {
        let currSong = currPlaylist.find(song => song.songHref == audioSrc);
        let prevSongID = ((((currSong.songID - 1) - 1) + currPlaylist.length) % currPlaylist.length) + 1;
        let prevSong = currPlaylist.find(song => song.songID == prevSongID);
        playSong(prevSong, currPlaylist);
    }
});
next.addEventListener("click", () => {
    if (audioSrc == null) {
        return;
    }
    // if playlist or single song is playing
    if (currPlaylist.length == 1) {
        playSong(currPlaylist[0], currPlaylist);
    }
    else {
        let currSong = currPlaylist.find(song => song.songHref == audioSrc);
        //as id starts from 1 but, array starts from 0
        let nextSongID = (((currSong.songID - 1) + 1) % currPlaylist.length) + 1;
        let nextSong = currPlaylist.find(song => song.songID == nextSongID)
        playSong(nextSong, currPlaylist);
    }
});

seekBarInner.addEventListener("click", (e) => {
    if (audioSrc == null) {
        return;
    }
    let barWidth = e.currentTarget.getBoundingClientRect().width;
    seekBarProgress.style.width = `${(e.offsetX / barWidth) * 100}%`;
    audio.currentTime = (((e.offsetX / barWidth) * 100) * audio.duration) / 100;
});

seekBarInner.addEventListener("mousemove", (e) => {
    if (audioSrc == null) {
        return;
    }
    let barWidth = e.currentTarget.getBoundingClientRect().width;
    let time = (e.offsetX / barWidth) * audio.duration;
    seekLabel.textContent = formatSeconds(time);
    seekLabel.style.left = `${((e.offsetX / barWidth) * 100) - 2}%`;
});

volumeBarProgress.addEventListener("click", () => {
    if (audioSrc == null) {
        return;
    }
    document.querySelector(".volumeValue").textContent = volumeBarProgress.value;
    audio.volume = volumeBarProgress.value / 100;
    volumeProgressWidth();
});

volumeBarInner.addEventListener("mousemove", () => {
    if (audioSrc == null) {
        return;
    }
    document.querySelector(".volumeValue").textContent = volumeBarProgress.value;
    audio.volume = volumeBarProgress.value / 100;
    volumeProgressWidth();
});

function volumeProgressWidth() {
    let width = (volumeBarProgress.value / 100) * volumeBarInner.offsetWidth;
    document.querySelector(".volume-bar-progress-value").style.width = `${width}px`
}


// to adjust height of .container
let height = ((document.querySelector(".topBar").offsetHeight + document.querySelector(".bottom").offsetHeight) / document.body.offsetHeight) * 100;
document.querySelector(".container").style.height = (99 - height) + "%";