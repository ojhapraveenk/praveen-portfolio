import React, { useState, useEffect, useRef } from "react";

// Import your assets
import lkrecommendation1 from "../assets/recommendations/lk_recommendation.png";
import lkrecommendation2 from "../assets/recommendations/lk_recommendation_2.png";
import lkrecommendation3 from "../assets/recommendations/lk_recommendation_3.png";
import lorManager from "../assets/recommendations/LOR_BOSCH.pdf";
import certificateWS from "../assets/recommendations/certificate_ws.pdf";
import certificateIntern from "../assets/recommendations/certificate_intern.pdf";
import lorManagerimg from "../assets/recommendations/covers/lor_manager_cover.jpg";
import certificateWSimg from "../assets/recommendations/covers/certificate_ws_cover.jpg";
import certificateInternimg from "../assets/recommendations/covers/certificate_intern_cover.jpg";
import lhind_cover from "../assets/recommendations/covers/loe_lhind_cover.jpg";
import loe_lhind from "../assets/recommendations/loe_lhind.pdf";

const items = [
  {
    type: "img",
    label: "Innovation & Problem-Solving Excellence",
    src: lkrecommendation1,
    category: "LinkedIn",
    author: "Pablo Messana",
    role: "Problemlöser und passionierter Experte | Bauen skalierbarer, innovativer Lösungen",
    linkedinUrl: "https://linkedin.com/in/pablomessana"
  },
  {
    type: "img", 
    label: "Leadership & Transformation Expertise",
    src: lkrecommendation2,
    category: "LinkedIn",
    author: "Teodora Popescu", 
    role: "PMP / SAP / UX / Leadership / Transformation / IT Service Management",
    linkedinUrl: "https://linkedin.com/in/teodora-popescu-strivingforexcellence"
  },
  {
    type: "img",
    label: "SAP & Process Mining Mastery", 
    src: lkrecommendation3,
    category: "LinkedIn",
    author: "SathishKumar Bhavani Sakthivel",
    role: "CPO, Senior SAP Celonis Process Mining Consultant & Task Mining Expert",
    linkedinUrl: "https://linkedin.com/in/sathishkumar-bhavani-sakthivel"
  },
  {
    type: "pdf",
    label: "Group Leader Recommendation",
    src: lorManager,
    category: "Official Document",
    author: "Shravan Kumar P",
    linkedinUrl: "https://linkedin.com/in/shravan-kumar-b9a5a236",
    role: "Group Leader (CI/PDI4) - Data Insights Process Mining",
    company: "Robert Bosch GmbH",
    coverImage: lorManagerimg,
    description: "Formal recommendation highlighting technical expertise and leadership qualities"
  },
  {
    type: "pdf", 
    label: "Working Student Certificate",
    src: certificateWS,
    category: "Certificate",
    author: "Robert Bosch GmbH",
    role: "HR Service Deutschland", 
    company: "Robert Bosch GmbH",
    date: "31. August 2024",
    location: "Feuerbach",
    description: "Official certificate - Zeugnis über Tätigkeit in der Robert Bosch GmbH",
    coverImage: certificateWSimg
  },
  {
    type: "pdf",
    label: "Internship Certificate", 
    src: certificateIntern,
    category: "Certificate",
    author: "Robert Bosch GmbH",
    role: "HR Service Deutschland", 
    company: "Robert Bosch GmbH",
    date: "31. February 2024",
    location: "Feuerbach",
    coverImage: certificateInternimg,
    description: "Maschinell erstelltes Zeugnis - gültig ohne Unterschrift"
  },
  {
    type: "pdf",
    label: "LHIND Letter of Employment", 
    src: loe_lhind,
    category: "Certificate",
    author: "Lufthansa Industry Solutions",
    role: "Zwischenzeugnis", 
    company: "Lufthansa Industry Solutions",
    date: "11. February 2026",
    location: "Raunheim, Germany",
    coverImage: lhind_cover,
    description: "Maschinell erstelltes Zeugnis - gültig ohne Unterschrift"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Touch/swipe handling
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const sliderRef = useRef(null);

  // Check if mobile
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Touch handlers for swipe functionality
  const handleTouchStart = (e) => {
    if (!isMobile) return;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (!isMobile) return;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!isMobile) return;
    
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide(); // Swipe left = next slide
      } else {
        prevSlide(); // Swipe right = previous slide
      }
    }
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const openModal = (item) => {
    if (item.type === "pdf") {
      window.open(item.src, '_blank');
      return;
    }
    setModalItem(item);
    setModalOpen(true);
    setIsAutoPlaying(false);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalItem(null);
    setIsAutoPlaying(true);
  };

  // Handle clicking anywhere in modal to close
  const handleModalClick = (e) => {
    // Close modal when clicking on backdrop or modal content
    closeModal();
  };

  // Prevent modal close when clicking on interactive elements
  const handleModalContentClick = (e) => {
    // Only prevent closing if clicking on specific interactive elements
    if (e.target.tagName === 'BUTTON' || 
        e.target.tagName === 'A' || 
        e.target.closest('button') || 
        e.target.closest('a')) {
      e.stopPropagation();
      return;
    }
    // For everything else (including images), close the modal
    closeModal();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (modalOpen) {
        if (e.key === 'Escape') closeModal();
        return;
      }
      
      switch(e.key) {
        case 'ArrowLeft':
          prevSlide();
          break;
        case 'ArrowRight':
          nextSlide();
          break;
        case ' ':
          e.preventDefault();
          setIsAutoPlaying(!isAutoPlaying);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen, isAutoPlaying]);

  const renderPdfCover = (item) => {
    if (item.coverImage) {
      return (
        <img 
          src={item.coverImage} 
          alt={`${item.label} preview`}
          className="w-full h-full object-cover rounded-lg"
        />
      );
    }
    
    return (
      <div className="w-full h-full bg-gradient-to-br from-red-50 to-red-100 rounded-lg flex flex-col items-center justify-center p-6">
        <div className="text-red-600 text-6xl mb-4">📄</div>
        <h3 className="text-lg font-bold text-gray-800 text-center mb-2">{item.label}</h3>
        <p className="text-sm text-gray-600 text-center mb-1">{item.author}</p>
        {item.company && <p className="text-xs text-gray-500 text-center mb-2">{item.company}</p>}
        {item.date && <p className="text-xs text-gray-400 text-center mb-3">{item.date}</p>}
        <p className="text-xs text-gray-500 text-center leading-relaxed mb-4">{item.description}</p>
        <div className="px-3 py-2 bg-red-600 text-white rounded-full text-sm font-medium text-center">
          Click to Preview
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="flex justify-center gap-8 mt-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">7</div>
            <div className="text-sm text-gray-500">Testimonials</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">4</div>
            <div className="text-sm text-gray-500">Certificates</div>
          </div>
          {/* <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">5★</div>
            <div className="text-sm text-gray-500">Rating</div>
          </div> */}
        </div>
      </div>

      {/* Mobile Swipe Hint */}
      {isMobile && (
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            <span>👈</span>
            <span>Swipe to navigate</span>
            <span>👉</span>
          </div>
        </div>
      )}

      {/* Slider Container */}
      <div className="max-w-7xl mx-auto relative">
        
        {/* Main slide display */}
        <div 
          ref={sliderRef}
          className="relative overflow-hidden rounded-2xl shadow-2xl bg-white"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ touchAction: 'pan-y pinch-zoom' }} // Allow vertical scroll but handle horizontal swipes
        >
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {items.map((item, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <div className="grid md:grid-cols-2 gap-8 p-8 min-h-[600px]">
                  
                  {/* Left side - Preview */}
                  <div 
                    className="flex items-center justify-center cursor-pointer group"
                    onClick={() => openModal(item)}
                  >
                    <div className="relative w-full max-w-md">
                      {item.type === "img" ? (
                        <div className="aspect-[872/382] bg-white rounded-xl shadow-lg overflow-hidden group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105 group-active:scale-95">
                          <img 
                            src={item.src} 
                            alt={item.label}
                            className="w-full h-full object-contain p-4"
                          />
                        </div>
                      ) : (
                        <div className="aspect-[872/382] bg-white rounded-xl shadow-lg overflow-hidden group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105 group-active:scale-95">
                          {renderPdfCover(item)}
                        </div>
                      )}
                      
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-xl flex items-center justify-center">
                        <div className="bg-white/90 px-6 py-3 rounded-full opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300 shadow-lg">
                          <span className="text-gray-800 font-semibold">
                            {isMobile ? 'Tap to Expand' : 'Click to Expand'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right side - Details */}
                  <div className="flex flex-col justify-center space-y-6">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          {item.category}
                        </div>
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-3">{item.label}</h2>
                      <div className="text-gray-600 space-y-2">
                        {item.linkedinUrl ? (
                          <a 
                            href={item.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200 flex items-center gap-2"
                            onClick={(e) => e.stopPropagation()} // Prevent triggering swipe
                          >
                            {item.author}
                            <span className="text-blue-500">🔗</span>
                          </a>
                        ) : (
                          <p className="text-lg font-semibold">{item.author}</p>
                        )}
                        <p className="text-base leading-relaxed">{item.role}</p>
                        {item.company && (
                          <p className="text-sm text-gray-500 font-medium">{item.company}</p>
                        )}
                        {item.date && item.location && (
                          <p className="text-sm text-gray-400">{item.location}, {item.date}</p>
                        )}
                        {item.description && (
                          <p className="text-gray-500 text-sm leading-relaxed mt-4 italic">{item.description}</p>
                        )}
                      </div>
                    </div>
                    
                    {/* Action buttons */}
                    <div className="space-y-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent triggering swipe
                          openModal(item);
                        }}
                        className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        View Full {item.type === 'pdf' ? 'Document' : 'Recommendation'}
                      </button>
                      
                      {item.type === 'pdf' && (
                        <div className="flex gap-2">
                          <a
                            href={item.src}
                            download
                            onClick={(e) => e.stopPropagation()} // Prevent triggering swipe
                            className="flex-1 text-center px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 hover:bg-gray-50 active:scale-95 transition-all duration-300"
                          >
                            📥 Download
                          </a>
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent triggering swipe
                              window.open(item.src, '_blank');
                            }}
                            className="flex-1 px-6 py-3 border-2 border-blue-300 text-blue-700 rounded-lg font-semibold hover:border-blue-400 hover:bg-blue-50 active:scale-95 transition-all duration-300"
                          >
                            🔗 Open in Tab
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation arrows - Hide on mobile */}
        {!isMobile && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group z-10"
            >
              <span className="text-xl text-gray-600 group-hover:text-gray-800">←</span>
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group z-10"
            >
              <span className="text-xl text-gray-600 group-hover:text-gray-800">→</span>
            </button>
          </>
        )}

        {/* Dots indicator */}
        <div className="flex justify-center space-x-3 mt-8">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-blue-600 w-8' 
                  : 'bg-gray-300 hover:bg-gray-400 active:scale-95'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Enhanced Modal with Click-anywhere-to-close */}
      {modalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 pt-16"
          onClick={handleModalClick} // Click anywhere on backdrop to close
        >
          <div 
            className="relative w-full h-full max-w-4xl max-h-full bg-white rounded-lg overflow-hidden shadow-2xl flex flex-col"
            onClick={handleModalContentClick} // Handle clicks within modal content
          >
            
            {/* Modal header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gray-50">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{modalItem?.label}</h2>
                <p className="text-gray-600">{modalItem?.author} • {modalItem?.role}</p>
                {isMobile && (
                  <p className="text-sm text-gray-500 mt-1">Tap anywhere to close</p>
                )}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeModal();
                }}
                className="w-10 h-10 rounded-full bg-gray-200 hover:bg-red-100 hover:text-red-600 active:scale-95 transition-all duration-200 flex items-center justify-center text-xl"
              >
                ×
              </button>
            </div>

            {/* Modal content */}
            <div className="flex-1 p-6 overflow-auto flex items-center justify-center bg-gray-50">
              {modalItem?.type === "img" && (
                <img 
                  src={modalItem.src} 
                  alt={modalItem.label}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-lg bg-white cursor-pointer"
                  onClick={() => closeModal()} // Click on image to close
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}