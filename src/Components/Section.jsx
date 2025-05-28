import React, { useState, useEffect } from 'react';
import styles from './SplitHero.module.css';
import profilePhoto from '../assets/profile_photo.jpg';
import chestRibbon from '../assets/chest_ribbon.png';
import SkillsTrain from "./SkillsTrain.jsx";
import rwthlogo from '../assets/logos/rwth_logo.png';
import resumeDA from '../assets/resume_data_analyst.pdf';
import resumePM from '../assets/resume_pm_analyst.pdf';

import { useNavigate } from 'react-router-dom';

const TAGLINE_RIGHT =
  "Blending machine learning and analytics with business process intelligence.";
const TAGLINE_LEFT =
  "Specialist in process mining, LLM-driven conformance checks, and Action Flow.";

// Typing animation hook
const useTypingEffect = (text, isActive, speed = 40) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!isActive || !text) {
      setDisplayText('');
      setIsComplete(false);
      return;
    }
    
    setDisplayText('');
    setIsComplete(false);
    
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);
    
    return () => clearInterval(timer);
  }, [text, isActive, speed]);

  return { displayText, isComplete };
};

export default function Section() {
  const [hovered, setHovered] = useState(null); // 'left', 'right', or null
  const [animationDone, setAnimationDone] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // Typing animations
  const leftTyping = useTypingEffect(TAGLINE_LEFT, hovered === 'left');
  const rightTyping = useTypingEffect(TAGLINE_RIGHT, hovered === 'right');

  useEffect(() => {
    // Animation is 0.9s, so after 900ms, show the full photo
    const timer = setTimeout(() => setAnimationDone(true), 900);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Navigation logic on click
  const goToSection = (side) => {
    if (side === 'left') navigate('/projects?mode=process-mining-analyst');
    else if (side === 'right') navigate('/projects?mode=data-analyst');
  };

  const handleInteraction = (side) => {
    if (isMobile) {
      // Toggle on mobile/tablet
      setHovered(hovered === side ? null : side);
    } else {
      // On desktop, navigate immediately
      goToSection(side);
    }
  };

  function handleMouseMove(e) {
    if (isMobile) return; // Disable mouse move on mobile
    
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const width = bounds.width;

    if (x < width * 0.32) setHovered('left');         // Only if mouse is in far left 32%
    else if (x > width * 0.68) setHovered('right');   // Only if mouse is in far right 32%
    else setHovered(null);                            // Else show both
  }

  return (
    <div className={styles['hero-container']}>

      {/* Ribbon badge */}
      <img src={chestRibbon} alt="5+ Years Experience" className={styles['ribbon-badge']} />

      {/* Main Split */}
      <div
        className={styles['hero-split']}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => !isMobile && setHovered(null)}
      >

        {/* Left half */}
        <div
          className={`${styles['split-half']} ${styles.left} ${hovered === 'right' ? styles.hide : ''} ${hovered === 'left' ? styles.expanded : ''}`}
          onMouseEnter={() => !isMobile && setHovered('left')}
          onMouseLeave={() => !isMobile && setHovered(null)}
          onClick={() => handleInteraction('left')}
        >
          <div className={styles['split-content']}>
            <h1 className="text-8xl font-bold text-blue-800 mb-7">Process Mining Analyst</h1>
            <div className={styles['tagline-container']}>
              {hovered === 'left' ? (
                <span className={`text-1xl text-gray-700 block text-center max-w-xs mb-2 ${styles['typing-text']}`}>
                  {leftTyping.displayText}
                  {!leftTyping.isComplete && <span className={styles['typing-cursor']}></span>}
                </span>
              ) : (
                <span className="text-1xl text-gray-700 block text-center max-w-xs mb-2">{TAGLINE_LEFT}</span>
              )}
            </div>
            <a
              className={styles['resume-btn']}
              href={resumePM}
              target="_blank"
              rel="noopener noreferrer"
            >
              See Resume
            </a>
          </div>
        </div>

        
        {/* Profile photo in split */}
        <div className={styles['profile-photo-container']}>
          {!animationDone ? (
            <>
              {/* Left half */}
              <div className={`${styles['profile-photo-split']} ${styles.left}`}>
                <img src={profilePhoto} alt="Profile left"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'left' }} />
              </div>
              {/* Right half */}
              <div className={`${styles['profile-photo-split']} ${styles.right}`}>
                <img src={profilePhoto} alt="Profile right"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'right' }} />
              </div>
            </>
          ) : (
            // Show whole image centered after animation
            <img
              src={profilePhoto}
              alt="Profile"
              className={styles['profile-photo-full']}
              style={{
                position: "absolute",
                left: 0, top: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "1130px"
              }}
            />
          )}
        </div>

        {/* Right half */}
        <div
          className={`${styles['split-half']} ${styles.right} ${hovered === 'left' ? styles.hide : ''} ${hovered === 'right' ? styles.expanded : ''}`}
          onMouseEnter={() => !isMobile && setHovered('right')}
          onMouseLeave={() => !isMobile && setHovered(null)}
          onClick={() => handleInteraction('right')}
        >
          <div className={styles['split-content']}>
            <h2 className="text-8xl font-bold text-blue-800 mb-7">Data Analyst</h2>
            <div className={styles['tagline-container']}>
              {hovered === 'right' ? (
                <span className={`text-gray-700 block text-center max-w-xs mb-2 ${styles['typing-text']}`}>
                  {rightTyping.displayText}
                  {!rightTyping.isComplete && <span className={styles['typing-cursor']}></span>}
                </span>
              ) : (
                <span className="text-gray-700 block text-center max-w-xs mb-2">{TAGLINE_RIGHT}</span>
              )}
            </div>
            <a
              className={styles['resume-btn']}
              href={resumeDA}
              target="_blank"
              rel="noopener noreferrer"
            >
              See Resume
            </a>
          </div>
        </div>
        <div className={styles['qualification-box']}>
          <img
            src={rwthlogo}
            alt="RWTH Aachen University"
            className={styles['rwth-bg']}
          />
          <div className={styles['qualification-text']}>
            <div>M.Sc. Data Analytics and Decision Science</div>
          </div>
        </div>
      </div>
      <div className="skills-train-wrapper">
        <SkillsTrain />
      </div>
    </div>
  );
}