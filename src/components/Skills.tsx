import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Server, Database, Cloud, Cpu, Network, Users, Target, MessageSquare, GitBranch, Zap } from 'lucide-react';
import skillsData from '../data/skills.json';

const Skills: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'backend' | 'data' | 'soft' | 'network'>('backend');
  const [animationPhase, setAnimationPhase] = useState(0);

  // Animation cycle for data flow
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase(prev => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const BackendArchitecture = () => (
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
        <div key={service.name} className={`absolute ${service.pos}`}>
          <div className={`bg-gradient-to-r ${service.color} rounded-lg p-3 shadow-lg transform hover:scale-110 transition-all duration-300`}>
            <service.icon size={24} className="text-white mx-auto mb-1" />
            <div className="text-white text-xs font-medium text-center">{service.name}</div>
          </div>
          
          {/* Connection lines with animation */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <line
              x1="50%"
              y1="50%"
              x2="50%"
              y2="200%"
              stroke="url(#gradient)"
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
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg p-3 shadow-lg">
          <Network size={20} className="text-white mx-auto mb-1" />
          <div className="text-white text-xs text-center">Load Balancer</div>
        </div>
      </div>

      {/* SVG Gradients */}
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );

  const DataPipeline = () => (
    <div className="relative w-full h-96 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl p-6 overflow-hidden">
      {/* Pipeline Flow */}
      <div className="flex items-center justify-between h-full">
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

      {/* Animated Data Flow */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <path
          d="M 80 200 Q 200 200 320 200 Q 440 200 560 200 Q 680 200 800 200"
          stroke="url(#dataGradient)"
          strokeWidth="3"
          fill="none"
          strokeDasharray="10,5"
        >
          <animate attributeName="stroke-dashoffset" values="0;15" dur="2s" repeatCount="indefinite" />
        </path>
        <defs>
          <linearGradient id="dataGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );

  const SoftSkillsEcosystem = () => (
    <div className="relative w-full h-96 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl p-8 overflow-hidden">
      {/* Central Collaboration Hub */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
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
        { name: 'Remote Work', pos: 'bottom-16 left-1/2 transform -translate-x-1/2', icon: Network, color: 'from-pink-500 to-rose-500' },
      ].map((skill, index) => (
        <div key={skill.name} className={`absolute ${skill.pos}`}>
          <div className={`bg-gradient-to-r ${skill.color} rounded-lg p-4 shadow-lg transform hover:scale-110 transition-all duration-300`}>
            <skill.icon size={24} className="text-white mx-auto mb-2" />
            <div className="text-white text-xs font-medium text-center">{skill.name}</div>
          </div>
          
          {/* Connection lines */}
          <div className={`absolute top-1/2 left-1/2 w-20 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent transform origin-left ${
            index === 0 ? 'rotate-90' : index === 1 ? 'rotate-0' : index === 2 ? 'rotate-180' : 'rotate-270'
          } ${animationPhase === index ? 'opacity-100' : 'opacity-30'} transition-opacity duration-500`}></div>
        </div>
      ))}

      {/* Orbiting Elements */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-60"
            style={{
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) rotate(${i * 60 + animationPhase * 90}deg) translateX(120px)`,
              transition: 'transform 2s ease-in-out',
            }}
          ></div>
        ))}
      </div>
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
              { key: 'soft', label: 'Soft Skills', icon: Users },
            ].map((section) => (
              <button
                key={section.key}
                onClick={() => setActiveSection(section.key as any)}
                className={`flex items-center px-6 py-3 rounded-lg transition-all duration-300 ${
                  activeSection === section.key
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <section.icon size={20} className="mr-2" />
                <span className="font-medium">{section.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Content */}
        <div className="mb-12">
          <div className="transition-all duration-500 ease-in-out">
            {activeSection === 'backend' && <BackendArchitecture />}
            {activeSection === 'data' && <DataPipeline />}
            {activeSection === 'soft' && <SoftSkillsEcosystem />}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.categories.map((category, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300">
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
      </div>
    </section>
  );
};

export default Skills;