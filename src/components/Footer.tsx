import React from 'react';
import { config } from '@/config'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
      <div className="container mx-auto px-6 text-center">
        <p>© {new Date().getFullYear()} {config.personal.name}. All rights reserved.</p>
        <p>{config.personal.statement}</p>
      </div>
    </footer>
  );
};

export default Footer;
