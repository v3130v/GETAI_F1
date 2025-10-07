/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

/**
 * A fullscreen overlay that displays a loading animation and text indicating that
 * a video remix is being created.
 */
export const SavingProgressPage: React.FC = () => {
  return (
    <div
      className="saving-progress-page animate-fade-in"
      aria-live="polite"
      aria-busy="true">
      <div className="saving-progress-spinner"></div>
      <h2 className="text-2xl font-bold text-white mt-8">
        Generating your video...
      </h2>
      <p className="text-gray-400 mt-2 text-center px-4">
        This may take a few minutes. Please wait while we bring your vision to
        life.
      </p>
    </div>
  );
};