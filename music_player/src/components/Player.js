import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faAngleLeft, faAngleRight, faPause  } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react/cjs/react.development";

const Player = ({activeLibraryHandler, animationPercentage, setSongs, setCurrentSong,songs,currentSong, isPlaying, SetIsPlaying,audioRef, setSongInfo, songInfo}) => {
    //* Use Effect (not necessary anymore)
    // useEffect(() => {
    //     const newSongs = songs.map((songItem) => {
    //         return {
    //             ...songItem,
    //             active: (songItem === currentSong) ? true : false
    //         }
    //     });
    //     setSongs(newSongs);
    //     if (isPlaying) {
    //         const playPromise = audioRef.current.play()
    //         if (playPromise !== undefined) {
    //             playPromise.then((audio) => {
    //                 audioRef.current.play()
    //             })
    //         }
    //     }
    // },[currentSong]) //* The function triggers when the thing in [] updates
    // Event Handlers
    
    const playSongHandler = () => {
        if(isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        SetIsPlaying(!isPlaying);
    }

    const getTime = (time) => {
        return (
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        );
    }
    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo, currentTime: e.target.value});
    }

    const skipTrackHandler = async (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        if(direction === "forward") {
            await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
            await activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
        } else {
            if(currentIndex === 0) {
                await setCurrentSong(songs[(songs.length - 1)]);
                await activeLibraryHandler(songs[(songs.length - 1)]);
            } else {
                await setCurrentSong(songs[currentIndex - 1]);
                await activeLibraryHandler(songs[currentIndex - 1]);

            }
        }
    }
    return (
        <div className="Player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}} className="track">
                    <input 
                        min={0} 
                        max={songInfo.duration || 0} 
                        value={songInfo.currentTime} 
                        onChange={dragHandler}
                        type="range" 
                    />
                    <div className="animate-track" style={{transform: `translateX(${animationPercentage}%)`}}>
                    </div>
                </div>
                <p>{getTime(songInfo.duration)}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon onClick={() => skipTrackHandler("backward")} className="skip-back" size="2x" icon={faAngleLeft}/>
                <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPause : faPlay}/>
                <FontAwesomeIcon onClick={() => skipTrackHandler("forward")} className="skip-forward" size="2x" icon={faAngleRight}/>
            </div>
        </div>
    );
}

export default Player;