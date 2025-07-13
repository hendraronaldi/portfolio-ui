import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import skillsData from '../data/skills.json';

// Skill icon mapping
const skillIcons: Record<string, string> = {
  // Programming Languages
  'Go/Golang': '🐹',
  'Python': '🐍',
  'Ruby': '💎',
  'Ruby on Rails': '🚂',
  'Node.js': '🟢',
  
  // Data & AI
  'Data Analysis': '📊',
  'Data Science': '🔬',
  'Machine Learning': '🤖',
  'Deep Learning': '🧠',
  'Computer Vision': '👁️',
  'Object Detection': '🎯',
  'Object Segmentation': '✂️',
  'Transfer Learning': '🔄',
  'Model Interpretation': '🔍',
  'Model Building': '🏗️',
  'Exploratory Data Analysis': '🔎',
  'Data Modeling': '📐',
  'Artificial Intelligence (AI)': '🤖',
  'Reinforcement Learning': '🎮',
  'Pandas (Software)': '🐼',
  'NumPy': '🔢',
  'Data Preparation': '🧹',
  'Word Processing': '📝',
  'Tokenization': '🔤',
  'TensorFlow': '🧮',
  
  // Web Development & Architecture
  'Back-End Web Development': '⚙️',
  'Microservices': '🔧',
  'gRPC': '📡',
  'GraphQL': '📈',
  'Domain-Driven Design (DDD)': '🏛️',
  'Docker': '🐳',
  'Amazon Web Services (AWS)': '☁️',
  
  // Databases & Messaging
  'MySQL': '🗄️',
  'MongoDB': '🍃',
  'RabbitMQ': '🐰',
  
  // Soft Skills & Development Practices
  'Communication': '💬',
  'Teamwork': '👥',
  'Remote Teamwork': '🌐',
  'Team Management': '👨‍💼',
  'Team Leadership': '👑',
  'Teaching': '👨‍🏫',
  'Agile Methodologies': '🔄',
  'Software Project Management': '📋',
  'Quality Assurance': '✅',
  'Knowledge-based Systems': '📚',
  'Git': '📝'
};

const Skills: React.FC = () => {
  const [expandedSkills, setExpandedSkills] = useState<Record<string, boolean>>({});
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const toggleSkill = (categoryIndex: number, skillIndex: number) => {
    const key = `${categoryIndex}-${skillIndex}`;
    setExpandedSkills(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <section id="skills" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Skills</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
        </div>

        <div className="space-y-12">
          {skillsData.categories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-gray-800 rounded-lg p-8 border border-gray-700">
              <h3 className="text-2xl font-semibold mb-8 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {category.title}
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {category.skills.map((skill, skillIndex) => {
                  const key = `${categoryIndex}-${skillIndex}`;
                  const isExpanded = expandedSkills[key];
                  const icon = skillIcons[skill.name] || '⚡';

                  return (
                    <div
                      key={skillIndex}
                      className="group relative"
                      onMouseEnter={() => setHoveredSkill(key)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <div
                        className={`bg-gray-900 rounded-xl p-4 border border-gray-600 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20 ${
                          isExpanded ? 'border-purple-500 shadow-lg shadow-purple-500/20' : ''
                        }`}
                        onClick={() => toggleSkill(categoryIndex, skillIndex)}
                      >
                        <div className="text-center">
                          <div className="text-4xl mb-3 transition-transform duration-300 group-hover:scale-110">
                            {icon}
                          </div>
                          <h4 className="font-medium text-sm text-gray-300 group-hover:text-white transition-colors duration-300 leading-tight">
                            {skill.name}
                          </h4>
                          <div className="mt-2 flex justify-center">
                            {isExpanded ? (
                              <ChevronUp size={16} className="text-purple-400" />
                            ) : (
                              <ChevronDown size={16} className="text-gray-400 group-hover:text-purple-400 transition-colors duration-300" />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Tooltip on hover */}
                      {hoveredSkill === key && !isExpanded && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-700 text-white text-xs rounded-lg shadow-lg z-10 whitespace-nowrap animate-fadeIn">
                          Click to learn more
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-700"></div>
                        </div>
                      )}

                      {/* Expanded explanation */}
                      {isExpanded && (
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-80 max-w-[90vw] bg-gray-700 border border-gray-600 rounded-lg p-4 shadow-xl z-20 animate-fadeIn">
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-700"></div>
                          <h5 className="font-semibold text-purple-400 mb-2">{skill.name}</h5>
                          <p className="text-sm text-gray-300 leading-relaxed">
                            {skill.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;