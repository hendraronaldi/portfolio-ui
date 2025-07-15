import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Server, Database, Cloud, Cpu, Network, Users, Target, MessageSquare, GitBranch, Zap } from 'lucide-react';
import skillsData from '../data/skills.json';
import skillsVizConfig from '../data/skills-viz.json';

const Skills: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'backend' | 'data' | 'soft' | 'network'>('backend');
  const [animationPhase, setAnimationPhase] = useState(0);

  // Add ref for skills grid
  const skillsGridRef = React.useRef<HTMLDivElement>(null);

  // Animation cycle for data flow
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Helper function to get skill position in grid
  const getSkillPosition = (skillName: string, containerRef: React.RefObject<HTMLDivElement>) => {
    if (!containerRef.current) return null;
    
    const skillElement = containerRef.current.querySelector(`[data-skill="${skillName}"]`) as HTMLElement;
    if (!skillElement) return null;
    
    const skillRect = skillElement.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    
    return {
      'top-left': 'top-16 left-16',
      'top-right': 'top-16 right-16',
      'bottom-left': 'bottom-16 left-16',
      'bottom-right': 'bottom-16 right-16',
      x: skillRect.left - containerRect.left + skillRect.width / 2,
      y: skillRect.top - containerRect.top + skillRect.height / 2
    };
  };

  // Render connection lines between skills
  const renderSkillConnections = (containerRef: React.RefObject<HTMLDivElement>) => {
    if (!skillsVizConfig.skillConnections?.enabled || !containerRef.current) return null;
    
    const connections = skillsVizConfig.skillConnections.connections;
    
    return (
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{ overflow: 'visible' }}
      >
        <defs>
          {connections.map((connection, index) => (
            <React.Fragment key={`defs-${index}`}>
              {connection.animation?.enabled && connection.animation.type === 'flow' && (
                <linearGradient id={`flowGradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="50%" stopColor={connection.style.color} />
                  <stop offset="100%" stopColor="transparent" />
                  <animateTransform
                    attributeName="gradientTransform"
                    type="translate"
                    values="-100 0;100 0;-100 0"
                    dur={`${connection.animation.duration}ms`}
                    repeatCount="indefinite"
                  />
                </linearGradient>
              )}
              {connection.style.pattern === 'dashed' && (
                <pattern id={`dashPattern-${index}`} patternUnits="userSpaceOnUse" width="10" height="2">
                  <rect width="5" height="2" fill={connection.style.color} />
                  <rect x="5" width="5" height="2" fill="transparent" />
                </pattern>
              )}
              {connection.style.pattern === 'dotted' && (
                <pattern id={`dotPattern-${index}`} patternUnits="userSpaceOnUse" width="8" height="2">
                  <circle cx="2" cy="1" r="1" fill={connection.style.color} />
                </pattern>
              )}
            </React.Fragment>
          ))}
        </defs>
        
        {connections.map((connection, index) => {
          const fromPos = getSkillPosition(connection.from, containerRef);
          const toPos = getSkillPosition(connection.to, containerRef);
          
          if (!fromPos || !toPos) return null;
          
          const getStroke = () => {
            if (connection.animation?.enabled && connection.animation.type === 'flow') {
              return `url(#flowGradient-${index})`;
            }
            if (connection.style.pattern === 'dashed') {
              return `url(#dashPattern-${index})`;
            }
            if (connection.style.pattern === 'dotted') {
              return `url(#dotPattern-${index})`;
            }
            return connection.style.color;
          };
          
          return (
            <g key={`connection-${index}`} className="skill-connection">
              <line
                x1={fromPos.x}
                y1={fromPos.y}
                x2={toPos.x}
                y2={toPos.y}
                stroke={getStroke()}
                strokeWidth={connection.style.width}
                opacity={connection.style.opacity}
                className={`transition-all duration-300 ${
                  connection.animation?.enabled && connection.animation.type === 'pulse' 
                    ? 'animate-pulse' 
                    : ''
                }`}
              />
              
              {/* Connection hover area for interactivity */}
              <line
                x1={fromPos.x}
                y1={fromPos.y}
                x2={toPos.x}
                y2={toPos.y}
                stroke="transparent"
                strokeWidth={Math.max(connection.style.width * 3, 10)}
                className="pointer-events-auto cursor-pointer hover:stroke-white hover:stroke-opacity-20"
                title={`${connection.from} → ${connection.to} (${skillsVizConfig.skillConnections.connectionTypes[connection.type]?.label})`}
              />
            </g>
          );
        })}
      </svg>
    );
  };

  const BackendArchitecture = () => (
    <div className="relative w-full h-96 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl p-8 overflow-hidden">
      {/* SVG for connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
        <defs>
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="transparent" />
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              values="-100 0;100 0;-100 0"
              dur="3s"
              repeatCount="indefinite"
            />
          </linearGradient>
          <pattern id="dashPattern" patternUnits="userSpaceOnUse" width="10" height="2">
            <rect width="5" height="2" fill="#ffffff" />
            <rect x="5" width="5" height="2" fill="transparent" />
          </pattern>
        </defs>
        
        {/* GraphQL to AWS Cloud */}
        <path
          d="M 120 120 Q 200 150 400 200"
          stroke="url(#flowGradient)"
          strokeWidth="2"
          fill="none"
          opacity="0.8"
        />
        
        {/* Go API to AWS Cloud */}
        <path
          d="M 680 120 Q 600 150 400 200"
          stroke="url(#flowGradient)"
          strokeWidth="2"
          fill="none"
          opacity="0.8"
        />
        
        {/* Python ML to AWS Cloud */}
        <path
          d="M 120 280 Q 200 250 400 200"
          stroke="url(#flowGradient)"
          strokeWidth="2"
          fill="none"
          opacity="0.8"
        />
        
        {/* Ruby Rails to AWS Cloud */}
        <path
          d="M 680 280 Q 600 250 400 200"
          stroke="url(#flowGradient)"
          strokeWidth="2"
          fill="none"
          opacity="0.8"
        />
        
        {/* MySQL to AWS Cloud */}
        <path
          d="M 320 50 Q 360 100 400 200"
          stroke="url(#dashPattern)"
          strokeWidth="2"
          fill="none"
          opacity="0.6"
        />
        
        {/* MongoDB to AWS Cloud */}
        <path
          d="M 480 50 Q 440 100 400 200"
          stroke="url(#dashPattern)"
          strokeWidth="2"
          fill="none"
          opacity="0.6"
        />
        
        {/* AWS Cloud to Load Balancer */}
        <line
          x1="400"
          y1="240"
          x2="400"
          y2="320"
          stroke="#ffffff"
          strokeWidth="2"
          opacity="0.7"
          className="animate-pulse"
        />
      </svg>

      {/* Background grid */}
      <div className="absolute inset-0 opacity-10 z-0">
        <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="border border-blue-500/20"></div>
          ))}
        </div>
      </div>

      {/* Central Cloud Platform */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-4 shadow-lg">
          <Cloud size={32} className="text-white mx-auto mb-2" />
          <div className="text-white text-sm font-semibold text-center">AWS Cloud</div>
          <div className="text-blue-200 text-xs text-center">Microservices Hub</div>
          
          {/* Pulsing animation */}
          <div className="absolute inset-0 bg-blue-400 rounded-lg opacity-20 animate-ping"></div>
        </div>
      </div>

      {/* Microservices Containers */}
      {[
        { name: 'GraphQL', pos: 'top-20 left-20', color: 'from-pink-500 to-rose-500', icon: Network },
        { name: 'Go API', pos: 'top-20 right-20', color: 'from-cyan-500 to-blue-500', icon: Zap },
        { name: 'Python ML', pos: 'bottom-20 left-20', color: 'from-green-500 to-emerald-500', icon: Cpu },
        { name: 'Ruby Rails', pos: 'bottom-20 right-20', color: 'from-red-500 to-pink-500', icon: Server },
      ].map((service, index) => (
        <div key={service.name} className={`absolute ${service.pos} z-20`}>
          <div className={`bg-gradient-to-r ${service.color} rounded-lg p-3 shadow-lg transform hover:scale-110 transition-all duration-300`}>
            <service.icon size={24} className="text-white mx-auto mb-1" />
            <div className="text-white text-xs font-medium text-center">{service.name}</div>
          </div>
        </div>
      ))}

      {/* Database Clusters */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-4">
          <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg p-3 shadow-lg">
            <Database size={20} className="text-white mx-auto mb-1" />
            <div className="text-white text-xs text-center">MySQL</div>
          </div>
          <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-lg p-3 shadow-lg">
            <Database size={20} className="text-white mx-auto mb-1" />
            <div className="text-white text-xs text-center">MongoDB</div>
          </div>
        </div>
      </div>

      {/* Load Balancer */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg p-3 shadow-lg">
          <Network size={20} className="text-white mx-auto mb-1" />
          <div className="text-white text-xs text-center">Load Balancer</div>
        </div>
      </div>
    </div>
  );

  const DataPipeline = () => (
    <div className="relative w-full h-96 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl p-6 overflow-hidden">
      {/* SVG for pipeline connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
        <defs>
          <linearGradient id="pipelineFlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="transparent" />
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              values="-100 0;100 0;-100 0"
              dur="2.5s"
              repeatCount="indefinite"
            />
          </linearGradient>
        </defs>
        
        {/* Pipeline flow connections */}
        <path
          d="M 120 200 L 240 200"
          stroke="url(#pipelineFlow)"
          strokeWidth="3"
          opacity="0.8"
        />
        <path
          d="M 280 200 L 400 200"
          stroke="url(#pipelineFlow)"
          strokeWidth="3"
          opacity="0.8"
        />
        <path
          d="M 440 200 L 560 200"
          stroke="url(#pipelineFlow)"
          strokeWidth="3"
          opacity="0.8"
        />
        <path
          d="M 600 200 L 720 200"
          stroke="url(#pipelineFlow)"
          strokeWidth="3"
          opacity="0.8"
        />
      </svg>

      {/* Pipeline Flow */}
      <div className="flex items-center justify-between h-full z-20 relative">
        {/* Source Systems */}
        <div className="flex flex-col space-y-4">
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg p-3 mb-2">
              <Database size={24} className="text-white mx-auto" />
            </div>
            <div className="text-white text-xs">Sources</div>
          </div>
        </div>

        {/* ETL Process */}
        <div className="flex flex-col items-center space-y-2">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-3">
            <Cpu size={24} className="text-white" />
          </div>
          <div className="text-white text-xs text-center">Dataflow<br />ETL</div>
        </div>

        {/* dbt Transformations */}
        <div className="flex flex-col items-center space-y-2">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-3">
            <GitBranch size={24} className="text-white" />
          </div>
          <div className="text-white text-xs text-center">dbt<br />Transform</div>
        </div>

        {/* BigQuery */}
        <div className="flex flex-col items-center space-y-2">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg p-3">
            <Server size={24} className="text-white" />
          </div>
          <div className="text-white text-xs text-center">BigQuery<br />Warehouse</div>
        </div>

        {/* Outputs */}
        <div className="flex flex-col space-y-4">
          <div className="text-center">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg p-3 mb-2">
              <Target size={24} className="text-white mx-auto" />
            </div>
            <div className="text-white text-xs">Analytics</div>
          </div>
        </div>
      </div>
    </div>
  );

  const SoftSkillsEcosystem = () => (
    <div className="relative w-full h-96 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl p-8 overflow-hidden">
      {/* SVG for soft skills connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
        <defs>
          <radialGradient id="pulseGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8">
              <animate attributeName="stop-opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Leadership to Team Hub */}
        <line
          x1="400"
          y1="80"
          x2="400"
          y2="180"
          stroke="#ffffff"
          strokeWidth="2"
          opacity="0.7"
          className="animate-pulse"
        />
        
        {/* Communication to Team Hub */}
        <line
          x1="120"
          y1="200"
          x2="360"
          y2="200"
          stroke="#ffffff"
          strokeWidth="2"
          opacity="0.7"
          className="animate-pulse"
        />
        
        {/* Agile to Team Hub */}
        <line
          x1="680"
          y1="200"
          x2="440"
          y2="200"
          stroke="#ffffff"
          strokeWidth="2"
          opacity="0.7"
          className="animate-pulse"
        />
        
        {/* Remote Work to Team Hub */}
        <line
          x1="400"
          y1="320"
          x2="400"
          y2="220"
          stroke="#ffffff"
          strokeWidth="2"
          opacity="0.7"
          className="animate-pulse"
        />
      </svg>

      {/* Central Collaboration Hub */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="relative bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-6 shadow-lg">
          <Users size={32} className="text-white" />
          <div className="absolute inset-0 bg-green-400 rounded-full opacity-20 animate-pulse"></div>
        </div>
        <div className="text-white text-sm font-semibold text-center mt-2">Team Hub</div>
      </div>

      {/* Surrounding Skills */}
      {[
        { name: 'Leadership', pos: 'top-16 left-1/2 transform -translate-x-1/2', icon: Target, color: 'from-purple-500 to-indigo-500' },
        { name: 'Communication', pos: 'top-1/2 left-16 transform -translate-y-1/2', icon: MessageSquare, color: 'from-blue-500 to-cyan-500' },
        { name: 'Agile', pos: 'top-1/2 right-16 transform -translate-y-1/2', icon: Zap, color: 'from-orange-500 to-red-500' },
        { name: 'Remote Work', pos: 'bottom-16 left-1/2 transform -translate-x-1/2', icon: Network, color: 'from-pink-500 to-rose-500' }
      ].map((skill, index) => (
        <div key={skill.name} className={`absolute ${skill.pos} z-20`}>
          <div className={`bg-gradient-to-r ${skill.color} rounded-lg p-4 shadow-lg transform hover:scale-110 transition-all duration-300`}>
            <skill.icon size={24} className="text-white mx-auto mb-2" />
            <div className="text-white text-xs font-medium text-center">{skill.name}</div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section id="skills" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Expertise & Skills</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
        </div>

        {/* Section Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-800 rounded-lg p-1 border border-gray-700">
            {[
              { key: 'backend', label: 'Backend Architecture', icon: Server },
              { key: 'data', label: 'Data Pipeline', icon: Database },
              { key: 'soft', label: 'Soft Skills', icon: Users }
            ].map((section) => (
              <button
                key={section.key}
                onClick={() => setActiveSection(section.key as any)}
                className={`flex items-center px-6 py-3 rounded-lg transition-all duration-300 ${
                  activeSection === section.key
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <section.icon size={20} className="mr-2" />
                {section.label}
              </button>
            ))}
          </div>
        </div>

        {/* Visualization Area */}
        <div className="transition-all duration-500 ease-in-out">
          {activeSection === 'backend' && <BackendArchitecture />}
          {activeSection === 'data' && <DataPipeline />}
          {activeSection === 'soft' && <SoftSkillsEcosystem />}
        </div>

        {/* Skills Grid */}
        <div className="relative">
          <div 
            ref={skillsGridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
          >
            {skillsData.categories.map((category, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold mb-4 text-white">
                  {category.name}
                </h3>
                <div className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skillIndex}
                      data-skill={skill.name}
                      className="flex items-center justify-between text-gray-300"
                    >
                      <span>{skill.name}</span>
                      <span className="text-sm text-gray-500">{skill.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {renderSkillConnections(skillsGridRef)}
        </div>
      </div>
    </section>
  );
};

export default Skills;