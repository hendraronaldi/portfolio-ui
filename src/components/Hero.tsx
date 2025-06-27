import React from 'react';
import { Github, Linkedin, Twitter, Mail, FileText } from 'lucide-react';
import heroData from '../data/hero.json';
import heroImage from '../assets/img/hero.png';

const Hero: React.FC = () => {
  // Map string icon names to actual components
  const getIconComponent = (iconName: string, size: number = 20) => {
    switch (iconName) {
      case 'Github':
        return <Github size={size} />;
      case 'Linkedin':
        return <Linkedin size={size} />;
      case 'Twitter':
        return <Twitter size={size} />;
      case 'Mail':
        return <Mail size={size} />;
      case 'FileText':
        return <FileText size={size} />;
      default:
        return <Mail size={size} />;
    }
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section id="home" className="pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="block">Hi, I'm</span>
              <span className="bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 bg-clip-text text-transparent">
                {heroData.name}
              </span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-gray-400 mb-6">
              {heroData.title}
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-lg">
              {heroData.description}
            </p>
            <div className="flex flex-wrap gap-4">
              {heroData.buttons.map((button, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(button.url.replace('#', ''))}
                  className={`px-6 py-3 ${
                    button.primary
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 transition-opacity'
                      : 'bg-gray-800 border border-gray-700 hover:bg-gray-700 transition-colors'
                  } rounded-lg font-medium`}
                >
                  {button.text}
                </button>
              ))}
            </div>
          </div>
          <div className="md:w-2/5">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-gray-800 mx-auto">
                <img
                  src={heroImage}
                  alt={heroData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
                {heroData.socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target={link.url.startsWith('http') ? "_blank" : undefined}
                    rel={link.url.startsWith('http') ? "noopener noreferrer" : undefined}
                    className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-colors"
                  >
                    {getIconComponent(link.platform)}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;