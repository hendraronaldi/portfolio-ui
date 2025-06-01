import React from 'react';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import experienceData from '../data/experience.json';
import educationData from '../data/education.json';
import certificationsData from '../data/certifications.json';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience & Education</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            <h3 className="text-2xl font-semibold mb-6 border-b border-gray-700 pb-2">Work Experience</h3>
            <div className="space-y-8">
              {experienceData.map((exp, index) => (
                <div key={index} className="relative pl-8 border-l-2 border-gray-700">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-500"></div>
                  <div className="mb-2">
                    <h4 className="text-xl font-semibold">{exp.title}</h4>
                    <p className="text-lg text-purple-400">{exp.company}</p>
                  </div>
                  <div className="flex items-center text-gray-400 mb-4 text-sm">
                    <div className="flex items-center mr-4">
                      <Calendar size={14} className="mr-1" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin size={14} className="mr-1" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    {exp.description.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="md:w-1/3">
            <h3 className="text-2xl font-semibold mb-6 border-b border-gray-700 pb-2">Education</h3>
            <div className="space-y-6">
              {educationData.map((edu, index) => (
                <div key={index} className="relative pl-8 border-l-2 border-gray-700">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500"></div>
                  <div className="mb-2">
                    <h4 className="text-xl font-semibold">{edu.degree}</h4>
                    <p className="text-lg text-blue-400">{edu.institution}</p>
                  </div>
                  <div className="flex items-center text-gray-400 mb-4 text-sm">
                    <div className="flex items-center mr-4">
                      <Calendar size={14} className="mr-1" />
                      <span>{edu.period}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin size={14} className="mr-1" />
                      <span>{edu.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-semibold mt-10 mb-6 border-b border-gray-700 pb-2">Certifications</h3>
            <ul className="space-y-4">
              {certificationsData.map((cert, index) => (
                <li key={index} className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{cert.name}</h4>
                      <p className="text-gray-400 text-sm">{cert.issuer}, {cert.year}</p>
                    </div>
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;