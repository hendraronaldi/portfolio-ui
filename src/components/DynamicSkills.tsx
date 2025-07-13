import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import skillsVizConfig from '../data/skills-viz.json';

interface SkillItem {
  name: string;
  category: string;
  icon: string;
  level: number;
  color: string;
  position: { x: number; y: number };
  size: string;
  animations: {
    entrance: {
      type: string;
      delay: number;
      duration: number;
    };
    hover: {
      scale: number;
      glow?: boolean;
      rotate?: number;
      bounce?: boolean;
      duration: number;
    };
    idle: {
      type: string;
      amplitude?: number;
      intensity?: number;
      speed?: number;
      direction?: string;
      duration: number;
    };
  };
  tooltip: {
    enabled: boolean;
    content: string;
    position: string;
    delay: number;
  };
}

interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  color: {
    primary: string;
    secondary: string;
    accent: string;
  };
  layout: any;
}

const DynamicSkills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('backend');
  const [visibleSkills, setVisibleSkills] = useState<Set<string>>(new Set());
  const [animationPhase, setAnimationPhase] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const config = skillsVizConfig;
  const skillItems: SkillItem[] = config.skillItems;
  const categories: SkillCategory[] = config.skillCategories;

  // Animation cycle for dynamic visualizations
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    if (!config.skillsSection.animations.scroll.enabled) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const skillName = entry.target.getAttribute('data-skill');
            if (skillName) {
              setTimeout(() => {
                setVisibleSkills(prev => new Set([...prev, skillName]));
              }, parseInt(entry.target.getAttribute('data-delay') || '0'));
            }
          }
        });
      },
      {
        threshold: config.skillsSection.animations.scroll.threshold,
        rootMargin: config.skillsSection.animations.scroll.rootMargin
      }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [config.skillsSection.animations.scroll]);

  // Apply responsive styles based on config
  const getResponsiveStyles = () => {
    const { mobile, tablet, desktop } = config.responsiveBreakpoints;
    return {
      '--mobile-columns': mobile.gridColumns,
      '--tablet-columns': tablet.gridColumns,
      '--desktop-columns': desktop.gridColumns,
      '--mobile-spacing': mobile.spacing,
      '--tablet-spacing': tablet.spacing,
      '--desktop-spacing': desktop.spacing,
    } as React.CSSProperties;
  };

  // Generate CSS custom properties from config
  const getCSSVariables = (category: SkillCategory) => {
    return {
      '--primary-color': category.color.primary,
      '--secondary-color': category.color.secondary,
      '--accent-color': category.color.accent,
    } as React.CSSProperties;
  };

  // Render Backend Architecture
  const renderBackendArchitecture = (category: SkillCategory) => {
    const layout = category.layout;
    
    return (
      <div className="relative w-full h-96 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl p-8 overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border border-blue-500/20"></div>
            ))}
          </div>
        </div>

        {/* Central Cloud Platform */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div 
            className="relative rounded-lg p-4 shadow-lg"
            style={{ 
              background: `linear-gradient(135deg, ${category.color.secondary}, ${category.color.primary})` 
            }}
          >
            <div className="text-4xl text-center mb-2">{layout.centerElement.icon}</div>
            <div className="text-white text-sm font-semibold text-center">{layout.centerElement.label}</div>
            <div className="text-blue-200 text-xs text-center">Microservices Hub</div>
            
            {/* Pulsing animation */}
            <div className="absolute inset-0 bg-blue-400 rounded-lg opacity-20 animate-ping"></div>
          </div>
        </div>

        {/* Microservices Satellites */}
        {layout.satellites.map((satellite: any, index: number) => (
          <div key={satellite.label} className={`absolute ${getPositionClass(satellite.position)}`}>
            <div 
              className="rounded-lg p-3 shadow-lg transform hover:scale-110 transition-all duration-300"
              style={{ background: `linear-gradient(135deg, ${satellite.color}, ${satellite.color}dd)` }}
            >
              <div className="text-2xl text-center mb-1">{satellite.icon}</div>
              <div className="text-white text-xs font-medium text-center">{satellite.label}</div>
            </div>
            
            {/* Connection lines with animation */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <line
                x1="50%"
                y1="50%"
                x2="50%"
                y2="200%"
                stroke={category.color.accent}
                strokeWidth="2"
                className={`${animationPhase === index ? 'opacity-100' : 'opacity-30'} transition-opacity duration-500`}
                strokeDasharray="5,5"
              >
                <animate attributeName="stroke-dashoffset" values="0;10" dur="1s" repeatCount="indefinite" />
              </line>
            </svg>
          </div>
        ))}

        {/* Database Clusters */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-4">
            {layout.databases.map((db: any, index: number) => (
              <div 
                key={db.label}
                className="rounded-lg p-3 shadow-lg"
                style={{ background: `linear-gradient(135deg, ${db.color}, ${db.color}dd)` }}
              >
                <div className="text-xl text-center mb-1">{db.icon}</div>
                <div className="text-white text-xs text-center">{db.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Render Data Pipeline
  const renderDataPipeline = (category: SkillCategory) => {
    const layout = category.layout;
    
    return (
      <div className="relative w-full h-96 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl p-6 overflow-hidden">
        {/* Pipeline Flow */}
        <div className="flex items-center justify-between h-full">
          {layout.stages.map((stage: any, index: number) => (
            <div key={stage.label} className="flex flex-col items-center space-y-2">
              <div 
                className="rounded-lg p-3"
                style={{ background: `linear-gradient(135deg, ${stage.color}, ${stage.color}dd)` }}
              >
                <div className="text-2xl text-center">{stage.icon}</div>
              </div>
              <div className="text-white text-xs text-center">{stage.label}</div>
            </div>
          ))}
        </div>

        {/* Animated Data Flow */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <path
            d="M 80 200 Q 200 200 320 200 Q 440 200 560 200 Q 680 200 800 200"
            stroke={category.color.accent}
            strokeWidth="3"
            fill="none"
            strokeDasharray="10,5"
          >
            <animate attributeName="stroke-dashoffset" values="0;15" dur="2s" repeatCount="indefinite" />
          </path>
        </svg>
      </div>
    );
  };

  // Render Soft Skills Ecosystem
  const renderSoftSkillsEcosystem = (category: SkillCategory) => {
    const layout = category.layout;
    
    return (
      <div className="relative w-full h-96 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl p-8 overflow-hidden">
        {/* Central Hub */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div 
            className="relative rounded-full p-6 shadow-lg"
            style={{ background: `linear-gradient(135deg, ${category.color.primary}, ${category.color.secondary})` }}
          >
            <div className="text-4xl text-center">{layout.centerElement.icon}</div>
            <div className="absolute inset-0 bg-green-400 rounded-full opacity-20 animate-pulse"></div>
          </div>
          <div className="text-white text-sm font-semibold text-center mt-2">{layout.centerElement.label}</div>
        </div>

        {/* Orbiting Skills */}
        {layout.orbits[0].elements.map((skill: any, index: number) => (
          <div 
            key={skill.label} 
            className="absolute"
            style={{
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) rotate(${skill.angle + animationPhase * 90}deg) translateX(120px) rotate(-${skill.angle + animationPhase * 90}deg)`,
              transition: 'transform 2s ease-in-out',
            }}
          >
            <div 
              className="rounded-lg p-4 shadow-lg transform hover:scale-110 transition-all duration-300"
              style={{ background: `linear-gradient(135deg, ${skill.color}, ${skill.color}dd)` }}
            >
              <div className="text-2xl text-center mb-2">{skill.icon}</div>
              <div className="text-white text-xs font-medium text-center">{skill.label}</div>
            </div>
          </div>
        ))}

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {Array.from({ length: layout.particles.count }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-60"
              style={{
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) rotate(${i * 45 + animationPhase * 90}deg) translateX(${80 + Math.sin(animationPhase) * 20}px)`,
                transition: 'transform 2s ease-in-out',
              }}
            ></div>
          ))}
        </div>
      </div>
    );
  };

  // Helper function to get position classes
  const getPositionClass = (position: string) => {
    const positions: { [key: string]: string } = {
      'top-left': 'top-20 left-20',
      'top-right': 'top-20 right-20',
      'bottom-left': 'bottom-20 left-20',
      'bottom-right': 'bottom-20 right-20',
      'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
      'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
    };
    return positions[position] || '';
  };

  // Render visualization based on category
  const renderVisualization = (category: SkillCategory) => {
    switch (category.layout.type) {
      case 'architecture':
        return renderBackendArchitecture(category);
      case 'pipeline':
        return renderDataPipeline(category);
      case 'ecosystem':
        return renderSoftSkillsEcosystem(category);
      default:
        return null;
    }
  };

  const activeCategory_obj = categories.find(cat => cat.id === activeCategory);

  return (
    <section 
      id="skills" 
      className="py-16"
      style={getResponsiveStyles()}
      ref={containerRef}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Dynamic Skills Visualization</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
        </div>

        {/* Category Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-800 rounded-lg p-1 border border-gray-700">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center px-6 py-3 rounded-lg transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
                style={
                  activeCategory === category.id
                    ? { background: `linear-gradient(135deg, ${category.color.primary}, ${category.color.secondary})` }
                    : {}
                }
              >
                <span className="text-xl mr-2">{category.icon}</span>
                <span className="font-medium">{category.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Visualization */}
        {activeCategory_obj && (
          <div 
            className="mb-12"
            style={getCSSVariables(activeCategory_obj)}
          >
            <div className="transition-all duration-500 ease-in-out">
              {renderVisualization(activeCategory_obj)}
            </div>
          </div>
        )}

        {/* Individual Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {skillItems.map((skill, index) => (
            <div
              key={skill.name}
              data-skill={skill.name}
              data-delay={skill.animations.entrance.delay}
              className={`skill-item relative bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300 transform ${
                visibleSkills.has(skill.name) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{
                animationDelay: `${skill.animations.entrance.delay}ms`,
                animationDuration: `${skill.animations.entrance.duration}ms`,
                '--skill-color': skill.color,
              } as React.CSSProperties}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
              ref={(el) => {
                if (el && observerRef.current) {
                  observerRef.current.observe(el);
                }
              }}
            >
              {/* Skill Icon */}
              <div 
                className={`text-4xl mb-3 text-center transition-all duration-300 ${
                  hoveredSkill === skill.name ? 'transform scale-110' : ''
                }`}
                style={{
                  filter: hoveredSkill === skill.name && skill.animations.hover.glow ? 'drop-shadow(0 0 10px currentColor)' : 'none',
                  transform: hoveredSkill === skill.name ? `scale(${skill.animations.hover.scale}) rotate(${skill.animations.hover.rotate || 0}deg)` : 'scale(1)',
                }}
              >
                {skill.icon}
              </div>

              {/* Skill Name */}
              <h3 className="text-lg font-semibold mb-2 text-center text-white">
                {skill.name}
              </h3>

              {/* Skill Level Bar */}
              <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
                <div 
                  className="h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: visibleSkills.has(skill.name) ? `${skill.level}%` : '0%',
                    backgroundColor: skill.color,
                  }}
                ></div>
              </div>

              {/* Skill Category */}
              <div className="text-center">
                <span 
                  className="px-2 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: `${skill.color}20`,
                    color: skill.color,
                  }}
                >
                  {skill.category}
                </span>
              </div>

              {/* Tooltip */}
              {skill.tooltip.enabled && hoveredSkill === skill.name && (
                <div 
                  className={`absolute z-10 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg max-w-xs ${
                    skill.tooltip.position === 'top' ? 'bottom-full mb-2' :
                    skill.tooltip.position === 'bottom' ? 'top-full mt-2' :
                    skill.tooltip.position === 'left' ? 'right-full mr-2' :
                    'left-full ml-2'
                  }`}
                  style={{
                    left: skill.tooltip.position === 'top' || skill.tooltip.position === 'bottom' ? '50%' : 'auto',
                    transform: skill.tooltip.position === 'top' || skill.tooltip.position === 'bottom' ? 'translateX(-50%)' : 'none',
                    top: skill.tooltip.position === 'left' || skill.tooltip.position === 'right' ? '50%' : 'auto',
                    transform: skill.tooltip.position === 'left' || skill.tooltip.position === 'right' ? 'translateY(-50%)' : 
                              skill.tooltip.position === 'top' || skill.tooltip.position === 'bottom' ? 'translateX(-50%)' : 'none',
                  }}
                >
                  {skill.tooltip.content}
                  <div 
                    className={`absolute w-2 h-2 bg-gray-900 transform rotate-45 ${
                      skill.tooltip.position === 'top' ? 'top-full -mt-1 left-1/2 -ml-1' :
                      skill.tooltip.position === 'bottom' ? 'bottom-full -mb-1 left-1/2 -ml-1' :
                      skill.tooltip.position === 'left' ? 'left-full -ml-1 top-1/2 -mt-1' :
                      'right-full -mr-1 top-1/2 -mt-1'
                    }`}
                  ></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .skill-item {
          animation-fill-mode: both;
        }
        
        @media (max-width: 768px) {
          .grid {
            grid-template-columns: repeat(var(--mobile-columns), 1fr);
            gap: var(--mobile-spacing);
          }
        }
        
        @media (min-width: 769px) and (max-width: 1024px) {
          .grid {
            grid-template-columns: repeat(var(--tablet-columns), 1fr);
            gap: var(--tablet-spacing);
          }
        }
        
        @media (min-width: 1025px) {
          .grid {
            grid-template-columns: repeat(var(--desktop-columns), 1fr);
            gap: var(--desktop-spacing);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default DynamicSkills;