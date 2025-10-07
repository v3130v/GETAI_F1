/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import React, {useState} from 'react';
import {AddVideoPage} from './components/AddVideoPage';
import {AdminPage} from './components/AdminPage';
import {EditMetadataModal} from './components/EditMetadataModal';
import {ErrorModal} from './components/ErrorModal';
import {Footer} from './components/Footer';
import {LoginPage} from './components/LoginPage';
import {SavingProgressPage} from './components/SavingProgressPage';
import {Sidebar} from './components/Sidebar';
import {VideoGrid} from './components/VideoGrid';
import {VideoPlayer} from './components/VideoPlayer';
import {
  MOCK_CONTACT_INFO,
  MOCK_PORTFOLIO_LINKS,
  MOCK_SOCIAL_LINKS,
  MOCK_VIDEOS,
} from './constants';
import {ContactInfo, PortfolioLink, SocialLinks, Video} from './types';
import {HomePage} from './components/HomePage';

import {GeneratedVideo, GoogleGenAI} from '@google/genai';
import {ContactSection} from './components/ContactSection';
import {FeaturedWork} from './components/FeaturedWork';

type AdminOverlay =
  | 'login'
  | 'admin'
  | 'addVideo'
  | {type: 'editMetadata'; video: Video}
  | null;

type Page = 'home' | 'projects';

const VEO3_MODEL_NAME = 'veo-2.0-generate-001';

const ai = new GoogleGenAI({apiKey: process.env.API_KEY});

// ---

function bloblToBase64(blob: Blob) {
  return new Promise<string>(async (resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string;
      resolve(url.split(',')[1]);
    };
    reader.readAsDataURL(blob);
  });
}

// ---

async function generateVideoFromText(
  prompt: string,
  numberOfVideos = 1,
): Promise<string[]> {
  let operation = await ai.models.generateVideos({
    model: VEO3_MODEL_NAME,
    prompt,
    config: {
      numberOfVideos,
      aspectRatio: '16:9',
    },
  });

  while (!operation.done) {
    await new Promise((resolve) => setTimeout(resolve, 10000));
    console.log('...Generating...');
    operation = await ai.operations.getVideosOperation({operation});
  }

  if (operation.error) {
    console.error('Video generation operation failed:', operation.error);
    let message = 'Video generation failed with an unknown error.';

    if (operation.error && typeof operation.error === 'object') {
      if (
        'message' in operation.error &&
        typeof (operation.error as {message: unknown}).message === 'string'
      ) {
        message = (operation.error as {message: string}).message;
      } else {
        message = JSON.stringify(operation.error);
      }
    } else if (typeof operation.error === 'string') {
      message = operation.error;
    }

    throw new Error(message);
  }

  if (operation?.response) {
    const videos = operation.response?.generatedVideos;
    if (videos === undefined || videos.length === 0) {
      throw new Error('No videos generated');
    }

    return await Promise.all(
      videos.map(async (generatedVideo: GeneratedVideo) => {
        const url = decodeURIComponent(generatedVideo.video.uri);
        const res = await fetch(`${url}&key=${process.env.API_KEY}`);
        if (!res.ok) {
          throw new Error(
            `Failed to fetch video: ${res.status} ${res.statusText}`,
          );
        }
        const blob = await res.blob();
        return bloblToBase64(blob);
      }),
    );
  } else {
    throw new Error('No videos generated');
  }
}

/**
 * Main component for the Veo3 Gallery app.
 * It manages the state of videos, playing videos, editing videos and error handling.
 */
export const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminOverlay, setAdminOverlay] = useState<AdminOverlay>(null);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [videos, setVideos] = useState<Video[]>(MOCK_VIDEOS);
  const [playingVideo, setPlayingVideo] = useState<Video | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [generationError, setGenerationError] = useState<{
    title: string;
    message: string[];
  } | null>(null);
  const [portfolioLinks, setPortfolioLinks] =
    useState<PortfolioLink[]>(MOCK_PORTFOLIO_LINKS);
  const [contactInfo, setContactInfo] =
    useState<ContactInfo>(MOCK_CONTACT_INFO);
  const [socialLinks, setSocialLinks] =
    useState<SocialLinks>(MOCK_SOCIAL_LINKS);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const handleLogin = (email: string, password: string) => {
    if (
      email.toLowerCase() === 'v3130v@gmail.com' &&
      password === '3130@mail.ru'
    ) {
      setIsAdmin(true);
      setAdminOverlay('admin');
      setCurrentPage('projects');
    } else {
      alert('Invalid email or password.');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setAdminOverlay(null);
    setCurrentPage('home');
  };

  const handleGenerationError = (error: unknown) => {
    console.error('Video generation failed:', error);
    const errorMessage =
      (error as Error)?.message ?? 'An unknown error occurred.';

    const message = [`Error: ${errorMessage}`];

    if (errorMessage.includes('API key')) {
      message.push('Please verify your API key in the Admin Panel.');
    }

    setGenerationError({
      title: 'Generation Failed',
      message,
    });
  };

  const handlePlayVideo = (video: Video) => {
    setPlayingVideo(video);
  };

  const handleClosePlayer = () => {
    setPlayingVideo(null);
  };

  const handleStartAddVideo = () => {
    setAdminOverlay('addVideo');
  };

  const handleCancelAddVideo = () => {
    setAdminOverlay('admin');
  };

  const handleSaveNewVideo = async (videoData: {
    title: string;
    description: string;
    file?: File;
  }) => {
    setAdminOverlay('admin');
    setIsSaving(true);
    setGenerationError(null);

    try {
      let src: string;
      let category: string;

      if (videoData.file) {
        const base64Video = await bloblToBase64(videoData.file);
        const mimeType = videoData.file.type;
        src = `data:${mimeType};base64,${base64Video}`;
        category = 'Uploaded';
      } else {
        const promptText = videoData.description;
        console.log('Generating new video...', promptText);
        const videoObjects = await generateVideoFromText(promptText);

        if (!videoObjects || videoObjects.length === 0) {
          throw new Error('Video generation returned no data.');
        }

        console.log('Generated video data received.');
        const mimeType = 'video/mp4';
        const videoSrc = videoObjects[0];
        src = `data:${mimeType};base64,${videoSrc}`;
        category = 'Generated';
      }

      const newVideo: Video = {
        id: self.crypto.randomUUID(),
        title: videoData.title,
        category,
        description: videoData.description,
        videoUrl: src,
      };

      setVideos((currentVideos) => [newVideo, ...currentVideos]);
      setPlayingVideo(newVideo);
    } catch (error) {
      if (videoData.file) {
        setGenerationError({
          title: 'Upload Failed',
          message: [
            (error as Error)?.message ??
              'An unknown error occurred while processing the file.',
          ],
        });
      } else {
        handleGenerationError(error);
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteVideo = (videoId: string) => {
    if (
      window.confirm(
        `Are you sure you want to delete this video? This action cannot be undone.`,
      )
    ) {
      setVideos((currentVideos) =>
        currentVideos.filter((video) => video.id !== videoId),
      );
    }
  };

  const handleStartEditMetadata = (video: Video) => {
    setAdminOverlay({type: 'editMetadata', video});
  };

  const handleSaveMetadata = (updatedVideo: Video) => {
    setVideos((currentVideos) =>
      currentVideos.map((v) =>
        v.id === updatedVideo.id ? updatedVideo : v,
      ),
    );
    setAdminOverlay('admin');
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const {active, over} = event;
    if (over && active.id !== over.id) {
      setVideos((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleUpdatePortfolioLinks = (links: PortfolioLink[]) => {
    setPortfolioLinks(links);
  };

  const handleUpdateSiteInfo = (info: {
    contactInfo: ContactInfo;
    socialLinks: SocialLinks;
  }) => {
    setContactInfo(info.contactInfo);
    setSocialLinks(info.socialLinks);
  };

  const renderAdminOverlay = () => {
    if (isSaving) {
      return <SavingProgressPage />;
    }

    if (!adminOverlay) {
      return null;
    }

    if (typeof adminOverlay === 'string') {
      switch (adminOverlay) {
        case 'login':
          return (
            <LoginPage
              onLogin={handleLogin}
              onCancel={() => setAdminOverlay(null)}
            />
          );
        case 'admin':
          if (isAdmin) {
            return (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}>
                <SortableContext
                  items={videos}
                  strategy={verticalListSortingStrategy}>
                  <AdminPage
                    videos={videos}
                    portfolioLinks={portfolioLinks}
                    contactInfo={contactInfo}
                    socialLinks={socialLinks}
                    onAddVideo={handleStartAddVideo}
                    onBack={() => setAdminOverlay(null)}
                    onDeleteVideo={handleDeleteVideo}
                    onEditMetadata={handleStartEditMetadata}
                    onLogout={handleLogout}
                    onUpdatePortfolioLinks={handleUpdatePortfolioLinks}
                    onUpdateSiteInfo={handleUpdateSiteInfo}
                  />
                </SortableContext>
              </DndContext>
            );
          }
          return null;
        case 'addVideo':
          if (isAdmin) {
            return (
              <AddVideoPage
                onSave={handleSaveNewVideo}
                onCancel={handleCancelAddVideo}
              />
            );
          }
          return null;
        default:
          return null;
      }
    }

    if (typeof adminOverlay === 'object' && adminOverlay.type) {
      switch (adminOverlay.type) {
        case 'editMetadata':
          if (isAdmin) {
            return (
              <EditMetadataModal
                video={adminOverlay.video}
                onSave={handleSaveMetadata}
                onCancel={() => setAdminOverlay('admin')}
              />
            );
          }
          return null;
        default:
          return null;
      }
    }

    return null;
  };

  return (
    <div className="app-container">
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onAdminLoginClick={() => setAdminOverlay('login')}
      />

      <div
        className={`main-content ${currentPage === 'home' ? 'content-blurred' : ''}`}>
        <header className="app-header">
          <span className="logo">GETAI</span>
        </header>

        <main className="content-wrapper">
          <div className="projects-header">
            <h1 className="projects-title">ПРОЕКТЫ</h1>
            <p className="projects-subtitle">
              A curated collection of our latest work in AI-driven content
              creation.
            </p>
          </div>
          <VideoGrid videos={videos} onPlayVideo={handlePlayVideo} />
          <FeaturedWork portfolioLinks={portfolioLinks} />
          <ContactSection contactInfo={contactInfo} />
        </main>

        <Footer socialLinks={socialLinks} />
      </div>

      {currentPage === 'home' && (
        <HomePage onProjectsClick={() => setCurrentPage('projects')} />
      )}

      {playingVideo && (
        <VideoPlayer video={playingVideo} onClose={handleClosePlayer} />
      )}

      {adminOverlay && (
        <div className="admin-overlay">{renderAdminOverlay()}</div>
      )}

      {generationError && (
        <ErrorModal
          title={generationError.title}
          message={generationError.message}
          onClose={() => setGenerationError(null)}
        />
      )}
    </div>
  );
};
