/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import {GridIcon, HomeIcon, MailIcon, UserIcon} from './icons';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({icon, label, active, onClick}) => (
  <button
    onClick={onClick}
    className={`w-12 h-12 flex items-center justify-center rounded-lg transition-colors duration-200 ${
      active
        ? 'text-white bg-white/10'
        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
    }`}
    aria-label={label}
    title={label}>
    {icon}
  </button>
);

interface SidebarProps {
  currentPage: 'home' | 'projects';
  onNavigate: (page: 'home' | 'projects') => void;
  onAdminLoginClick: () => void;
}

/**
 * A sidebar component for the main application layout.
 */
export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  onAdminLoginClick,
}) => {
  const handleContactClick = () => {
    if (currentPage !== 'projects') {
      onNavigate('projects');
    }
    // Use a timeout to ensure the page has rendered before scrolling
    setTimeout(() => {
      document
        .getElementById('contact-section')
        ?.scrollIntoView({behavior: 'smooth'});
    }, 200);
  };

  return (
    <aside className="sidebar-container w-20 flex flex-col flex-shrink-0 items-center py-6">
      <nav className="flex flex-col gap-4">
        <NavItem
          icon={<HomeIcon className="w-6 h-6" />}
          label="Home"
          active={currentPage === 'home'}
          onClick={() => onNavigate('home')}
        />
        <NavItem
          icon={<GridIcon className="w-6 h-6" />}
          label="Projects"
          active={currentPage === 'projects'}
          onClick={() => onNavigate('projects')}
        />
        <NavItem
          icon={<MailIcon className="w-6 h-6" />}
          label="Contact"
          onClick={handleContactClick}
        />
      </nav>

      {/* This div will grow to push the button to the bottom */}
      <div className="flex-grow" />

      {/* This button will be at the bottom */}
      <button
        onClick={onAdminLoginClick}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
        title="Admin Login">
        <UserIcon className="w-5 h-5" />
      </button>
    </aside>
  );
};