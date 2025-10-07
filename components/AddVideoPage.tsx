/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, {useState} from 'react';
import {CloudArrowUpIcon} from './icons';

interface AddVideoPageProps {
  onSave: (videoData: {
    title: string;
    description: string;
    file?: File;
  }) => void;
  onCancel: () => void;
}

type Mode = 'generate' | 'upload';

/**
 * A page that allows the user to add a new video by providing a title, description, and URL.
 */
export const AddVideoPage: React.FC<AddVideoPageProps> = ({
  onSave,
  onCancel,
}) => {
  const [mode, setMode] = useState<Mode>('generate');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const canSave =
    mode === 'generate'
      ? title.trim() !== '' && description.trim() !== ''
      : title.trim() !== '' && videoFile !== null;

  const handleSave = () => {
    if (canSave) {
      onSave({
        title,
        description,
        file: mode === 'upload' ? videoFile : undefined,
      });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setVideoFile(event.target.files[0]);
    } else {
      setVideoFile(null);
    }
  };

  return (
    <div className="form-page-container animate-fade-in">
      <div className="form-card">
        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Add New Video
          </h1>
          <div className="form-tabs">
            <button
              className={`form-tab-button ${mode === 'generate' ? 'active' : ''}`}
              onClick={() => setMode('generate')}>
              Generate
            </button>
            <button
              className={`form-tab-button ${mode === 'upload' ? 'active' : ''}`}
              onClick={() => setMode('upload')}>
              Upload
            </button>
          </div>
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
              placeholder="e.g. A cat riding a skateboard"
            />
          </div>

          {mode === 'generate' ? (
            <div>
              <label htmlFor="description" className="form-label">
                Prompt
              </label>
              <textarea
                id="description"
                rows={6}
                className="form-textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                aria-label="Video prompt"
                placeholder="Describe the video you want to generate. For example: A cinematic shot of a futuristic city with flying cars."
              />
            </div>
          ) : (
            <>
              <div>
                <label htmlFor="video-upload" className="form-label">
                  Video File
                </label>
                <div className="file-input-wrapper">
                  <label htmlFor="video-upload" className="file-input-label">
                    <CloudArrowUpIcon className="w-5 h-5" />
                    <span>
                      {videoFile ? videoFile.name : 'Select a video file'}
                    </span>
                  </label>
                  <input
                    id="video-upload"
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="description" className="form-label">
                  Description (optional)
                </label>
                <textarea
                  id="description"
                  rows={3}
                  className="form-textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  aria-label="Video description"
                  placeholder="Add a brief description for your video."
                />
              </div>
            </>
          )}
        </main>

        <footer className="flex justify-end gap-4 mt-8">
          <button onClick={onCancel} className="btn btn-secondary">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!canSave}
            className="btn btn-primary">
            {mode === 'generate' ? 'Generate Video' : 'Upload Video'}
          </button>
        </footer>
      </div>
    </div>
  );
};
