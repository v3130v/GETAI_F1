/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, {useState} from 'react';
import {Video} from '../types';

interface EditMetadataModalProps {
  video: Video;
  onSave: (updatedVideo: Video) => void;
  onCancel: () => void;
}

export const EditMetadataModal: React.FC<EditMetadataModalProps> = ({
  video,
  onSave,
  onCancel,
}) => {
  const [title, setTitle] = useState(video.title);
  const [description, setDescription] = useState(video.description);

  const handleSave = () => {
    onSave({...video, title, description});
  };

  return (
    <div className="modal-form-container animate-fade-in">
      <div className="form-card">
        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
            Edit Video Metadata
          </h1>
          <p className="text-text-secondary">
            Update the title and description for this video.
          </p>
        </header>

        <main className="space-y-6">
          <div>
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              id="title"
              type="text"
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              aria-label="Video title"
            />
          </div>
          <div>
            <label htmlFor="description" className="form-label">
              Description / Prompt
            </label>
            <textarea
              id="description"
              rows={8}
              className="form-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              aria-label={`Edit description for the video`}
            />
          </div>
        </main>

        <footer className="flex justify-end gap-4 mt-8">
          <button onClick={onCancel} className="btn btn-secondary">
            Cancel
          </button>
          <button onClick={handleSave} className="btn btn-primary">
            Save Changes
          </button>
        </footer>
      </div>
    </div>
  );
};
