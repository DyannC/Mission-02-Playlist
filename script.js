// ===============================
// 1. GLOBAL VARIABLES & DATA
// ===============================

// Track total play and like counts
let playCount = 0;  // how many times any song has been played (total)
let totalLikes = 0; // how many songs are liked (❤️)

// The playlist is an array of song objects (each has details about one song)
// the songs live in an ARRAY. each song is an OBJECT with facts about it.
let playlist = [
  {
    title: "Apocalypse",
    artist: "Cigarettes After Sex",
    lyric: "You leapt from crumbling bridges...",
    image: "images/apocalypse.jpg",
    liked: false, // not liked yet
    plays: 0      // not played yet  
  },
  {
    title: "Glimpse of Us",
    artist: "Joji",
    lyric: "She'd take the world off my shoulders...",
    image: "images/glimpse-of-us-.jpg",
    liked: false,
    plays: 0
  },
  {
    title: "Beanie",
    artist: "Chezile",
    lyric: "Hear it in your tone...",
    image: "images/beanie.jpg",
    liked: false,
    plays: 0
  },
  {
    title: "Blue",
    artist: "Yung Kai",
    lyric: "Your morning eyes, I could...",
    image: "images/Blue.jpg",
    liked: false,
    plays: 0
  },
  {
    title: "Another Love",
    artist: "Tom Odell",
    lyric: "I wanna take you somewhere...",
    image: "images/another love.jpg",
    liked: false,
    plays: 0
  }
];

// ===============================
// 2. WAIT FOR THE PAGE TO LOAD FIRST
// ===============================

// This makes sure all the HTML is ready before running any code
// everything inside here runs AFTER the page’s HTML exists
window.addEventListener('DOMContentLoaded', function () {

  // --- 2a. Loader Animation ---
  setTimeout(function () {
    // Fade out the loader after 2.2 seconds
    document.getElementById('musicLoader').style.opacity = '0';
    setTimeout(function () {
      document.getElementById('musicLoader').style.display = 'none';
    }, 800);   // after the fade (0.8s), fully hide it (display: none)
  }, 2200);    // wait 2.2 seconds → fade the loader to transparent (opacity 0)

  // --- 2b. Set up event listener for "Add Song" button ---
  const addSongBtn = document.getElementById('addSongBtn');
  if (addSongBtn) {
    addSongBtn.addEventListener('click', function () {
      // Grab input values
      // we grab the text the user typed (.value).
      //.value gets the text inside it
      //This finds the <input> with id="title",
      // trim() removesextra spaces from the start and end
      const title = document.getElementById('newTitle').value.trim(); 
      const lyric = document.getElementById('newLyric').value.trim();
      const image = document.getElementById('newImage').value.trim();

      // Check if required fields are filled
      // We validate: need a title and artist.
      if (title && artist) {
        // Add new song to the playlist
        playlist.push({ //playlist.push(...) adds a new object to the end of the array.
          title: title,
          artist: artist,
          lyric: lyric || "",
          image: image || "images/apocalypse.jpg", // Default image if empty
          liked: false,
          plays: 0
        });
        // Clear form fields after adding
        document.getElementById('newTitle').value = "";
        document.getElementById('newArtist').value = "";
        document.getElementById('newLyric').value = "";
        document.getElementById('newImage').value = "";
        //renderPlaylist() rebuilds the visible list so the new song shows up.
        renderPlaylist(); // Redraw playlist to show new song
      } else {
        alert("Please enter a song title and artist.");
      }
    });
  }

  // --- 2c. Set up event listener for the theme toggle ---
  // when the checkbox changes, we add/remove a CSS class on <body>.
  const themeToggle = document.getElementById('toggle');
  if (themeToggle) {
    themeToggle.addEventListener('change', function () { //CSS does the color swap.
      document.body.classList.toggle('light-mode', this.checked); //this.checked is true when the toggle is on.
    });
  }

  // --- 2d. Render playlist on initial load ---
  renderPlaylist();
});

// ===============================
// 3. RENDER THE PLAYLIST FUNCTION
// ===============================

// Draws all songs on the page using the playlist array
// build the song cards on the page for the first time.
function renderPlaylist() {
  const playlistContainer = document.querySelector('.playlist');
  playlistContainer.innerHTML = ""; // Remove any old cards

  // Loop through every song in the array
  for (let i = 0; i < playlist.length; i++) {
    const song = playlist[i];

    // Create the card for this song
    // make the outer card
    // we create HTML elements with document.createElement.
    const card = document.createElement('div');
    card.className = 'song-card';

    // Create album image
    const img = document.createElement('img');
    img.src = song.image;
    img.alt = song.title + " Album";

    // Info section for song title, artist, lyric, and buttons
    const info = document.createElement('div');
    info.className = 'song-info';
    //we fill them with text (.textContent) or attributes (.src, .alt).
    const h2 = document.createElement('h2');
    h2.textContent = song.title;

    const pArtist = document.createElement('p');
    pArtist.textContent = "by " + song.artist;

    const pLyric = document.createElement('p');
    pLyric.className = 'lyric';
    pLyric.textContent = "“" + song.lyric + "”";

    // ---- Play Button ----
    // we wire buttons with small functions (onclick = ...).
    const playBtn = document.createElement('button');
    playBtn.className = 'play-btn';
    playBtn.textContent = "▶️ Play";
    playBtn.onclick = function () {
      playSong(i);
    };

    // ---- Like Button ----
    const likeBtn = document.createElement('button');
    likeBtn.className = 'like-btn';
    likeBtn.style.marginLeft = '2px';
    likeBtn.textContent = song.liked ? "❤️" : "♡";
    likeBtn.onclick = function () {
      toggleLike(i);
    };

    // ---- Remove (Delete) Button ----
    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.textContent = "❌";
    removeBtn.title = "Delete song";
    removeBtn.style.marginLeft = "2px";
    removeBtn.onclick = function () {
      removeSong(i);
    };

    // ---- Play Counter ----
    const playCounter = document.createElement('span');
    playCounter.className = 'play-counter';
    playCounter.style.marginLeft = '10px';
    playCounter.style.fontSize = '0.92em';
    playCounter.textContent = song.plays > 0 ? `(Played ${song.plays}x)` : "";

    // Add all the info and buttons to the info section
    // we append them into the page so they show up.
    info.appendChild(h2);
    info.appendChild(pArtist);
    info.appendChild(pLyric);
    info.appendChild(playBtn);
    info.appendChild(likeBtn);
    info.appendChild(removeBtn);
    info.appendChild(playCounter);

    // Add image and info to the card
    // appendChild() = attaches it inside the song card
    card.appendChild(img);
    card.appendChild(info);

    // Put this card into the playlist container
    playlistContainer.appendChild(card);
  }

  // Update the stats (plays, likes, song count)
  updateStats();
}

// ===============================
// 4. PLAY BUTTON FUNCTION
// ===============================

// Called when the play button is clicked for a song
function playSong(index) {
  playlist[index].plays += 1; // Add 1 play to this song
  playCount++;                // Add 1 to the total play count
  // Update the "Now Playing" display
  const nowPlaying = document.querySelector('.now-playing p');
  nowPlaying.innerHTML = `Now Playing: <strong>“${playlist[index].title}” - ${playlist[index].artist}</strong>`;
  renderPlaylist(); // Redraw so play count updates
}

// ===============================
// 5. LIKE BUTTON FUNCTION
// ===============================
//! means “not”. so true becomes false, and false becomes true.
function toggleLike(index) {
  // Switch like between true (❤️) and false (♡)
  playlist[index].liked = !playlist[index].liked;
  renderPlaylist(); // Redraw so heart updates
}

// ===============================
// 6. REMOVE SONG FUNCTION
// ===============================

function removeSong(index) {
  // Ask before deleting
  // confirm(...) shows an “OK/Cancel” popup.
  if (confirm("Remove this song from your playlist?")) {
    playlist.splice(index, 1); //array.splice(where, howMany) removes items from an array.
    renderPlaylist(); // Redraw with song removed
  }
}

// ===============================
// 7. UPDATE STATS FUNCTION
// ===============================

function updateStats() {
  // Count the number of liked songs
  totalLikes = 0;
  for (let i = 0; i < playlist.length; i++) { //looping over the array with for.
    if (playlist[i].liked === true) { // comparison (=== true).
      totalLikes += 1;
    }
  }
  // Find or create the stats display under the playlist
  // creating a UI element once and reusing it.
  let stats = document.getElementById('playlist-stats');
  if (!stats) {
    stats = document.createElement('div');
    stats.id = 'playlist-stats';
    stats.style.textAlign = 'center';
    stats.style.margin = '20px 0';
    document.querySelector('.playlist').after(stats); // put it after the list
  }
  stats.innerHTML = `<b>Total Plays:</b> ${playCount} &nbsp; | &nbsp; <b>Total Liked Songs:</b> ${totalLikes} &nbsp; | &nbsp; <b>Total Songs:</b> ${playlist.length}`;
}
