/**
 * WEB222 – Assignment 04
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       <MORDI EWERE VICTOR>
 *      Student ID: <132095255>
 *      Date:       <7th July 2024>
 */

document.addEventListener("DOMContentLoaded", function() {
    const { artists, songs } = window;
    const menu = document.getElementById("menu");
    const songCardsContainer = document.getElementById("song-cards");

    function loadArtists() {
        artists.forEach(artist => {
            const button = document.createElement("button");
            button.textContent = artist.name;
            button.addEventListener("click", () => {
                showArtistSongs(artist);
            });
            menu.appendChild(button);
        });

        // Add the "Request New Artist" button
        const requestButton = document.createElement("button");
        requestButton.textContent = "Request New Artist";
        requestButton.addEventListener("click", () => {
            window.location.href = "request-artist.html";
        });
        menu.appendChild(requestButton);

        // Load songs for the first artist by default
        if (artists.length > 0) {
            showArtistSongs(artists[0]);
        }
    }

    function showArtistSongs(artist) {
        songCardsContainer.innerHTML = ""; // Clear existing cards

        const filteredSongs = songs.filter(song => song.artistId === artist.artistId && !song.explicit);

        filteredSongs.forEach(song => {
            const card = createSongCard(song);
            songCardsContainer.appendChild(card);
        });
    }

    function createSongCard(song) {
        const card = document.createElement('div');
        card.classList.add('card');

        const songImg = document.createElement('img');
        songImg.src = song.imageUrl;
        songImg.alt = song.title;
        card.appendChild(songImg);

        const cardContent = document.createElement('div');
        cardContent.classList.add('card-content');

        const songTitle = document.createElement('h2');
        songTitle.textContent = song.title;
        cardContent.appendChild(songTitle);

        const songYear = document.createElement('time');
        songYear.textContent = `Year: ${song.year}`;
        cardContent.appendChild(songYear);

        const songDuration = document.createElement('span');
        songDuration.textContent = `Duration: ${formatDuration(song.duration)}`;
        cardContent.appendChild(songDuration);

        card.appendChild(cardContent);

        // Open song link in new tab on image click
        songImg.addEventListener('click', () => {
            window.open(song.url, '_blank');
        });

        return card;
    }

    function formatDuration(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    }

    loadArtists();
});

  



