import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Eye, List, Play, Pause } from 'lucide-react';
import skillsData from '../data/skills.json';
import skillsImagesData from '../data/skills-images.json';

interface Skill {
  name: string;
  level: number;
  category: string;
}

interface SkillImage {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  technologies: string[];
  category: string;
}

interface SkillsConfig {
  autoAdvanceInterval: number;
  transitionDuration: number;
  pauseOnHover: boolean;
  showDots: boolean;
  showArrows: boolean;
  lazyLoading: boolean;
}

const SkillsSlideshow: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  
  const { skillImages, configuration: config }: { skillImages: SkillImage[], config: SkillsConfig } = skillsImagesData;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % skillImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + skillImages.length) % skillImages.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying || skillImages.length === 0) return;

    const interval = setInterval(nextSlide, config.autoAdvanceInterval);
    return () => clearInterval(interval);
  }, [isAutoPlaying, config.autoAdvanceInterval]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setIsAutoPlaying(false);
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        setIsAutoPlaying(false);
        nextSlide();
      } else if (e.key === ' ') {
        e.preventDefault();
        toggleAutoPlay();
      } else if (e.key === 'Escape') {
        setIsAutoPlaying(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isAutoPlaying]);

  // Lazy loading
  useEffect(() => {
    if (!config.lazyLoading) return;

    const imagesToLoad = [
      currentSlide,
      (currentSlide + 1) % skillImages.length,
      (currentSlide - 1 + skillImages.length) % skillImages.length
    ];

    imagesToLoad.forEach(index => {
      if (!loadedImages.has(index)) {
        const img = new Image();
        img.onload = () => {
          setLoadedImages(prev => new Set([...prev, index]));
        };
        img.src = skillImages[index].image;
      }
    });
  }, [currentSlide, skillImages, loadedImages, config.lazyLoading]);

  const getCategoryColor = (category: string) => {
    const colors = {
      frontend: 'from-blue-500 to-cyan-500',
      backend: 'from-green-500 to-emerald-500',
      ai: 'from-purple-500 to-pink-500',
      data: 'from-orange-500 to-red-500',
      cloud: 'from-indigo-500 to-blue-500',
      database: 'from-yellow-500 to-orange-500',
      api: 'from-teal-500 to-green-500'
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-blue-500';
  };

  if (skillImages.length === 0) {
    return (
      <div className="text-center text-gray-400 py-8">
        <p>No skills images available</p>
      </div>
    );
  }

  return (
    <div 
      className="skills-slideshow-container"
      onMouseEnter={() => config.pauseOnHover && setIsAutoPlaying(false)}
      onMouseLeave={() => config.pauseOnHover && setIsAutoPlaying(true)}
    >
      {/* Main Slideshow */}
      <div className="skills-slideshow">
        {skillImages.map((skill, index) => (
          <div
            key={skill.id}
            className={`skills-slide ${index === currentSlide ? 'active' : ''}`}
            style={{
              transform: `translateX(${(index - currentSlide) * 100}%)`,
              transition: `transform ${config.transitionDuration}ms ease-in-out`
            }}
          >
            <div className="skills-slide-content">
              <img 
                src={config.lazyLoading && !loadedImages.has(index) ? 
                  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+' : 
                  skill.image
                }
                alt={skill.alt}
                className="skills-slide-image"
                loading={config.lazyLoading ? 'lazy' : 'eager'}
              />
              <div className={`skills-slide-overlay bg-gradient-to-t ${getCategoryColor(skill.category)}`}>
                <div className="skills-slide-info">
                  <h3 className="skills-slide-title">{skill.title}</h3>
                  <p className="skills-slide-description">{skill.description}</p>
                  <div className="skills-slide-technologies">
                    {skill.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="skills-tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      {config.showArrows && (
        <div className="skills-navigation">
          <button 
            onClick={prevSlide} 
            className="skills-nav-button skills-nav-prev"
            aria-label="Previous skill"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={nextSlide} 
            className="skills-nav-button skills-nav-next"
            aria-label="Next skill"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}

      {/* Slide Controls */}
      <div className="skills-controls">
        <div className="skills-counter">
          {currentSlide + 1} / {skillImages.length}
        </div>
        
        <button 
          onClick={toggleAutoPlay}
          className="skills-play-button"
          aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
        >
          {isAutoPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
      </div>

      {/* Slide Indicators */}
      {config.showDots && (
        <div className="skills-indicators">
          {skillImages.map((skill, index) => (
            <button
              key={skill.id}
              onClick={() => goToSlide(index)}
              className={`skills-indicator ${index === currentSlide ? 'active' : ''}`}
              aria-label={`Go to ${skill.title}`}
              title={skill.title}
            />
          ))}
        </div>
      )}

      {/* Thumbnail Navigation */}
      <div className="skills-thumbnails">
        {skillImages.map((skill, index) => (
          <button
            key={skill.id}
            onClick={() => goToSlide(index)}
            className={`skills-thumbnail ${index === currentSlide ? 'active' : ''}`}
            aria-label={`View ${skill.title}`}
          >
            <img 
              src={skill.image} 
              alt={skill.alt}
              className="skills-thumbnail-image"
            />
            <div className="skills-thumbnail-overlay">
              <span className="skills-thumbnail-title">{skill.title}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

const SkillsList: React.FC = () => {
  const skills: Skill[] = skillsData.skills;
  
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const getSkillColor = (level: number) => {
    if (level >= 90) return 'bg-green-500';
    if (level >= 75) return 'bg-blue-500';
    if (level >= 60) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  return (
    <div className="skills-list">
      {Object.entries(groupedSkills).map(([category, categorySkills]) => (
        <div key={category} className="skills-category">
          <h3 className="skills-category-title">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </h3>
          <div className="skills-grid">
            {categorySkills.map((skill) => (
              <div key={skill.name} className="skill-item">
                <div className="skill-info">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-level">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <div 
                    className={`skill-progress ${getSkillColor(skill.level)}`}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const Skills: React.FC = () => {
  const [viewMode, setViewMode] = useState<'visual' | 'list'>('visual');
  const containerRef = useRef<HTMLDivElement>(null);

  const handleModeChange = (mode: 'visual' | 'list') => {
    setViewMode(mode);
  };

  return (
    <section id="skills" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Technical Skills
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            A comprehensive overview of my technical expertise and the tools I use to build amazing digital experiences.
          </p>
          
          {/* Mode Toggle Menu */}
          <div className="skills-mode-toggle">
            <button
              onClick={() => handleModeChange('visual')}
              className={`skills-mode-button ${viewMode === 'visual' ? 'active' : ''}`}
              aria-label="Visual mode"
            >
              <Eye size={20} />
              <span>Visual</span>
            </button>
            <button
              onClick={() => handleModeChange('list')}
              className={`skills-mode-button ${viewMode === 'list' ? 'active' : ''}`}
              aria-label="List mode"
            >
              <List size={20} />
              <span>List</span>
            </button>
          </div>
        </div>

        <div ref={containerRef} className="max-w-6xl mx-auto">
          <div className={`skills-content ${viewMode}`}>
            {viewMode === 'visual' ? <SkillsSlideshow /> : <SkillsList />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;