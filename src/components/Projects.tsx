import React, { useState, useEffect, useCallback } from 'react';
import { Github, ExternalLink, ChevronLeft, ChevronRight, Play, Pause, Briefcase, Eye } from 'lucide-react';
import faceRecognitionImage from '../assets/img/projects/face_recognition.png';
import personDetectionImage from '../assets/img/projects/person_detection.png';
import selfDrivingCarImage from '../assets/img/projects/self_driving_car.png';
import coralLifeFormsImage from '../assets/img/projects/coral_life_forms.png';
import personalPortfolioImage from '../assets/img/projects/personal_portfolio.png';

import forstokAnalyticsImage from '../assets/img/projects/forstok_analytics.avif';
import forstokChatImage from '../assets/img/projects/forstok_chat.avif';
import forstokListingsImage from '../assets/img/projects/forstok_listings.png';
import forstokDashboardImage from '../assets/img/projects/forstok_dashboard.avif';
import forstokOrdersImage from '../assets/img/projects/forstok_orders.png';
import forstokImage from '../assets/img/projects/forstok.png';

const projectsData = [
  {
    "title": "AI Systems Conductor",
    "description": "Built a personal control plane for agentic software development domain standards with deterministic gates across 9 domains, a 4-tier evaluation ladder, and a calibration ratchet anchored to a human label golden set. Experiment: One improvement cycle node estimation 52%→95% (71%→100% held-out), guards held, kept on held-out confirmation and reported the metric's low ceiling (a constant predictor scores ~97%) rather than claiming the headline gain. Currently decoupling the evaluation layer from orchestration, so any CLI harness or domain can be graded against the same calibrated standard.",
    "image": "https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?q=80&w=1596&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "technologies": ["AI Engineering", "LLM Orchestration", "Autonomous AI Agents", "Evaluation Frameworks"],
    "technicalDetails": [
      "Built a personal control plane for agentic software development domain standards with deterministic gates across 9 domains, a 4-tier evaluation ladder, and a calibration ratchet anchored to a human label golden set.",
      "Experiment: One improvement cycle node estimation 52%→95% (71%→100% held-out), guards held, kept on held-out confirmation and reported the metric's low ceiling (a constant predictor scores ~97%) rather than claiming the headline gain.",
      "Currently decoupling the evaluation layer from orchestration, so any CLI harness or domain can be graded against the same calibrated standard."
    ],
    "github": "https://github.com/hendragon4637/conductor",
    "period": "Apr 2026 - Present",
    "type": "personal",
    "status": "In Progress"
  },
  {
    "title": "Portfolio & AI RAG Assistant",
    "description": "Developed a comprehensive personal portfolio website featuring an interactive AI chatbot powered by Retrieval-Augmented Generation (RAG) to answer questions about my professional experience. The microservices-based architecture consists of a frontend UI, a backend proxy, and a dedicated RAG resume chatbot service.",
    "image": personalPortfolioImage,
    "technologies": [
      "AI Engineering",
      "LLM",
      "RAG",
      "Langfuse",
      "Vector Databases",
      "Frontend Development",
      "Backend Web Development",
      "API Proxy"
    ],
    "technicalDetails": [
      "Built a responsive frontend user interface to showcase portfolio projects and professional experiences (portfolio-ui).",
      "Developed a backend proxy service to securely route API requests and handle system communications (portfolio-be-proxy).",
      "Engineered a dedicated RAG-based AI chatbot service tailored to ingest and retrieve information directly from personal resume data (rag-resume-chatbot).",
      "Integrated a complete AI stack comprising embedding models, vector databases, and LLM orchestration to generate context-aware, highly accurate responses.",
      "Implemented Langfuse for comprehensive LLM observability, debugging, and tracing to monitor agent behavior and evaluate response quality."
    ],
    "github": "https://github.com/hendraronaldi/portfolio-ui",
    "period": "Mar 2025 - Present",
    "type": "personal",
    "status": "In Progress"
  },
  {
    "title": "AI Agent Chatbot",
    "description": "Engineered a customer-facing AI chatbot integrating LLMs and proprietary data to automate product inquiries and support workflows.",
    "image": forstokChatImage,
    "technologies": ["AI Engineering", "LLM", "RAG", "Vector Databases", "Data Pipelines"],
    "technicalDetails": [
      "Engineered a customer-facing AI chatbot integrating LLMs and proprietary data to automate product inquiries and support workflows.",
      "Designed a robust retrieval-augmented generation (RAG) pipeline to ensure accurate knowledge retrieval, significantly reducing manual support overhead and improving service response times."
    ],
    "companyName": "PT Forstok Teknologi Indonesia",
    "companyLogo": "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    "period": "Jan 2025 - Apr 2026",
    "type": "work",
    "status": "Done"
  },
  {
    "title": "Reporting & Analytics Data Pipeline",
    "description": "Modernized reporting infrastructure through strategic query optimization and pre-aggregation techniques.",
    "image": forstokAnalyticsImage,
    "technologies": ["Data Engineering", "Data Pipelines (ELT)", "BigQuery", "Data Warehouses", "Pre-aggregation Techniques", "SQL"],
    "technicalDetails": [
      "Modernized reporting infrastructure through strategic query optimization and pre-aggregation techniques.",
      "Slashed dashboard load times from minutes to under five seconds, eliminating request timeouts and enabling near real-time, data-driven business intelligence."
    ],
    "companyName": "PT Forstok Teknologi Indonesia",
    "companyLogo": "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    "period": "Jan 2024 - Apr 2026",
    "type": "work",
    "status": "Done"
  },
  {
    "title": "Text Matching Master Courier",
    "description": "Developed a high-accuracy, dictionary-based text matching system to standardize courier names from unstructured user inputs.",
    "image": forstokDashboardImage,
    "technologies": ["Python", "Data Preprocessing", "Text Matching"],
    "technicalDetails": [
      "Developed a high-accuracy, dictionary-based text matching system to standardize courier names from unstructured user inputs.",
      "Optimized data consistency, significantly minimizing manual correction requirements and streamlining downstream logistics processes."
    ],
    "companyName": "PT Forstok Teknologi Indonesia",
    "companyLogo": "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    "period": "Jan 2024 - Apr 2026",
    "type": "work",
    "status": "Done"
  },
  {
    "title": "Item Domain System Improvement",
    "description": "Spearheaded the refactoring of the item domain system to address excessive schema complexity.",
    "image": forstokImage,
    "technologies": ["Go", "MySQL", "MongoDB", "Microservices", "gRPC", "graphQL", "Agile Development"],
    "technicalDetails": [
      "Spearheaded the refactoring of the item domain system to address excessive schema complexity.",
      "Delivered a streamlined, maintainable architecture that simplified relational structures, accelerating feature development cycles and system extensibility."
    ],
    "companyName": "PT Forstok Teknologi Indonesia",
    "companyLogo": "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    "period": "Nov 2021 - Apr 2026",
    "type": "work",
    "status": "Done"
  },
  {
    "title": "Purwapedia Preventing Customer Churn with Machine Learning Prediction",
    "description": "Developed a predictive churn model using XGBoost and F2-Score optimization to identify at-risk customers.",
    "image": "https://raw.githubusercontent.com/hendraronaldi/ecommerce_customer_churn/refs/heads/master/assets/dashboard.png",
    "technologies": ["Data Science", "Machine Learning", "XGBoost", "Data Analysis", "Data Visualization", "Project Management", "Remote Teamwork"],
    "technicalDetails": [
      "Developed a predictive churn model using XGBoost and F2-Score optimization to identify at-risk customers.",
      "Demonstrated a potential 79.7% reduction in business costs by providing actionable insights for targeted retention campaigns."
    ],
    "companyName": "Purwadhika Digital Talent School",
    "companyLogo": "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    "github": "https://github.com/hendraronaldi/ecommerce_customer_churn",
    "period": "Aug - Sept 2025",
    "type": "bootcamp",
    "status": "Done"
  },
  {
    "title": "Coral Life Forms Detection",
    "description": "Collaborated with a team of 10 to train and fine-tune UNet models for precise object segmentation of coral life forms, supporting environmental monitoring efforts.",
    "image": coralLifeFormsImage,
    "technologies": ["Deep Learning", "TensorFlow", "Keras", "Computer Vision", "UNet", "AI Engineering"],
    "technicalDetails": [
      "Collaborated with a team of 10 to train and fine-tune UNet models for precise object segmentation of coral life forms, supporting environmental monitoring efforts."
    ],
    "companyName": "Indonesia AI (PT. Teknologi Artifisial Indonesia)",
    "companyLogo": "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    "github": "https://github.com/hendraronaldi/machine_learning_projects/tree/main/Bootcamp%20Computer%20Vision%20Indonesia%20AI%20Batch%203/Final%20Project",
    "period": "Dec 2023 - Feb 2024",
    "type": "bootcamp",
    "status": "Done"
  },
  {
    "title": "Object Segmentation Self Driving Car",
    "description": "Co-developed a UNet-based segmentation model trained on the Cityscapes dataset, delivering reliable object segmentation outputs for autonomous navigation research.",
    "image": selfDrivingCarImage,
    "technologies": ["Deep Learning", "Object Segmentation", "Computer Vision", "UNet", "Self-Driving Cars", "AI Engineering"],
    "technicalDetails": [
      "Co-developed a UNet-based segmentation model trained on the Cityscapes dataset, delivering reliable object segmentation outputs for autonomous navigation research."
    ],
    "companyName": "Indonesia AI (PT. Teknologi Artifisial Indonesia)",
    "companyLogo": "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    "github": "https://github.com/hendraronaldi/machine_learning_projects/tree/main/Bootcamp%20Computer%20Vision%20Indonesia%20AI%20Batch%203/Project%203%20Self%20Driving%20Car",
    "period": "Dec 2023",
    "type": "bootcamp",
    "status": "Done"
  },
  {
    "title": "Person Detection",
    "description": "Contributed to a team project focusing on multi-model person detection using Faster-RCNN and YOLO architectures, achieving improved performance through iterative model fine-tuning.",
    "image": personDetectionImage,
    "technologies": ["Computer Vision", "Deep Learning", "Object Detection", "Faster-RCNN", "YOLO"],
    "technicalDetails": [
      "Contributed to a team project focusing on multi-model person detection using Faster-RCNN and YOLO architectures, achieving improved performance through iterative model fine-tuning."
    ],
    "companyName": "Indonesia AI (PT. Teknologi Artifisial Indonesia)",
    "companyLogo": "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    "github": "https://github.com/hendraronaldi/machine_learning_projects/tree/main/Bootcamp%20Computer%20Vision%20Indonesia%20AI%20Batch%203/Project%202%20Person%20Detection",
    "period": "Nov - Dec 2023",
    "type": "bootcamp",
    "status": "Done"
  },
  {
    "title": "Face Recognition Gender Classification",
    "description": "Led a team of six in training CNN models for face recognition and gender classification, delivering a high-accuracy solution that demonstrated deep learning implementation expertise.",
    "image": faceRecognitionImage,
    "technologies": ["Deep Learning", "Face Recognition", "Gender Classification", "Computer Vision", "CNN"],
    "technicalDetails": [
      "Led a team of six in training CNN models for face recognition and gender classification, delivering a high-accuracy solution that demonstrated deep learning implementation expertise."
    ],
    "companyName": "Indonesia AI (PT. Teknologi Artifisial Indonesia)",
    "companyLogo": "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    "period": "Oct - Nov 2023",
    "type": "bootcamp",
    "status": "Done"
  },
  {
    "title": "Diabetes Disease Prediction",
    "description": "Directed a team of six in building an Artificial Neural Network (ANN) model for diabetes diagnosis, overseeing end-to-end data processing and model optimization for reliable early detection.",
    "image": "https://images.unsplash.com/photo-1576169210859-6796c4b93c32?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "technologies": ["Machine Learning", "Data Preprocessing", "ANN", "Feature Selection", "Model Evaluation", "Data Science"],
    "technicalDetails": [
      "Directed a team of six in building an Artificial Neural Network (ANN) model for diabetes diagnosis, overseeing end-to-end data processing and model optimization for reliable early detection."
    ],
    "companyName": "Indonesia AI (PT. Teknologi Artifisial Indonesia)",
    "companyLogo": "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    "github": "https://github.com/hendraronaldi/machine_learning_projects/tree/main/Bootcamp%20Computer%20Vision%20Indonesia%20AI%20Batch%203/Weekly%20Assignment%202",
    "period": "Oct 2023",
    "type": "bootcamp",
    "status": "Done"
  },
  {
    "title": "House Pricing Prediction",
    "description": "Directed a 6-member team in building a Random Forest model for predicting house prices. Designed the end-to-end pipeline, from data wrangling to feature engineering, achieving high predictive accuracy.",
    "image": "https://images.unsplash.com/photo-1724304406928-c43b01912fa1?q=80&w=2231&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "technologies": ["Machine Learning", "Model Optimization", "Random Forest", "Data Science"],
    "technicalDetails": [
      "Directed a 6-member team in building a Random Forest model for predicting house prices.",
      "Designed the end-to-end pipeline, from data wrangling to feature engineering, achieving high predictive accuracy."
    ],
    "companyName": "Indonesia AI (PT. Teknologi Artifisial Indonesia)",
    "companyLogo": "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    "github": "https://github.com/hendraronaldi/machine_learning_projects/tree/main/Bootcamp%20Computer%20Vision%20Indonesia%20AI%20Batch%203/Weekly%20Assignment%201",
    "period": "Sept 2023",
    "type": "bootcamp",
    "status": "Done"
  },
  {
    "title": "Import Item",
    "description": "Engineered scalable microservices to automate the ingestion and transformation of item data from third-party APIs, eliminating manual intervention and ensuring seamless database integration.",
    "image": forstokListingsImage,
    "technologies": ["Backend Development", "Microservices", "Go", "Ruby", "NodeJS", "RabbitMQ", "MongoDB", "MySQL"],
    "technicalDetails": [
      "Engineered scalable microservices to automate the ingestion and transformation of item data from third-party APIs, eliminating manual intervention and ensuring seamless database integration."
    ],
    "companyName": "PT Forstok Teknologi Indonesia",
    "companyLogo": "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    "period": "Feb 2021 - Feb 2022",
    "type": "work",
    "status": "Done"
  },
  {
    "title": "Import Webhook Order",
    "description": "Developed a microservices system for asynchronous order data ingestion via scheduler and webhook integration, improving data consistency and reducing sync latency.",
    "image": forstokOrdersImage,
    "technologies": ["Webhooks", "Backend Development", "Microservices", "Go", "Ruby", "RabbitMQ", "MongoDB", "MySQL"],
    "technicalDetails": [
      "Developed a microservices system for asynchronous order data ingestion via scheduler and webhook integration, improving data consistency and reducing sync latency."
    ],
    "companyName": "PT Forstok Teknologi Indonesia",
    "companyLogo": "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    "period": "Jul - Dec 2021",
    "type": "work",
    "status": "Done"
  },
  {
    "title": "Import Master Data",
    "description": "Built a robust system for importing and transforming master item attributes from third-party APIs, enhancing data accuracy and system scalability.",
    "image": forstokListingsImage,
    "technologies": ["Backend Development", "Microservices", "Go", "Ruby", "NodeJS", "RabbitMQ", "MongoDB", "MySQL"],
    "technicalDetails": [
      "Built a robust system for importing and transforming master item attributes from third-party APIs, enhancing data accuracy and system scalability."
    ],
    "companyName": "PT Forstok Teknologi Indonesia",
    "companyLogo": "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    "period": "Jun - Dec 2021",
    "type": "work",
    "status": "Done"
  },
  {
    "title": "Hotel Cancellation Prediction",
    "description": "Led a team of three in developing a Random Forest predictive model to forecast hotel booking cancellations, enabling data-driven decision-making for inventory management.",
    "image": "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "technologies": ["Machine Learning", "Data Science", "Random Forest"],
    "technicalDetails": [
      "Led a team of three in developing a Random Forest predictive model to forecast hotel booking cancellations, enabling data-driven decision-making for inventory management."
    ],
    "companyName": "Shift Academy",
    "companyLogo": "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    "github": "https://github.com/hendraronaldi/machine_learning_projects/tree/main/Shift%20Academy%20DS%20Bootcamp%20Batch%209",
    "period": "May - Jun 2021",
    "type": "bootcamp",
    "status": "Done"
  },
  {
    "title": "BRI Data Hackathon",
    "description": "Participated in the BRI Data Hackathon, competing in two sub-competitions: People Analytics and Cash Ratio Optimization, demonstrating data analysis and problem-solving skills.",
    "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    "technologies": ["Data Analysis", "Data Science"],
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
    "description": "Engineered and deployed custom chatbot solutions across third-party platforms, directly contributing to the acquisition of the company's inaugural client.",
    "image": "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "technologies": ["Chatbot Development", "Go", "Rivescript"],
    "technicalDetails": [
      "Engineered and deployed custom chatbot solutions across third-party platforms, directly contributing to the acquisition of the company's inaugural client."
    ],
    "companyName": "Talkabot.id",
    "companyLogo": "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    "period": "Jan - Dec 2018",
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
     // Don't handle keyboard shortcuts if user is typing in an input field
     const activeElement = document.activeElement;
     if (activeElement && (
       activeElement.tagName === 'INPUT' || 
       activeElement.tagName === 'TEXTAREA' || 
       activeElement.isContentEditable
     )) {
       return;
     }

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