import React, { useState, useEffect, useCallback } from 'react';
import { Github, ExternalLink, ChevronLeft, ChevronRight, Play, Pause, Briefcase } from 'lucide-react';
import projectsData from '../data/projects.json';

const Projects: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const totalSlides = projectsData.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsAutoPlaying(!isAutoPlaying);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [nextSlide, prevSlide, isAutoPlaying]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress':
        return 'bg-blue-500';
      case 'Done':
        return 'bg-green-500';
      case 'On Hold':
        return 'bg-yellow-500';
      case 'Delegated':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const currentProject = projectsData[currentSlide];

  return (
    <section id="projects" className="py-16 bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Projects</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Main slideshow container */}
          <div 
            className="relative bg-gray-900 rounded-lg overflow-hidden border border-gray-700 shadow-2xl"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Project content */}
            <div className="flex flex-col md:flex-row min-h-[500px]">
              {/* Project image */}
              <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                <img
                  src={currentProject.image}
                  alt={currentProject.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

              {/* Project details */}
              <div className="md:w-1/2 p-8 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-2xl font-bold text-white">{currentProject.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(currentProject.status)} text-white`}>
                        {currentProject.status}
                      </span>
                    </div>
                    {currentProject.type === 'work' && (
                      <div className="flex items-center text-gray-400">
                        <Briefcase size={16} className="mr-1" />
                        <span className="text-sm">Work</span>
                      </div>
                    )}
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {currentProject.description}
                  </p>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {currentProject.technologies.slice(0, 6).map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-800 border border-gray-600 rounded-full text-sm text-gray-300 hover:border-purple-500 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                      {currentProject.technologies.length > 6 && (
                        <span className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-400">
                          +{currentProject.technologies.length - 6} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Project links and info */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <div className="flex space-x-4">
                    {(currentProject.type === 'personal' || currentProject.type === 'bootcamp') && currentProject.github && (
                      <a
                        href={currentProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <Github size={18} className="mr-2" />
                        <span>Code</span>
                      </a>
                    )}
                    {currentProject.live && (
                      <a
                        href={currentProject.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                      >
                        <ExternalLink size={18} className="mr-2" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                  
                  <div className="text-right">
                    {currentProject.companyName && (
                      <div className="flex items-center text-gray-400 mb-1">
                        <img
                          src={currentProject.companyLogo}
                          alt={currentProject.companyName}
                          className="w-5 h-5 rounded-full mr-2"
                        />
                        <span className="text-sm">{currentProject.companyName}</span>
                      </div>
                    )}
                    <span className="text-sm text-gray-500">{currentProject.period}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
              aria-label="Previous project"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
              aria-label="Next project"
            >
              <ChevronRight size={24} />
            </button>

            {/* Auto-play control */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
              aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
            >
              {isAutoPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
          </div>

          {/* Slide indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {projectsData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-purple-500 scale-125'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Slide counter */}
          <div className="text-center mt-4 text-gray-400 text-sm">
            {currentSlide + 1} of {totalSlides}
          </div>
        </div>

        {/* View all projects link */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/hendraronaldi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors"
          >
            <Github size={20} className="mr-2" />
            <span>View All Projects on GitHub</span>
          </a>
        </div>

        {/* Keyboard shortcuts info */}
        <div className="text-center mt-6 text-gray-500 text-sm">
          <p>Use ← → arrow keys to navigate • Space to pause/play • Hover to pause</p>
        </div>
      </div>
    </section>
  );
};

export default Projects;