/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, {useState} from 'react';
import {GETAILogoIcon, GoogleIcon, XMarkIcon} from './icons';

interface LoginPageProps {
  onLogin: (email: string, password: string) => void;
  onCancel: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({onLogin, onCancel}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email, password);
    }
  };

  return (
    <div className="login-page-container animate-fade-in">
      <div className="login-card">
        <button
          onClick={onCancel}
          className="modal-close-button"
          aria-label="Close login">
          <XMarkIcon className="w-6 h-6" />
        </button>
        <GETAILogoIcon className="w-16 h-16 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">Admin Access</h1>
        <p className="text-gray-400 mb-8">
          Sign in to manage your content studio.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input text-center"
              placeholder="Enter your email"
              required
              aria-label="Email Address"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input text-center"
              placeholder="Enter your password"
              required
              aria-label="Password"
            />
          </div>
          <button type="submit" className="btn btn-primary w-full mt-4">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};
