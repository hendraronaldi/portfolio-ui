import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, X, ZoomIn, PlayCircle } from 'lucide-react';
import skillsData from '../data/skills.json';

// Import skill images
import backendImage from '../assets/img/skills-backend.jpg';
import aiImage from '../assets/img/skills-ai.jpg';
import dataImage from '../assets/img/skills-data.jpg';
import cloudImage from '../assets/img/skills-cloud.jpg';
import leadershipImage from '../assets/img/skills-leadership.jpg';

const Skills: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [popupImage, setPopupImage] = useState<string>('');
  const [popupTitle, setPopupTitle] = useState<string>('');

  // Create skill slides with images
  const skillSlides = [
    {
      title: "Backend Development",
      description: "Building scalable microservices with Go, Python, and modern architectures",
      image: backendImage,
      skills: ["Go/Golang", "Python", "Microservices", "gRPC", "GraphQL"],
      color: "from-blue-600 to-purple-600"
    },
    {
      title: "AI & Machine Learning",
      description: "Developing intelligent systems with TensorFlow and deep learning",
      image: aiImage,
      skills: ["TensorFlow", "Deep Learning", "Computer Vision", "Object Detection", "Model Building"],
      color: "from-green-600 to-blue-600"
    },
    {
      title: "Data Engineering",
      description: "Creating robust data pipelines and analytics solutions",
      image: dataImage,
      skills: ["Data Pipelines", "BigQuery", "Data Analysis", "ETL", "Analytics"],
      color: "from-purple-600 to-pink-600"
    },
    {
      title: "Cloud & DevOps",
      description: "Deploying and scaling applications on modern cloud platforms",
      image: cloudImage,
      skills: ["AWS", "Docker", "Microservices", "Cloud Architecture", "DevOps"],
      color: "from-orange-600 to-red-600"
    },
    {
      title: "Leadership & Collaboration",
      description: "Leading remote teams and driving agile development practices",
      image: leadershipImage,
      skills: ["Team Leadership", "Agile Methodologies", "Remote Teamwork", "Communication", "Project Management"],
      color: "from-indigo-600 to-purple-600"
    }
  ];

  const totalSlides = skillSlides.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (showImagePopup && e.key === 'Escape') {
        closeImagePopup();
        return;
      }
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
  }, [isAutoPlaying, showImagePopup]);

  const openImagePopup = (image: string, title: string) => {
    setPopupImage(image);
    setPopupTitle(title);
    setShowImagePopup(true);
    setIsAutoPlaying(false);
  };

  const closeImagePopup = () => {
    setShowImagePopup(false);
    setPopupImage('');
    setPopupTitle('');
  };

  // Handle escape key and body scroll for popup
  useEffect(() => {
    if (showImagePopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showImagePopup]);

  // Handle escape key for popup
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showImagePopup) {
        closeImagePopup();
      }
    };

    window.addEventListener('keydown', handleEscapeKey);
    return () => window.removeEventListener('keydown', handleEscapeKey);
  }, [showImagePopup]);

  const currentSkillSlide = skillSlides[currentSlide];

  return (
    <section id="skills" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Expertise & Skills</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Explore my technical skills and expertise across different domains
          </p>
        </div>

        {/* Skills Slideshow */}
        <div className="relative max-w-6xl mx-auto mb-12">
          <div 
            className="relative bg-gray-900 rounded-xl overflow-hidden border border-gray-700 shadow-2xl"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Slide content */}
            <div className="flex flex-col lg:flex-row min-h-[500px]">
              {/* Skill image */}
              <div className="lg:w-1/2 h-64 lg:h-auto relative overflow-hidden group cursor-pointer">
                <img
                  src={currentSkillSlide.image}
                  alt={currentSkillSlide.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onClick={() => openImagePopup(currentSkillSlide.image, currentSkillSlide.title)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Zoom indicator */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-black/60 backdrop-blur-sm rounded-full p-3">
                    <ZoomIn size={24} className="text-white" />
                  </div>
                </div>
                
                {/* Slide indicator overlay */}
                <div className="absolute top-4 right-4">
                  <div className="flex items-center bg-black/60 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-white text-sm font-medium">
                      {currentSlide + 1} / {totalSlides}
                    </span>
                  </div>
                </div>
              </div>

              {/* Skill details */}
              <div className="lg:w-1/2 p-8 flex flex-col justify-between">
                <div>
                  <div className="mb-6">
                    <h3 className="text-3xl font-bold text-white mb-4">{currentSkillSlide.title}</h3>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      {currentSkillSlide.description}
                    </p>
                  </div>

                  {/* Key Skills */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wide">Key Technologies</h4>
                    <div className="flex flex-wrap gap-3">
                      {currentSkillSlide.skills.map((skill, index) => (
                        <span
                          key={index}
                          className={`px-4 py-2 bg-gradient-to-r ${currentSkillSlide.color} rounded-full text-sm text-white font-medium shadow-lg transform hover:scale-105 transition-all duration-300`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="pt-4 border-t border-gray-700">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Skill Area {currentSlide + 1} of {totalSlides}</span>
                    <span className="text-sm text-gray-400">{Math.round(((currentSlide + 1) / totalSlides) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r ${currentSkillSlide.color} h-2 rounded-full transition-all duration-500 ease-out`}
                      style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm"
              aria-label="Previous skill area"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm"
              aria-label="Next skill area"
            >
              <ChevronRight size={24} />
            </button>

            {/* Auto-play control */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="absolute top-4 left-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm"
              aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
            >
              {isAutoPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
          </div>

          {/* Slide indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {skillSlides.map((slide, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`group relative transition-all duration-300 ${
                  index === currentSlide
                    ? 'w-12 h-3'
                    : 'w-3 h-3 hover:w-4'
                }`}
                aria-label={`Go to ${slide.title}`}
              >
                <div className={`w-full h-full rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? `bg-gradient-to-r ${slide.color}`
                    : 'bg-gray-600 group-hover:bg-gray-500'
                }`}></div>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                  {slide.title}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* All Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.categories.map((category, index) => (
            <div 
              key={index} 
              className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300 transform hover:scale-105"
            >
              <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {category.title}
              </h3>
              <div className="space-y-2">
                {category.skills.slice(0, 5).map((skill, skillIndex) => (
                  <div key={skillIndex} className="flex items-center justify-between p-2 bg-gray-900 rounded hover:bg-gray-700 transition-colors">
                    <span className="text-gray-300 text-sm">{skill.name}</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                ))}
                {category.skills.length > 5 && (
                  <div className="text-gray-500 text-sm text-center pt-2">
                    +{category.skills.length - 5} more skills
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Keyboard shortcuts info */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Use ← → arrow keys to navigate • Space to pause/play • Hover to pause</p>
        </div>
      </div>

      {/* Image Popup */}
      {showImagePopup && (
        <div 
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={closeImagePopup}
        >
          <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
            <img
              src={popupImage}
              alt={popupTitle}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={closeImagePopup}
              className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
            >
              <X size={24} />
            </button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2">
              <h3 className="text-white font-semibold text-center">{popupTitle}</h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Skills;