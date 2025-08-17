import React, { useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatPopup from './components/ChatPopup';

function App() {
  // Generate session ID on first load
  useEffect(() => {
    // Generate UUID for session
    const generateUUID = () => {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    };

    // Check if session ID already exists, if not create one
    let sessionId = sessionStorage.getItem('chat-session-id');
    if (!sessionId) {
      sessionId = generateUUID();
      sessionStorage.setItem('chat-session-id', sessionId);
    }

    // Health check on page load
    const performHealthCheck = async () => {
      try {
        const backendProxyUrl = import.meta.env.VITE_BE_PROXY_URL;
        const healthApiKey = import.meta.env.VITE_HEALTH_API_KEY;
        
        if (backendProxyUrl && healthApiKey) {
          await axios.get(`${backendProxyUrl}/health`, {
            headers: {
              'X-API-Key': healthApiKey
            }
          });
          console.log('Health check successful');
        }
      } catch (error) {
        console.warn('Health check failed:', error);
      }
    };

    performHealthCheck();
  }, []);

  // Add smooth scrolling behavior to the entire document
  useEffect(() => {
    // This ensures smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href')?.substring(1);
        if (targetId) {
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <ChatPopup />
    </div>
  );
}

export default App;