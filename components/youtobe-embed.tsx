"use client";

import React from 'react';

import YouTube from 'react-youtube';

// @ts-ignore
const YouTubeEmbed = ({ videoId }) => {
  // @ts-ignore
  const onPlayerReady = (event) => {
    // Access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />;
};

export default YouTubeEmbed;