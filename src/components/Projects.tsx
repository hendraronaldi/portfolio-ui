import React, { useState } from 'react';
import { Github, ExternalLink, ChevronDown, ChevronUp, Briefcase } from 'lucide-react';
import projectsData from '../data/projects.json';

const Projects: React.FC = () => {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const toggleProject = (index: number) => {
    setExpandedProject(expandedProject === index ? null : index);
  };

  return (
    <section id="projects" className="py-16 bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.projects.map((project, index) => (
            <div key={index} className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700 transition-transform hover:scale-[1.02]">
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  {project.type === 'work' && (
                    <div className="flex items-center text-gray-400">
                      <Briefcase size={16} className="mr-1" />
                      <span className="text-sm">Work Project</span>
                    </div>
                  )}
                </div>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => toggleProject(index)}
                  className="flex items-center text-gray-300 hover:text-white transition-colors mb-4"
                >
                  {expandedProject === index ? (
                    <>
                      <ChevronUp size={18} className="mr-1" />
                      <span>Show Less</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown size={18} className="mr-1" />
                      <span>Show More</span>
                    </>
                  )}
                </button>

                {expandedProject === index && (
                  <div className="mt-4 p-4 bg-gray-800 rounded-lg animate-fadeIn">
                    <h4 className="font-semibold mb-2">Technical Details:</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-300">
                      {project.technicalDetails.map((detail, detailIndex) => (
                        <li key={detailIndex}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
                  <div className="flex space-x-4">
                    {project.type === 'personal' ? (
                      <>
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-gray-300 hover:text-white transition-colors"
                          >
                            <Github size={18} className="mr-1" />
                            <span>Code</span>
                          </a>
                        )}
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-gray-300 hover:text-white transition-colors"
                          >
                            <ExternalLink size={18} className="mr-1" />
                            <span>Live Demo</span>
                          </a>
                        )}
                      </>
                    ) : (
                      <div className="flex items-center">
                        <img
                          src={project.companyLogo}
                          alt={project.companyName}
                          className="w-6 h-6 rounded-full mr-2"
                        />
                        <span className="text-sm text-gray-400">{project.companyName}</span>
                      </div>
                    )}
                  </div>
                  <span className="text-sm text-gray-400">{project.period}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="https://github.com/hendraronaldi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gray-700 rounded-lg font-medium hover:bg-gray-600 transition-colors"
          >
            <Github size={20} className="mr-2" />
            <span>View More on GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;