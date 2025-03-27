let playlist = [];
let loadingIndicator = document.getElementById('loading');
let playlistContainer = document.getElementById('playlist');

function renderPlaylist() {
    playlistContainer.innerHTML = '';
    for (let i = 0; i < playlist.length; i++) {
        let song = playlist[i];
        let listItem = createSongListItem(song, removeSong, retrySaveSong);
        playlistContainer.appendChild(listItem);
    }
}

async function fetchPlaylist() {
    loadingIndicator.style.display = 'block';
    try {
        const response = await fetch('/songs');
        if (response.status === 200) {
            const result = await response.json();
            playlist=result;
            loadingIndicator.style.display = 'none';
            renderPlaylist();
        }
    } catch (error) {
        console.error('Error fetching playlist:', error);
    }
}

function addSong(song) {
    song.saving = true;
    playlist.push(song);
    renderPlaylist();
    saveSong(song);
}

async function saveSong(song) {
    try {
        const response = await fetch('/songs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: song.name, band: song.band }),
        });
        if (response.status === 200) {
            const result = await response.json();
            playlist = result;
            renderPlaylist();
        }
    } catch (error) {
        console.error('Error saving song:', error);
    }
}

function retrySaveSong(song) {
    saveSong(song);
}

async function removeSong(song) {
    song.saving = true;
    renderPlaylist();
    try {
        const response = await fetch('/songs/'+ song.idx, {
            method: 'DELETE',
            // headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify({ name: song.name, band: song.band }),
        });
        if (response.status === 200) {
            const result = await response.json();
            playlist = result;
            renderPlaylist();
        }
    } catch (error) {
        console.error('Error removing song:', error);
    }
}


function handleForm() {
    let songInput = document.getElementById('songTextInput');
    let bandInput = document.getElementById('bandTextInput');
    
    let song = songInput.value.trim();
    let band = bandInput.value.trim();
    if (song && band) {
        addSong({ name: song, band: band });
        songInput.value = '';
        bandInput.value = '';
    }
}

fetchPlaylist();