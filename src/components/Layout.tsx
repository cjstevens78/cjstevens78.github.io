import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Github, Linkedin, Mail, FileText, ExternalLink, Code, Headset, Bot } from 'lucide-react';
import '../app/globals.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
