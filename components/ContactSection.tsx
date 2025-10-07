/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import {ContactInfo} from '../types';

interface ContactSectionProps {
  contactInfo: ContactInfo;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  contactInfo,
}) => {
  return (
    <section id="contact-section" className="contact-section">
      <h2 className="contact-title">Let's Create Together</h2>
      <p className="contact-subtitle">
        Ready to make the impossible possible? Get in touch.
      </p>
      <div className="contact-buttons">
        <a href={`mailto:${contactInfo.email}`} className="btn btn-primary">
          Email Us
        </a>
        <a href="#" className="btn btn-outline">
          Schedule a Call
        </a>
      </div>
      <div className="contact-details">
        <a href={`tel:${contactInfo.phone}`}>TEL: {contactInfo.phone}</a>
        <span>&bull;</span>
        <a href={contactInfo.telegram} target="_blank">
          TELEGRAM
        </a>
        <span>&bull;</span>
        <a href={`mailto:${contactInfo.email}`}>EMAIL: {contactInfo.email}</a>
      </div>
    </section>
  );
};