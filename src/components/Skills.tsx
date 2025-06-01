import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import skillsData from '../data/skills.json';

const Skills: React.FC = () => {
  const [expandedSkills, setExpandedSkills] = useState<Record<string, boolean>>({});

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillsData.categories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-6 text-center">{category.title}</h3>
              <ul className="space-y-4">
                {category.skills.map((skill, skillIndex) => {
                  const key = `${categoryIndex}-${skillIndex}`;
                  const isExpanded = expandedSkills[key];

                  return (
                    <li key={skillIndex} className="text-gray-300">
                      <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSkill(categoryIndex, skillIndex)}>
                        <span className="font-medium">{skill.name}</span>
                        {isExpanded ? (
                          <ChevronUp size={16} className="text-gray-400" />
                        ) : (
                          <ChevronDown size={16} className="text-gray-400" />
                        )}
                      </div>
                      {isExpanded && (
                        <p className="mt-2 text-sm text-gray-400 pl-4 border-l-2 border-gray-700 animate-fadeIn">
                          {skill.explanation}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;