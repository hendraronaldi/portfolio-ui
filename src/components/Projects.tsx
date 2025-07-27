import React, { useState, useEffect, useCallback } from 'react';
import { Github, ExternalLink, ChevronLeft, ChevronRight, Play, Pause, Briefcase, Eye } from 'lucide-react';
import faceRecognitionImage from '../assets/img/projects/face_recognition.png';
import personDetectionImage from '../assets/img/projects/person_detection.png';
import selfDrivingCarImage from '../assets/img/projects/self_driving_car.png';
import coralLifeFormsImage from '../assets/img/projects/coral_life_forms.png';

const projectsData = [
  {
    "title": "AI Agent Chatbot",
    "description": "Developed an AI agent chatbot utilizing LLM RAG system to provide knowledgeable responses, showcasing expertise in AI engineering, RAG, vector databases, and data pipelines. Project is currently on hold due to business reasons related to target market and user interface suitability.",
    "image": "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?q=80&w=1596&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "technologies": ["AI Engineering", "LLM", "RAG", "Vector Databases", "Data Pipelines", "BigQuery", "Dataflow", "dbt"],
    "technicalDetails": [
      "Implemented RAG architecture for enhanced chatbot responses",
      "Utilized LLMs for natural language understanding and generation",
      "Integrated vector database for efficient retrieval of relevant information",
      "Developed data pipelines for knowledge base integration"
    ],
    "companyName": "PT Forstok Teknologi Indonesia",
    "companyLogo": "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    "period": "Jan 2025 - Present",
    "type": "work",
    "status": "In Progress"
  },
  {
    "title": "Reporting & Analytics Data Pipeline",
    "description": "Developed and optimized data pipelines for analytics and reporting, leveraging BigQuery and data warehouses. Focused on pre-aggregation techniques to improve reporting system performance and resolve timeout issues. Project was put on hold due to business reasons, with some efforts re-focused on reporting features.",
    "image": "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "technologies": ["Data Engineering", "Data Pipelines (ELT)", "BigQuery", "Data Warehouses", "Pre-aggregation Techniques", "SQL", "MongoDB", "dbt", "Apache Superset"],
    "technicalDetails": [
      "Developed ELT data pipelines for analytics and reporting",
      "Utilized BigQuery for data warehousing",
      "Implemented pre-aggregation techniques to optimize query performance",
      "Optimized reporting system load times to under five seconds",
      "Resolved request timeout issues in reporting system"
    ],
    "companyName": "PT Forstok Teknologi Indonesia",
    "companyLogo": "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    "period": "Jan 2024 - Present",
    "type": "work",
    "status": "In Progress"
  },
  {
    "title": "Text Matching Master Courier",
    "description": "Implemented a rule-based text matching system to improve master courier data using Python for enhanced matching accuracy.",
    "image": "https://images.unsplash.com/photo-1704969724000-154d4fb94344?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "technologies": ["Python", "Data Preprocessing", "Text Matching"],
    "technicalDetails": [
      "Developed a text matching system to enhance master courier data",
      "Focused on data cleaning and preprocessing for accuracy",
      "Applied feature engineering techniques for improved matching"
    ],
    "companyName": "PT Forstok Teknologi Indonesia",
    "companyLogo": "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    "period": "Jan 2024 - Present",
    "type": "work",
    "status": "Done"
  },
  {
    "title": "Item Domain System Improvement",
    "description": "Led a small backend development team working in a cross-division team to design and develop a new improved item domain system, decreasing database complexity from more than 10 relations to only 4 relations.",
    "image": "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    "technologies": ["Go", "MySQL", "MongoDB", "Microservices", "gRPC", "graphQL", "Agile Development"],
    "technicalDetails": [
      "Designed a new item domain system architecture",
      "Reduced database complexity by simplifying relations",
      "Implemented gRPC for efficient inter-service communication",
      "Optimized MySQL queries for better performance",
      "Led team in Agile development practices"
    ],
    "companyName": "PT Forstok Teknologi Indonesia",
    "companyLogo": "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    "period": "Nov 2021 - Jan 2024",
    "type": "work",
    "status": "Done"
  },
  {
    "title": "Machine Learning, Deep Learning Application Projects",
    "description": "Developed various machine learning and deep learning applications, showcasing proficiency in model development, training, and deployment.",
    "image": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    "technologies": ["Machine Learning", "Deep Learning", "Model Development", "Model Training", "Model Deployment", "AI Engineering"],
    "technicalDetails": [
      "Developed diverse ML and DL applications",
      "Demonstrated proficiency in model lifecycle (development, training, deployment)"
    ],
    "period": "Feb 2024",
    "type": "personal",
    "status": "In Progress"
  },
  {
    "title": "Coral Life Forms Detection",
    "description": "Built a deep learning model using TensorFlow and Keras for detecting coral life forms from underwater imagery, achieving high accuracy in classification.",
    "image": coralLifeFormsImage,
    "technologies": ["Deep Learning", "TensorFlow", "Keras", "Computer Vision", "Classification", "AI Engineering"],
    "technicalDetails": [
      "Built a deep learning model for coral detection",
      "Utilized TensorFlow and Keras",
      "Achieved high accuracy in classification from underwater imagery"
    ],
    "companyName": "Indonesia AI (PT. Teknologi Artifisial Indonesia)",
    "companyLogo": "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    "github": "https://github.com/hendraronaldi/machine_learning_projects/tree/main/Bootcamp%20Computer%20Vision%20Indonesia%20AI%20Batch%203/Final%20Project",
    "period": "Feb 2024",
    "type": "bootcamp",
    "status": "Done"
  },
  {
    "title": "Object Segmentation Self Driving Car",
    "description": "Implemented object segmentation for self-driving cars using deep learning techniques, contributing to enhanced environmental perception and safety.",
    "image": selfDrivingCarImage,
    "technologies": ["Deep Learning", "Object Segmentation", "Computer Vision", "Self-Driving Cars", "AI Engineering"],
    "technicalDetails": [
      "Implemented object segmentation for self-driving cars",
      "Utilized deep learning techniques",
      "Enhanced environmental perception and safety"
    ],
    "companyName": "Indonesia AI (PT. Teknologi Artifisial Indonesia)",
    "companyLogo": "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    "github": "https://github.com/hendraronaldi/machine_learning_projects/tree/main/Bootcamp%20Computer%20Vision%20Indonesia%20AI%20Batch%203/Project%203%20Self%20Driving%20Car",
    "period": "Feb 2024",
    "type": "bootcamp",
    "status": "Done"
  },
  {
    "title": "Person Detection",
    "description": "Developed a real-time person detection system using computer vision and deep learning, optimized for performance and accuracy in various environments.",
    "image": personDetectionImage,
    "technologies": ["Computer Vision", "Deep Learning", "Real-time Systems", "Object Detection", "AI Engineering"],
    "technicalDetails": [
      "Developed a real-time person detection system",
      "Optimized for performance and accuracy",
      "Applied computer vision and deep learning techniques"
    ],
    "companyName": "Indonesia AI (PT. Teknologi Artifisial Indonesia)",
    "companyLogo": "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    "github": "https://github.com/hendraronaldi/machine_learning_projects/tree/main/Bootcamp%20Computer%20Vision%20Indonesia%20AI%20Batch%203/Project%202%20Person%20Detection",
    "period": "Feb 2024",
    "type": "bootcamp",
    "status": "Done"
  },
  {
    "title": "Face Recognition Gender Classification",
    "description": "Created a face recognition and gender classification system using deep learning, demonstrating skills in facial analysis and model deployment.",
    "image": faceRecognitionImage,
    "technologies": ["Deep Learning", "Face Recognition", "Gender Classification", "Computer Vision", "Model Deployment", "AI Engineering"],
    "technicalDetails": [
      "Created a face recognition and gender classification system",
      "Utilized deep learning for facial analysis",
      "Demonstrated skills in model deployment"
    ],
    "companyName": "Indonesia AI (PT. Teknologi Artifisial Indonesia)",
    "companyLogo": "https://github.com/hendraronaldi/machine_learning_projects/tree/main/Bootcamp%20Computer%20Vision%20Indonesia%20AI%20Batch%203/Project%201%20Face%20Recognition",
    "type": "bootcamp",
    "status": "Done"
  },
  {
    "title": "Diabetes Disease Prediction",
    "description": "Developed a machine learning model to predict diabetes disease, focusing on data preprocessing, feature selection, and model evaluation for accurate predictions.",
    "image": "https://images.unsplash.com/photo-1576169210859-6796c4b93c32?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "technologies": ["Machine Learning", "Data Preprocessing", "Feature Selection", "Model Evaluation", "Data Science"],
    "technicalDetails": [
      "Developed an ML model for diabetes prediction",
      "Focused on data preprocessing and feature selection",
      "Ensured accurate predictions through model evaluation"
    ],
    "companyName": "Indonesia AI (PT. Teknologi Artifisial Indonesia)",
    "companyLogo": "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    "github": "https://github.com/hendraronaldi/machine_learning_projects/tree/main/Bootcamp%20Computer%20Vision%20Indonesia%20AI%20Batch%203/Weekly%20Assignment%202",
    "period": "Aug 2021",
    "type": "bootcamp",
    "status": "Done"
  },
  {
    "title": "House Pricing Prediction",
    "description": "Built a machine learning model to predict house prices based on various features, demonstrating expertise in regression analysis and model optimization.",
    "image": "https://images.unsplash.com/photo-1724304406928-c43b01912fa1?q=80&w=2231&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "technologies": ["Machine Learning", "Regression Analysis", "Model Optimization", "Data Science"],
    "technicalDetails": [
      "Built an ML model for house price prediction",
      "Utilized various features for prediction",
      "Demonstrated expertise in regression analysis and model optimization"
    ],
    "companyName": "Indonesia AI (PT. Teknologi Artifisial Indonesia)",
    "companyLogo": "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    "github": "https://github.com/hendraronaldi/machine_learning_projects/tree/main/Bootcamp%20Computer%20Vision%20Indonesia%20AI%20Batch%203/Weekly%20Assignment%201",
    "period": "Aug 2021",
    "type": "bootcamp",
    "status": "Done"
  },
  {
    "title": "Import Item",
    "description": "Developed and maintained APIs for importing item data, ensuring data integrity and efficient processing.",
    "image": "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    "technologies": ["Backend Development", "Microservices", "Go", "Ruby", "NodeJS", "RabbitMQ", "MongoDB", "MySQL"],
    "technicalDetails": [
      "Developed and maintained APIs for item data import",
      "Ensured data integrity and efficient processing"
    ],
    "companyName": "PT Forstok Teknologi Indonesia",
    "companyLogo": "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    "period": "Feb 2021 - Present",
    "type": "work",
    "status": "Done"
  },
  {
    "title": "Import Webhook Order",
    "description": "Implemented webhook-based order import functionalities, ensuring real-time data synchronization and reliability.",
    "image": "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    "technologies": ["Webhooks", "Backend Development", "Microservices", "Go", "Ruby", "RabbitMQ", "MongoDB", "MySQL"],
    "technicalDetails": [
      "Implemented webhook-based order import",
      "Ensured real-time data synchronization and reliability"
    ],
    "companyName": "PT Forstok Teknologi Indonesia",
    "companyLogo": "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    "period": "Feb 2021 - Present",
    "type": "work",
    "status": "Done"
  },
  {
    "title": "Import Master Data",
    "description": "Created robust APIs for importing master data, focusing on data validation and seamless integration with existing systems.",
    "image": "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    "technologies": ["Backend Development", "Microservices", "Go", "Ruby", "NodeJS", "RabbitMQ", "MongoDB", "MySQL"],
    "technicalDetails": [
      "Created robust APIs for master data import",
      "Focused on data validation and seamless integration"
    ],
    "companyName": "PT Forstok Teknologi Indonesia",
    "companyLogo": "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    "period": "Feb 2021 - Present",
    "type": "work",
    "status": "Done"
  },
  {
    "title": "Hotel Cancellation Prediction",
    "description": "Developed a machine learning model to predict hotel cancellations, optimizing prediction accuracy and providing actionable insights for revenue management.",
    "image": "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "technologies": ["Machine Learning", "Data Science"],
    "technicalDetails": [
      "Developed an ML model for hotel cancellation prediction",
      "Optimized prediction accuracy",
      "Provided actionable insights for revenue management"
    ],
    "companyName": "Shift Academy",
    "companyLogo": "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    "github": "https://github.com/hendraronaldi/machine_learning_projects/tree/main/Shift%20Academy%20DS%20Bootcamp%20Batch%209",
    "period": "Mar 2021",
    "type": "bootcamp",
    "status": "Done"
  },
  {
    "title": "BRI Data Hackathon",
    "description": "Participated in the BRI Data Hackathon, competing in two sub-competitions: People Analytics and Cash Ratio Optimization, demonstrating data analysis and problem-solving skills.",
    "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    "technologies": ["Data Analysis", "Problem Solving", "Data Science"],
    "technicalDetails": [
      "Competed in People Analytics sub-competition",
      "Competed in Cash Ratio Optimization sub-competition",
      "Demonstrated data analysis and problem-solving skills"
    ],
    "github": "https://github.com/hendraronaldi/machine_learning_projects/tree/main/Competitions/BRI%20Data%20Hackathon%202021",
    "period": "Mar 2021 - Mar 2021",
    "type": "personal",
    "status": "Done"
  },
  {
    "title": "Chatbot",
    "description": "Developed chatbots integrated with third-party chat platforms based on user requirements.",
    "image": "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "technologies": ["Chatbot Development", "Go", "Rivescript"],
    "technicalDetails": [
      "Developed chatbots based on user requirements",
      "Integrated with third-party chat platforms"
    ],
    "companyName": "Talkabot.id",
    "companyLogo": "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    "period": "Jan 2018 - Dec 2018",
    "type": "work",
    "status": "Done"
  }
];


const Projects: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const totalSlides = projectsData.length;

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    // Fade out, change slide, then fade in
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
      setTimeout(() => setIsTransitioning(false), 300);
    }, 150);
  }, [totalSlides, isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
      setTimeout(() => setIsTransitioning(false), 300);
    }, 150);
  }, [totalSlides, isTransitioning]);

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentSlide(index);
      setTimeout(() => setIsTransitioning(false), 300);
    }, 150);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsAutoPlaying(!isAutoPlaying);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [nextSlide, prevSlide, isAutoPlaying]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress':
        return 'bg-blue-500';
      case 'Done':
        return 'bg-green-500';
      case 'On Hold':
        return 'bg-yellow-500';
      case 'Delegated':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getAdjacentProjects = () => {
    const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
    const nextIndex = (currentSlide + 1) % totalSlides;
    return {
      prev: projectsData[prevIndex],
      next: projectsData[nextIndex]
    };
  };

  const currentProject = projectsData[currentSlide];
  const { prev: prevProject, next: nextProject } = getAdjacentProjects();

  return (
    <section id="projects" className="py-16 bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Explore my portfolio of projects spanning AI engineering, data science, and full-stack development
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Project {currentSlide + 1} of {totalSlides}</span>
            <span className="text-sm text-gray-400">{Math.round(((currentSlide + 1) / totalSlides) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Preview Thumbnails */}
        <div className="flex justify-center items-center mb-8 space-x-4">
          {/* Previous Project Thumbnail */}
          <div 
            className="hidden md:block cursor-pointer group"
            onClick={() => goToSlide((currentSlide - 1 + totalSlides) % totalSlides)}
          >
            <div className="relative w-20 h-12 rounded-lg overflow-hidden border-2 border-gray-600 group-hover:border-purple-500 transition-all duration-300 opacity-60 group-hover:opacity-100">
              <img 
                src={prevProject.image} 
                alt={prevProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
            </div>
            <p className="text-xs text-gray-500 text-center mt-1 truncate w-20">{prevProject.title}</p>
          </div>

          {/* Current Project Indicator */}
          <div className="relative">
            <div className="w-24 h-16 rounded-lg overflow-hidden border-3 border-purple-500 shadow-lg shadow-purple-500/30">
              <img 
                src={currentProject.image} 
                alt={currentProject.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-2 -right-2 bg-purple-500 rounded-full p-1">
              <Eye size={12} className="text-white" />
            </div>
            <p className="text-xs text-white text-center mt-1 font-medium truncate w-24">{currentProject.title}</p>
          </div>

          {/* Next Project Thumbnail */}
          <div 
            className="hidden md:block cursor-pointer group"
            onClick={() => goToSlide((currentSlide + 1) % totalSlides)}
          >
            <div className="relative w-20 h-12 rounded-lg overflow-hidden border-2 border-gray-600 group-hover:border-purple-500 transition-all duration-300 opacity-60 group-hover:opacity-100">
              <img 
                src={nextProject.image} 
                alt={nextProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
            </div>
            <p className="text-xs text-gray-500 text-center mt-1 truncate w-20">{nextProject.title}</p>
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Main slideshow container */}
          <div 
            className="relative bg-gray-900 rounded-xl overflow-hidden border border-gray-700 shadow-2xl"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Project content with horizontal slide transition */}
            <div 
              className="flex flex-col lg:flex-row min-h-[500px]"
              style={{
                transition: 'opacity 300ms ease-in-out, transform 300ms ease-in-out',
                opacity: isTransitioning ? 0.3 : 1,
                transform: isTransitioning ? 'scale(0.98)' : 'scale(1)',
              }}
            >
              {/* Project image */}
              <div className="lg:w-1/2 h-64 lg:h-auto relative overflow-hidden group">
                <img
                  src={currentProject.image}
                  alt={currentProject.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Image overlay with project type */}
                <div className="absolute top-4 left-4">
                  {currentProject.type === 'work' && (
                    <div className="flex items-center bg-black/60 backdrop-blur-sm rounded-full px-3 py-1">
                      <Briefcase size={14} className="mr-2 text-blue-400" />
                      <span className="text-white text-sm font-medium">Professional</span>
                    </div>
                  )}
                  {currentProject.type === 'personal' && (
                    <div className="flex items-center bg-black/60 backdrop-blur-sm rounded-full px-3 py-1">
                      <Github size={14} className="mr-2 text-green-400" />
                      <span className="text-white text-sm font-medium">Personal</span>
                    </div>
                  )}
                  {currentProject.type === 'bootcamp' && (
                    <div className="flex items-center bg-black/60 backdrop-blur-sm rounded-full px-3 py-1">
                      <ExternalLink size={14} className="mr-2 text-purple-400" />
                      <span className="text-white text-sm font-medium">Bootcamp</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Project details */}
              <div className="lg:w-1/2 p-8 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-2xl font-bold text-white">{currentProject.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(currentProject.status)} text-white`}>
                        {currentProject.status}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {currentProject.description}
                  </p>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {currentProject.technologies.slice(0, 6).map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-800 border border-gray-600 rounded-full text-sm text-gray-300 hover:border-purple-500 hover:text-white transition-all duration-300 transform hover:scale-105"
                        >
                          {tech}
                        </span>
                      ))}
                      {currentProject.technologies.length > 6 && (
                        <span className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-400">
                          +{currentProject.technologies.length - 6} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Project links and info */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <div className="flex space-x-4">
                    {(currentProject.type === 'personal' || currentProject.type === 'bootcamp') && currentProject.github && (
                      <a
                        href={currentProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-300 transform hover:scale-105"
                      >
                        <Github size={18} className="mr-2" />
                        <span>View Code</span>
                      </a>
                    )}
                    {currentProject.live && (
                      <a
                        href={currentProject.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 rounded-lg transition-all duration-300 transform hover:scale-105"
                      >
                        <ExternalLink size={18} className="mr-2" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                  
                  <div className="text-right">
                    {currentProject.companyName && (
                      <div className="flex items-center text-gray-400 mb-1">
                        <img
                          src={currentProject.companyLogo}
                          alt={currentProject.companyName}
                          className="w-5 h-5 rounded-full mr-2"
                        />
                        <span className="text-sm">{currentProject.companyName}</span>
                      </div>
                    )}
                    <span className="text-sm text-gray-500">{currentProject.period}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation arrows */}
            <button
              onClick={prevSlide}
              disabled={isTransitioning}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
              aria-label="Previous project"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button
              onClick={nextSlide}
              disabled={isTransitioning}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
              aria-label="Next project"
            >
              <ChevronRight size={24} />
            </button>

            {/* Auto-play control */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm"
              aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
            >
              {isAutoPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
          </div>

          {/* Enhanced slide indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {projectsData.map((project, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`group relative transition-all duration-300 ${
                  index === currentSlide
                    ? 'w-12 h-3'
                    : 'w-3 h-3 hover:w-4'
                }`}
                aria-label={`Go to project ${index + 1}: ${project.title}`}
              >
                <div className={`w-full h-full rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500'
                    : 'bg-gray-600 group-hover:bg-gray-500'
                }`}></div>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                  {project.title}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* View all projects link */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/hendraronaldi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Github size={20} className="mr-3" />
            <span>Explore All Projects on GitHub</span>
            <ExternalLink size={16} className="ml-2" />
          </a>
        </div>

        {/* Keyboard shortcuts info */}
        <div className="text-center mt-6 text-gray-500 text-sm">
          <p>Use ← → arrow keys to navigate • Space to pause/play • Hover to pause • Click thumbnails to jump</p>
        </div>
      </div>
    </section>
  );
};

export default Projects;