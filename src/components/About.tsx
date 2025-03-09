import React from 'react';
import { Code, Database, Brain, Lightbulb, Users, Globe } from 'lucide-react';
import aboutData from '../data/about.json';

const About: React.FC = () => {
  // Map string icon names to actual components
  const getIconComponent = (iconName: string, size: number = 32) => {
    switch (iconName) {
      case 'Code':
        return <Code size={size} />;
      case 'Database':
        return <Database size={size} />;
      case 'Brain':
        return <Brain size={size} />;
      case 'Lightbulb':
        return <Lightbulb size={size} />;
      case 'Users':
        return <Users size={size} />;
      case 'Globe':
        return <Globe size={size} />;
      default:
        return <Code size={size} />;
    }
  };

  // Map color names to Tailwind classes
  const getColorClass = (color: string) => {
    switch (color) {
      case 'purple':
        return 'text-purple-500';
      case 'blue':
        return 'text-blue-500';
      case 'green':
        return 'text-green-500';
      case 'yellow':
        return 'text-yellow-500';
      default:
        return 'text-purple-500';
    }
  };

  return (
    <section id="about" className="py-16 bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            {aboutData.intro.map((paragraph, index) => (
              <p key={index} className="text-lg text-gray-300 mb-6">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="md:w-1/2 grid grid-cols-2 gap-6">
            {aboutData.expertise.map((item, index) => (
              <div key={index} className="bg-gray-900 p-6 rounded-lg border border-gray-700">
                {getIconComponent(item.icon, 32)}
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;