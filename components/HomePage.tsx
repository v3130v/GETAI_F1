/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

interface HomePageProps {
  onProjectsClick: () => void;
}

/**
 * A component that renders the hero content for the home page.
 * It acts as an overlay on top of the blurred project gallery.
 */
export const HomePage: React.FC<HomePageProps> = ({onProjectsClick}) => {
  return (
    <div className="home-hero-content animate-fade-in">
      <h1 className="home-hero-title">Fast is slow, but steady is forever</h1>
      <div className="home-brand-container">
        <h2 className="home-brand-title">GETAI</h2>
        <p className="home-hero-subtitle">AI Content Studio</p>
      </div>
      <button
        onClick={onProjectsClick}
        className="btn btn-outline home-login-button">
        Projects
      </button>
      <p className="home-signature">get a</p>
    </div>
  );
};