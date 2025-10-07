/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import {ContactInfo, PortfolioLink, SocialLinks, Video} from './types';

/** Base URL for static files. */
const staticFilesUrl =
  'https://www.gstatic.com/aistudio/starter-apps/veo3-gallery/';

/** Default background video for the home page. */
export const HOME_BG_VIDEO_URLS = [
  staticFilesUrl + 'Abstract_Cinematic_The_Mechanical_Heartbeat.mp4',
  staticFilesUrl + 'Live_Performance_Soulful_Singer_s_Ballad.mp4',
  staticFilesUrl + 'Kyoto_Serenity_From_Scene_to_Postcard.mp4',
];

/** Videos for the gallery, curated for the GETAI brand. */
export const MOCK_VIDEOS: Video[] = [
  {
    id: '1',
    title: 'Digital Avatar',
    category: '3D',
    videoUrl: staticFilesUrl + 'Claymation_Robot_s_Existential_Crisis.mp4',
    description:
      'A hyper-realistic digital avatar in a minimalist environment, showcasing advanced motion capture and rendering techniques. The avatar displays a range of subtle human emotions.',
  },
  {
    id: '2',
    title: 'Event Coverage',
    category: 'Cinema',
    videoUrl: staticFilesUrl + 'Live_Performance_Soulful_Singer_s_Ballad.mp4',
    description:
      'Dynamic and cinematic coverage of a high-energy live event. The video captures the excitement of the crowd and the spectacle of the performance with sweeping camera movements and dramatic lighting.',
  },
  {
    id: '3',
    title: 'Corporate Video',
    category: 'TV Ads',
    videoUrl: staticFilesUrl + 'Video_Game_Trailer_Sci_Fi_Urban_Chasemp4.mp4',
    description:
      'A sleek and professional corporate video highlighting brand values and innovation. It uses abstract visuals and a confident narrative to convey a powerful message of progress and success.',
  },
  {
    id: '4',
    title: 'Interior Design',
    category: 'Architecture',
    videoUrl:
      staticFilesUrl + 'Abstract_Cinematic_The_Mechanical_Heartbeat.mp4',
    description:
      'A slow, panning shot revealing a beautifully crafted interior space. The focus is on the interplay of light, shadow, texture, and form, creating a serene and luxurious atmosphere.',
  },
  {
    id: '5',
    title: 'Jewelry Campaign',
    category: 'Fashion',
    videoUrl: staticFilesUrl + 'Kyoto_Serenity_From_Scene_to_Postcard.mp4',
    description:
      'An elegant macro shot of a diamond necklace, highlighting its intricate details and sparkle. The lighting is soft and sophisticated, emphasizing the piece as a work of art.',
  },
  {
    id: '6',
    title: '3D Product Render',
    category: '3D',
    videoUrl:
      staticFilesUrl +
      'Stop_Motion_Fluffy_Characters__Culinary_Disaster.mp4',
    description:
      'A photorealistic 3D render of a luxury product. The camera slowly orbits the object, showcasing its form and materials in exquisite detail against a clean, dark background.',
  },
];

/** Mock portfolio links for the footer. */
export const MOCK_PORTFOLIO_LINKS: PortfolioLink[] = [
  {
    id: 'yt1',
    title: 'comfyui showreel',
    url: 'https://www.youtube.com/watch?v=QCE5DBo4Z_E',
  },
  {
    id: 'yt2',
    title: 'Brand Anthem',
    url: '#',
  },
  {
    id: 'yt3',
    title: 'Product Launch',
    url: '#',
  },
];

/** Mock contact info for the contact section. */
export const MOCK_CONTACT_INFO: ContactInfo = {
  email: 'contact@getai.com',
  telegram: 'https://t.me/getai_contact',
  phone: '+1 (234) 567-890',
};

/** Mock social media links for the footer. */
export const MOCK_SOCIAL_LINKS: SocialLinks = {
  instagram: '#',
  linkedin: '#',
  youtube: '#',
};