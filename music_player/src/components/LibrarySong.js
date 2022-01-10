import React from "react";

const LibrarySong = ({songs, song, setCurrentSong, audioRef, isPlaying, setSongs}) => {
    const songSelectHandler = async () => {
        await setCurrentSong(song);
        // Add active State
        const newSongs = songs.map((songItem) => {
            return {
                ...songItem,
                active: (songItem === song) ? true : false
            }
        });
        setSongs(newSongs);
        if(isPlaying) {
            // const playPromise = audioRef.current.play();
            // if(playPromise !== undefined) {
            //     playPromise.then((audio) => {
            //         audioRef.current.play();
            //     })
            // }
            //* On a mis 'await' et 'async' dans player.js dans la méthode skipTrackHandler
            //* donc on a plus besoin de faire de promesse
            audioRef.current.play();
        }
    }
    return (
        <div onClick={songSelectHandler} className={`library-song ${song.active ? "selected" : ""}`}>
            <img alt={song.name} src={song.cover}></img>
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    );
}

export default LibrarySong;