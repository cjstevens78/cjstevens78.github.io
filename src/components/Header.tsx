import React from 'react';
import { config } from '@/config'

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-6 py-24 w-full">
        <div className="row flex flex-col md:flex-row md:justify-between">
          <div className="w-full md:w-1/2">
            <h1 className="text-5xl font-bold mb-4">{config.personal.name}</h1>
            <p className="text-xl mb-8">{config.personal.role}</p>
            <div className="flex space-x-4 my-2 items-center">
              <p className="flex items-center">
                <a href="/" className="flex items-center whitespace-nowrap">
                  <strong>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-arrow-big-left inline-block"
                    >
                      <path d="M18 15h-6v4l-7-7 7-7v4h6v6z" />
                    </svg>
                    Home
                  </strong>
                </a>
              </p>  
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
