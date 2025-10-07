/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
/**
 * Interface defining the structure of a video object, including its ID, URL,
 * title, and description.
 */
export interface Video {
  id: string;
  videoUrl: string;
  title: string;
  category: string;
  description: string;
}

/**
 * Interface defining the structure for a portfolio link, used in the footer.
 */
export interface PortfolioLink {
  id: string;
  title: string;
  url: string;
}

/**
 * Interface for site-wide contact information.
 */
export interface ContactInfo {
  email: string;
  telegram: string;
  phone: string;
}

/**
 * Interface for site-wide social media links.
 */
export interface SocialLinks {
  instagram: string;
  linkedin: string;
  youtube: string;
}