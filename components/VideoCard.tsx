/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, {useRef} from 'react';
import {Video} from '../types';

interface VideoCardProps {
  video: Video;
  onPlay: (video: Video) => void;
}

/**
 * A component that renders a video card with a thumbnail, title, and play button.
 */
export const VideoCard: React.FC<VideoCardProps> = ({
  video,
  onPlay,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    videoRef.current?.play().catch(() => {
      // Ignore errors if the video can't be played automatically
    });
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="video-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <button
        type="button"
        className="video-card-button"
        onClick={() => onPlay(video)}
        aria-label={`Play video: ${video.title}`}>
        <div className="video-card-thumbnail-wrapper">
          <video
            ref={videoRef}
            className="video-card-thumbnail"
            src={video.videoUrl}
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
            loop
          />
        </div>
        <div className="video-card-overlay">
          <p className="video-card-category">{video.category}</p>
          <h3 className="video-card-title" title={video.title}>
            {video.title}
          </h3>
        </div>
      </button>
    </div>
  );
};
