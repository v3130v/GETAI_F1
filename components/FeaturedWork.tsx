/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import {PortfolioLink} from '../types';

interface FeaturedWorkProps {
  portfolioLinks: PortfolioLink[];
}

export const FeaturedWork: React.FC<FeaturedWorkProps> = ({
  portfolioLinks,
}) => {
  if (portfolioLinks.length === 0) {
    return null;
  }

  return (
    <section id="featured-work" className="featured-work-section">
      <div className="featured-work-content">
        <h3>Featured Work</h3>
        <ul>
          {portfolioLinks.map((link) => (
            <li key={link.id}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
