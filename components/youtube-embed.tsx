"use client";

import React, { useState } from "react";
import YouTube from "react-youtube";
import LazyLoad from "react-lazyload";
import "../styles/youtube-card.css";

// @ts-ignore
const YouTubeEmbed = ({ videoId, width, height }) => {
  const [play, setPlay] = useState(false);

  const handlePlay = () => {
    setPlay(true);
  };

  return (
    <div className="youtube-thumbnail" onClick={handlePlay}>
      {!play ? (
        <div className="relative">
          <div
            className="ytp-cued-thumbnail-overlay-image"
            style={{
              cursor: "pointer",
              height,
              backgroundImage: `url(https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg)`,
            }}
          ></div>
          <button
            className="ytp-large-play-button ytp-button ytp-large-play-button-red-bg"
            aria-label="播放"
            title="播放"
          >
            <svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%">
              <path
                className="ytp-large-play-button-bg"
                d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
                fill="#f00"
              ></path>
              <path d="M 45,24 27,14 27,34" fill="#fff"></path>
            </svg>
          </button>
        </div>
      ) : (
        <LazyLoad height={height}>
          <YouTube
            videoId={videoId}
            opts={{ width, height, playerVars: { autoplay: 1 } }}
          />
        </LazyLoad>
      )}
    </div>
  );
};

export default YouTubeEmbed;
