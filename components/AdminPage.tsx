/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import React, {useState, useEffect} from 'react';
import {ContactInfo, PortfolioLink, SocialLinks, Video} from '../types';
import {
  ApiKeyIcon,
  DragHandleIcon,
  LogoutIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from './icons';

interface AdminVideoListItemProps {
  video: Video;
  onDelete: (id: string) => void;
  onEdit: (video: Video) => void;
}

const AdminVideoListItem: React.FC<AdminVideoListItemProps> = ({
  video,
  onDelete,
  onEdit,
}) => {
  const {attributes, listeners, setNodeRef, transform, transition, isDragging} =
    useSortable({id: video.id});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 'auto',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`admin-video-item ${isDragging ? 'dragging' : ''}`}>
      <div
        className="admin-drag-handle"
        {...attributes}
        {...listeners}
        title="Drag to reorder">
        <DragHandleIcon className="w-5 h-5" />
      </div>
      <img
        src={video.videoUrl}
        alt={video.title}
        className="admin-video-item-thumbnail"
      />
      <p className="admin-video-item-title flex-grow">{video.title}</p>
      <div className="admin-video-item-actions">
        <button onClick={() => onEdit(video)} className="btn btn-secondary">
          <PencilSquareIcon className="w-4 h-4" />
        </button>
        <button onClick={() => onDelete(video.id)} className="btn btn-danger">
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

interface AdminPageProps {
  videos: Video[];
  portfolioLinks: PortfolioLink[];
  contactInfo: ContactInfo;
  socialLinks: SocialLinks;
  onAddVideo: () => void;
  onBack: () => void;
  onDeleteVideo: (id: string) => void;
  onEditMetadata: (video: Video) => void;
  onLogout: () => void;
  onUpdatePortfolioLinks: (links: PortfolioLink[]) => void;
  onUpdateSiteInfo: (info: {
    contactInfo: ContactInfo;
    socialLinks: SocialLinks;
  }) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  videos,
  portfolioLinks,
  contactInfo,
  socialLinks,
  onAddVideo,
  onBack,
  onDeleteVideo,
  onEditMetadata,
  onLogout,
  onUpdatePortfolioLinks,
  onUpdateSiteInfo,
}) => {
  const [apiKey, setApiKey] = useState(process.env.API_KEY ?? '');
  const [links, setLinks] = useState<PortfolioLink[]>(portfolioLinks);
  const [currentContactInfo, setCurrentContactInfo] =
    useState<ContactInfo>(contactInfo);
  const [currentSocialLinks, setCurrentSocialLinks] =
    useState<SocialLinks>(socialLinks);

  useEffect(() => {
    setLinks(portfolioLinks);
  }, [portfolioLinks]);

  useEffect(() => {
    setCurrentContactInfo(contactInfo);
  }, [contactInfo]);

  useEffect(() => {
    setCurrentSocialLinks(socialLinks);
  }, [socialLinks]);

  const handleLinkChange = (
    index: number,
    field: 'title' | 'url',
    value: string,
  ) => {
    const newLinks = [...links];
    newLinks[index] = {...newLinks[index], [field]: value};
    setLinks(newLinks);
  };

  const handleAddLink = () => {
    setLinks([
      ...links,
      {id: self.crypto.randomUUID(), title: '', url: ''},
    ]);
  };

  const handleDeleteLink = (id: string) => {
    setLinks(links.filter((link) => link.id !== id));
  };

  const handleSaveLinks = () => {
    onUpdatePortfolioLinks(links);
    alert('Portfolio links updated!');
  };

  const handleSaveSiteInfo = () => {
    onUpdateSiteInfo({
      contactInfo: currentContactInfo,
      socialLinks: currentSocialLinks,
    });
    alert('Site information updated!');
  };

  return (
    <div className="admin-page-container animate-fade-in">
      <header className="flex justify-between items-center p-4 border-b border-border flex-shrink-0">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <div className="flex gap-4">
          <button onClick={onBack} className="btn btn-secondary">
            Back to Site
          </button>
          <button onClick={onLogout} className="btn btn-secondary">
            <LogoutIcon className="w-5 h-5" />
            Logout
          </button>
        </div>
      </header>

      <main className="flex-grow p-4 md:p-6 space-y-8">
        <section>
          <div className="admin-section-header">
            <h2 className="admin-section-title">Manage Videos</h2>
            <button onClick={onAddVideo} className="btn btn-primary">
              <PlusIcon className="w-5 h-5" />
              <span>Generate New Video</span>
            </button>
          </div>
          <div className="admin-video-list">
            {videos.map((video) => (
              <AdminVideoListItem
                key={video.id}
                video={video}
                onDelete={onDeleteVideo}
                onEdit={onEditMetadata}
              />
            ))}
          </div>
        </section>

        <section className="admin-section">
          <div className="admin-section-header">
            <h2 className="admin-section-title">Site Information</h2>
            <button onClick={handleSaveSiteInfo} className="btn btn-primary">
              Save Site Info
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-text-primary">
                Contact Details
              </h3>
              <div>
                <label className="form-label">Email</label>
                <input
                  type="email"
                  value={currentContactInfo.email}
                  onChange={(e) =>
                    setCurrentContactInfo({
                      ...currentContactInfo,
                      email: e.target.value,
                    })
                  }
                  className="form-input"
                />
              </div>
              <div>
                <label className="form-label">Telegram URL</label>
                <input
                  type="text"
                  value={currentContactInfo.telegram}
                  onChange={(e) =>
                    setCurrentContactInfo({
                      ...currentContactInfo,
                      telegram: e.target.value,
                    })
                  }
                  className="form-input"
                />
              </div>
              <div>
                <label className="form-label">Phone</label>
                <input
                  type="text"
                  value={currentContactInfo.phone}
                  onChange={(e) =>
                    setCurrentContactInfo({
                      ...currentContactInfo,
                      phone: e.target.value,
                    })
                  }
                  className="form-input"
                />
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-text-primary">
                Social Media Links
              </h3>
              <div>
                <label className="form-label">Instagram URL</label>
                <input
                  type="url"
                  value={currentSocialLinks.instagram}
                  onChange={(e) =>
                    setCurrentSocialLinks({
                      ...currentSocialLinks,
                      instagram: e.target.value,
                    })
                  }
                  className="form-input"
                />
              </div>
              <div>
                <label className="form-label">LinkedIn URL</label>
                <input
                  type="url"
                  value={currentSocialLinks.linkedin}
                  onChange={(e) =>
                    setCurrentSocialLinks({
                      ...currentSocialLinks,
                      linkedin: e.target.value,
                    })
                  }
                  className="form-input"
                />
              </div>
              <div>
                <label className="form-label">YouTube URL</label>
                <input
                  type="url"
                  value={currentSocialLinks.youtube}
                  onChange={(e) =>
                    setCurrentSocialLinks({
                      ...currentSocialLinks,
                      youtube: e.target.value,
                    })
                  }
                  className="form-input"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="admin-section">
          <div className="admin-section-header">
            <h2 className="admin-section-title">Manage Portfolio Links</h2>
            <button onClick={handleSaveLinks} className="btn btn-primary">
              Save Links
            </button>
          </div>
          <div className="admin-links-list">
            {links.map((link, index) => (
              <div key={link.id} className="admin-link-item">
                <div className="admin-link-item-inputs">
                  <input
                    type="text"
                    value={link.title}
                    onChange={(e) =>
                      handleLinkChange(index, 'title', e.target.value)
                    }
                    placeholder="Link Title"
                    className="form-input"
                  />
                  <input
                    type="url"
                    value={link.url}
                    onChange={(e) =>
                      handleLinkChange(index, 'url', e.target.value)
                    }
                    placeholder="https://example.com"
                    className="form-input"
                  />
                </div>
                <button
                  onClick={() => handleDeleteLink(link.id)}
                  className="btn btn-danger">
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          <button onClick={handleAddLink} className="btn btn-secondary mt-4">
            <PlusIcon className="w-5 h-5" />
            Add Link
          </button>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4">API Key</h2>
          <div className="admin-section">
            <p className="mb-2 text-text-secondary">
              Manage the Google AI API key for video generation.
            </p>
            <div className="api-key-input-wrapper">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="form-input"
                placeholder="Enter your API key"
              />
              <button
                onClick={() =>
                  alert('API Key updated (this is a mock action).')
                }
                className="btn btn-secondary">
                Update
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};