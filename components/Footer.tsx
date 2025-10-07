/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import {SocialLinks} from '../types';
import {
  GETAILogoIcon,
  InstagramIcon,
  LinkedInIcon,
  YouTubeIcon,
} from './icons';

interface FooterProps {
  socialLinks: SocialLinks;
}

export const Footer: React.FC<FooterProps> = ({socialLinks}) => {
  return (
    <footer id="footer" className="footer-container">
      <div className="footer-main">
        <div className="footer-brand">
          <div className="footer-logo">
            <GETAILogoIcon className="logo-icon" />
            <span className="logo-text">GETAI</span>
          </div>
          <p className="footer-slogan">
            We create the impossible — fast, precise, luxurious.
          </p>
        </div>
        <div className="footer-links">
          <h3>Follow Us</h3>
          <div className="footer-socials">
            <a
              href={socialLinks.instagram}
              className="footer-social-link"
              aria-label="Instagram"
              title="Instagram"
              target="_blank"
              rel="noopener noreferrer">
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a
              href={socialLinks.linkedin}
              className="footer-social-link"
              aria-label="LinkedIn"
              title="LinkedIn"
              target="_blank"
              rel="noopener noreferrer">
              <LinkedInIcon className="w-5 h-5" />
            </a>
            <a
              href={socialLinks.youtube}
              className="footer-social-link"
              aria-label="YouTube"
              title="YouTube"
              target="_blank"
              rel="noopener noreferrer">
              <YouTubeIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} GETAI. All rights reserved.</p>
      </div>
    </footer>
  );
};