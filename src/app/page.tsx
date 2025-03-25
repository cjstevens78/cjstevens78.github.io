"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Github, Linkedin, Mail, FileText, ExternalLink, Code, Headset, Bot } from 'lucide-react';
import { config } from '@/config';
import ResumeAssistant from '../components/ResumeAssistant';
import ContractsDisplay from '../components/ContractsDisplay';
import ProjectsDisplay from '../components/ProjectsDisplay';
import { useRef, useEffect } from "react";
import Footer from '../components/Footer';
import BlogSection from '../components/BlogSection';

export default function Home() {

  const mainInputRef = useRef<HTMLInputElement>(null);

  const handleSkipLink = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (mainInputRef.current) {
      mainInputRef.current.focus();
    }
  };

  useEffect(() => {
    const hasRun = sessionStorage.getItem('webhookSent');
    if (hasRun) return;
  
    sessionStorage.setItem('webhookSent', 'true');

    const params = new URLSearchParams(window.location.search);
    const isFromCV = params.has('cv');
    
    fetch("/api/discordWebhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event: isFromCV ? "CV Visit" : "Page Visit",
        details: isFromCV 
          ? `User visited the website from your cv at ${new Date().toLocaleString()}`
          : `User visited the website at ${new Date().toLocaleString()}`,
      }),
    }).catch((error) => console.error("Error sending webhook:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <button
        onClick={handleSkipLink}
        className="absolute left-0 top-[-100px] focus:top-0 transition-all duration-300 bg-white text-black p-2 z-50"
      >
        Skip to main content
      </button>

      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-6 py-24 w-full">
          <div className="row flex flex-col md:flex-row md:justify-between">
            <div className="w-full md:w-1/2">
              <Image src="/images/me.png" alt="Chris Stevens Headshot" width={144} height={144} className="w-36 mb-4 rounded-lg object-cover" />
              <h1 className="text-5xl font-bold mb-4">{config.personal.name}</h1>
              <p className="text-xl mb-8">{config.personal.role}</p>
              <div className="flex space-x-4 my-2 items-center">
                <a href={config.personal.github} className="p-2 hover:bg-blue-700 rounded-full transition-colors" title="See my repo on github">
                  <Github className="w-6 h-6" />
                </a>
                <a href={`mailto:${config.personal.email}`} className="p-2 hover:bg-blue-700 rounded-full transition-colors" title="Send me an email">
                  <Mail className="w-6 h-6" />
                </a>
                <a href={'https://wa.me/07809758568'} className="p-2 hover:bg-blue-700 rounded-full transition-colors" title="Talk with me on whatsapp">
                  <Headset className="w-6 h-6" />
                </a>
                <p className="flex items-center gap-2"><strong>Phone: 07809 758568</strong></p>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-end">
              <ResumeAssistant ref={mainInputRef} />
            </div>
          </div>
        </div>
      </header>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={config.about.image}
                alt={config.about.imageAlt}
                fill
                className="rounded-lg shadow-lg object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="space-y-4">
              {config.about.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-gray-600">{paragraph}</p>
              ))}
              <div className="pt-4">
                <a
                  href={config.personal.cvPath}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FileText className="w-5 h-5" />
                  Download CV
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12">Technical Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {config.skills.map((skill) => (
              <div
                key={skill}
                className="p-4 bg-gray-50 rounded-lg text-center hover:shadow-md transition-shadow"
              >
                <p className="font-medium text-gray-800">{skill}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Contracts Section */}
      <section className="py-20">
        <ContractsDisplay />
      </section>
      {/* Projects Section */}
      <section className="py-20">
        <ProjectsDisplay />
      </section>
      {/* Blog Section */}
      <section className="py-20">
        <BlogSection />
      </section>
      {/* Playground Section */}
      <section className="bg-gradient-to-b from-gray-50 to-gray-100 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">{config.playground.heading}</h2>
          <p className="text-gray-600 mb-12">{config.playground.description}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {config.playground.projects.map((project, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48">
                  <Image 
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <span className="text-sm text-gray-500">{project.date}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a 
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Demo
                    </a>
                    <a 
                      href={project.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800"
                    >
                      <Code className="w-4 h-4" />
                      Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8">{config.contact.heading}</h2>
          <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
            <p className="text-xl">
              {config.contact.tagline}
            </p>
            <div className="flex gap-4">
              <a 
                href={`mailto:${config.personal.email}`}
                className="flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Mail className="w-5 h-5" />
                Email Me
              </a>
              
              <a 
                href={config.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </a>
              
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}