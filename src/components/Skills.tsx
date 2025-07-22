'color: 'from-gray-500 to-blue-500 transition
+        }
+      }
+    };
+
}
+
+    window handlecolor: 'Escape') {
+        setIsAutoPlaying(false);
+      }
+    };
+
+    window.addEventListener('keydown', handleKeyPress);
+  }, []);
+
+  return (
+    <div className="skills-slideshow-container">
+      <div className="skills-slideshow">
+        {skillsImages.map((image, index) => (
+          <div
+            key={index}
+            className={`skills-slide ${index === currentSlide ? 'active' : ''}`}
+          >
+            <img src={image} alt={`Skill ${index + 1}`} />
+          </div>
+        ))}
+      </div>
+      <div className="skills-navigation">
+        <button onClick={prevSlide} className="nav-button">
+          <ChevronLeft size={20} />
+        </button>
+        <button onClick={nextSlide} className="nav-button">
+          <ChevronRight size={20} />
+        </button>
+      </div>
+    </div>
+  );
+};
+
+const Skills = () => {
+  const containerRef = useRef<HTMLDivElement>(null);
+
+  return (
+    <section id="skills" className="py-20 bg-gray-900">
+      <div className="container mx-auto px-4">
+        <div className="text-center mb-16">
+          <h2 className="text-4xl font-bold text-white mb-4">
+            Technical Skills
+          </h2>
+          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
+            A comprehensive overview of my technical expertise and the tools I use to build amazing digital experiences.
+          </p>
+        </div>
+
+        <div ref={containerRef} className="max-w-4xl mx-auto">
+          <SkillsSlideshow />
+        </div>
+      </div>
+    </section>
+  );
+};
+
+export default Skills;
</content>
</file>

The issue is that the `skillsImages` array is empty, which causes the slideshow to not display any content. Looking at the original file, I can see that the `skillsImages` array should contain actual image paths or URLs for the skills.

Let me fix this by adding proper skill images to the array:

<file>
<path>src/components/Skills.tsx</path>
<content>
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const skillsImages = [
  '/images/skills/frontend.png',
  '/images/skills/backend.png',
  '/images/skills/database.png',
  '/images/skills/devops.png',
  '/images/skills/mobile.png'
];

const SkillsSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % skillsImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + skillsImages.length) % skillsImages.length);
  };

  useEffect(() => {
    if (!isAutoPlaying || skillsImages.length === 0) return;

    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Add keyboard navigation effect
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setIsAutoPlaying(false);
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        setIsAutoPlaying(false);
        nextSlide();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsAutoPlaying(!isAutoPlaying);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isAutoPlaying]);

  if (skillsImages.length === 0) {
    return (
      <div className="text-center text-gray-400 py-8">
        <p>No skills images available</p>
      </div>
    );
  }

  return (
    <div
      className="skills-slideshow-container"
      tabIndex={0}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      onFocus={() => setIsAutoPlaying(false)}
      onBlur={() => setIsAutoPlaying(true)}
      ref={(el) => {
        if (el) el.focus();
      }}
    >
      <div className="skills-slideshow">
        {skillsImages.map((image, index) => (
          <div
            key={index}
            className={`skills-slide ${index === currentSlide ? 'active' : ''}`}
          >
            <img src={image} alt={`Skill ${index + 1}`} />
          </div>
        ))}
      </div>
      <div className="skills-navigation">
        <button onClick={prevSlide} className="nav-button">
          <ChevronLeft size={20} />
        </button>
        <button onClick={nextSlide} className="nav-button">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

const Skills = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="skills" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Technical Skills
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and the tools I use to build amazing digital experiences.
          </p>
        </div>

        <div ref={containerRef} className="max-w-4xl mx-auto">
          <SkillsSlideshow />
        </div>
      </div>
    </section>
  );
};

export default Skills;
</content>
</file>