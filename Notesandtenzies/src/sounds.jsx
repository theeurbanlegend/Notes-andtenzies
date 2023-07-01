import React from "react";
import Sound from 'react-sound';
import Gametheme from './gametheme.mp3'
const PlaySound=(
    handleSongLoading,
    handleSongPlaying,
    handleSongFinishedPlaying
)=>{
    return (
      <div>
        <Sound
          url={Gametheme} // the sound file URL or path
          playStatus={Sound.status.PLAYING} 
          volume={100} 
          onLoading={handleSongLoading}
          onPlaying={handleSongPlaying}
          onFinishedPlaying={handleSongFinishedPlaying}
          loop={true} // whether to loop the sound or not
        />
      </div>
    );
  }

export default PlaySound