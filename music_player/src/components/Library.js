import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({libraryIsOpen, songs, setCurrentSong, audioRef, isPlaying, setSongs}) => {
    return (
        <div className={`library ${libraryIsOpen ? "active-library" : ""}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map(song => 
                    <LibrarySong 
                        songs={songs} 
                        setCurrentSong={setCurrentSong} 
                        song = {song}
                        audioRef = {audioRef}
                        isPlaying = {isPlaying}
                        key={song.id}
                        // SetIsPlaying = {SetIsPlaying}
                        setSongs = {setSongs}
                />)}
            </div>
        </div>
    )
}

export default Library