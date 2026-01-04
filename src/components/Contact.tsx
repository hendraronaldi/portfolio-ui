import React, { useState } from 'react';
import { Mail, Linkedin, MapPin, Send } from 'lucide-react';
import contactData from '../data/contact.json';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-16 bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
        </div>

        <div className="flex justify-center">
          <div className="max-w-md w-full">
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-700 h-full">
              <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="text-purple-500 mr-4 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium mb-1">Email</h4>
                    <a href={`mailto:${contactData.email}`} className="text-gray-400 hover:text-white transition-colors">
                      {contactData.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Linkedin className="text-blue-500 mr-4 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium mb-1">LinkedIn</h4>
                    <a href="https://linkedin.com/in/hendra-ronaldi-4a7a1b121" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                      linkedin.com/in/hendra-ronaldi-4a7a1b121
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="text-green-500 mr-4 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium mb-1">Location</h4>
                    <p className="text-gray-400">
                      {contactData.location}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="font-medium mb-3">Connect with me</h4>
                <p className="text-gray-400 mb-4">
                  {contactData.message}
                </p>
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-[1px] rounded-lg">
                  <div className="bg-gray-900 p-4 rounded-lg">
                    <p className="text-center">{contactData.availability}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;