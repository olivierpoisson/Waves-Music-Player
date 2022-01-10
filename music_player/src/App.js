import React, { useState , useRef} from "react";
//!Adding components
import Player from "./components/Player";
import Song from "./components/Song";
import Music from "./data"
import Library from "./components/Library";
import Nav from "./components/Nav";
//! import styles
import './styles/app.scss'

let animationPercentage = 0;

function App() {
    //! Methods
    const timeUpdateHandler = (e) => {
        const current = e.target.currentTime;
        const duration2 = e.target.duration;
        animationPercentage = (songInfo.currentTime / songInfo.duration) * 100;
        setSongInfo({...songInfo, currentTime: current, duration: duration2});
    }
    const songEndedHandler = async () => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
        activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
        if(isPlaying) 
            audioRef.current.play();
        
    }
    const activeLibraryHandler = (nextPrev) => {
        const newSongs = songs.map((songItem) => {
            return {
                ...songItem,
                active: (songItem === nextPrev) ? true : false
            }
        });
        setSongs(newSongs);
        if (isPlaying) {
            const playPromise = audioRef.current.play()
            if (playPromise !== undefined) {
                playPromise.then((audio) => {
                    audioRef.current.play()
                })
            }
        }
    }
    const audioRef = useRef(null);
    //! STATE
    const [songs, setSongs] = useState(Music());
    // on utilise la première song de l'array songs par defaut
    const [currentSong, setCurrentSong] = useState(songs[0]);
    const [isPlaying, SetIsPlaying] = useState(false);
    const [songInfo, setSongInfo] = useState( 
        { // Object
            currentTime: 0,
            duration: 0
        }
    );
    const [libraryIsOpen, setLibraryIsOpen] = useState(false);
    return (
        <div className={`App ${libraryIsOpen ? "library-active" : ""}`}>
            <Nav libraryIsOpen={libraryIsOpen} setLibraryIsOpen = {setLibraryIsOpen}/>
            <Song currentSong={currentSong}/>
            <Player activeLibraryHandler={activeLibraryHandler} animationPercentage={animationPercentage} setSongs={setSongs} setCurrentSong={setCurrentSong} songs={songs} setSongInfo={setSongInfo} songInfo={songInfo} audioRef={audioRef} currentSong={currentSong} SetIsPlaying={SetIsPlaying} isPlaying={isPlaying}/>
            <Library libraryIsOpen={libraryIsOpen} setSongs={setSongs} isPlaying={isPlaying} audioRef={audioRef} setCurrentSong={setCurrentSong} songs={songs}/>
            <audio 
                onLoadedMetadata={timeUpdateHandler} 
                onTimeUpdate={timeUpdateHandler} 
                ref={audioRef} 
                src={currentSong.audio}
                onEnded={songEndedHandler}
                >
            </audio>
        </div>
    );
}

export default App