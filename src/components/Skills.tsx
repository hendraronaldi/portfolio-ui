import React, { useState, useEffect } from 'react';
import { Server, Database, Cloud, Cpu, Network, Users, Target, MessageSquare, GitBranch, Zap } from 'lucide-react';
import skillsData from '../data/skills.json';

                stroke="transparent"
                strokeWidth={Math.max(connection.style.width * 3, 10)}
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10 z-0">
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
    </div>
  );

  const DataPipeline = () => (
    <div className="relative w-full h-96 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl p-6 overflow-hidden">
      {/* Animated Data Flow */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="transparent" />
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              values="-100 0;100 0;-100 0"
              dur="2s"
              repeatCount="indefinite"
            />
          </linearGradient>
        </defs>
        
        <path
          d="M 80 200 Q 200 200 320 200 Q 440 200 560 200 Q 680 200 800 200"
          stroke="url(#flowGradient)"
          strokeWidth="3"
          fill="none"
          strokeDasharray="10,5"
        />
      </svg>

      {/* Pipeline Flow */}
      <div className="flex items-center justify-between h-full">
        {/* Source Systems */}
        <div className="flex flex-col items-center space-y-2">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg p-3">
            <Database size={24} className="text-white" />
          </div>
          <div className="text-white text-xs text-center">Sources</div>
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
        <div className="flex flex-col items-center space-y-2">
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg p-3 mb-2">
              <Database size={24} className="text-white mx-auto" />
            </div>
            <div className="text-white text-xs">Sources</div>
          </div>
          <div className="text-center">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg p-3">
              <Target size={24} className="text-white mx-auto" />
            </div>
            <div className="text-white text-xs text-center">Analytics</div>
          </div>
        </div>
      </div>
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
        { name: 'Remote Work', pos: 'bottom-16 left-1/2 transform -translate-x-1/2', icon: Network, color: 'from-pink-500 to-rose-500' }
      ].map((skill, index) => (
        <div key={skill.name} className={`absolute ${skill.pos}`}>
          <div className={`bg-gradient-to-r ${skill.color} rounded-lg p-4 shadow-lg transform hover:scale-110 transition-all duration-300`}>
            <skill.icon size={24} className="text-white mx-auto mb-2" />
            <div className="text-white text-xs font-medium text-center">{skill.name}</div>
          </div>
        </div>
      ))}

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }).map((_, i) => (
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
        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        </div>
      </div>
    </section>
  );
};

export default Skills;