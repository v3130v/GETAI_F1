/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import {Video} from '../types';
import {XMarkIcon} from './icons';

interface VideoPlayerProps {
  video: Video;
  onClose: () => void;
}

/**
 * A component that renders a video player with controls, description, and edit button.
 */
export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  video,
  onClose,
}) => {
  return (
    <div
      className="modal-overlay animate-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog">
      <div
        className="modal-content w-full max-w-4xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="modal-close-button"
          aria-label="Close video player">
          <XMarkIcon className="w-6 h-6" />
        </button>
        <div className="flex-shrink-0 p-4">
          <div className="aspect-w-16 aspect-h-9 bg-black rounded-md overflow-hidden">
            <video
              key={video.id}
              className="w-full h-full"
              src={video.videoUrl}
              controls
              autoPlay
              loop
              aria-label={video.title}
            />
          </div>
        </div>
        <div className="flex-1 p-4 pt-0 overflow-y-auto">
          <div className="flex justify-between items-start gap-4">
            <div>
              <p className="font-bold text-white">{video.title}</p>
              <p className="text-sm text-gray-400 mt-2 whitespace-pre-wrap flex-1">
                {video.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
