import React, { useState, useEffect } from 'react';
import styles from './SplitHero.module.css';
import profilePhoto from '../assets/profile_photo.jpg';
import chestRibbon from '../assets/chest_ribbon.png';
import SkillsTrain from "./SkillsTrain.jsx";
import rwthlogo from '../assets/logos/rwth_logo.png';
import resumeDA from '../assets/resume_data_analyst.pdf';
import resumePM from '../assets/resume_pm_analyst.pdf';

import { useNavigate } from 'react-router-dom';

const TAGLINE_LEFT =
  "Blending machine learning and analytics with business process intelligence";
const TAGLINE_RIGHT =
  "Specialist in process mining, LLM-driven conformance checks, and Action Flow";

// const RESUME_URL = '../assets/resume_data_analyst.pdf';

export default function Section() {
  const [hovered, setHovered] = useState(null); // 'left', 'right', or null
  const [animationDone, setAnimationDone] = useState(false);
  const navigate = useNavigate();

  
  useEffect(() => {
    // Animation is 0.9s, so after 900ms, show the full photo
    const timer = setTimeout(() => setAnimationDone(true), 900);
    return () => clearTimeout(timer);
  }, []);

  // Navigation logic on click
  const goToSection = (side) => {
    if (side === 'left') navigate('/projects?mode=data-analyst');
    else if (side === 'right') navigate('/projects?mode=process-mining-analyst');
  };

  function handleMouseMove(e) {
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
        onMouseLeave={() => setHovered(null)}
      >

        {/* Left half */}
        <div
          // className={`${styles['split-half']} ${styles.left} ${hovered === 'right' ? styles.hide : ''}`}
          className={`${styles['split-half']} ${styles.left} ${hovered === 'right' ? styles.hide : ''} ${hovered === 'left' ? styles.expanded : ''}`}
          onMouseEnter={() => setHovered('left')}
          onMouseLeave={() => setHovered(null)}
          onClick={() => goToSection('left')}
        >
          <div className={styles['split-content']}>
            <h1 className="text-8xl font-bold text-blue-800 mb-7">Data Analyst</h1>
            <span className="text-1xl text-gray-700 block text-center max-w-xs mb-2">{TAGLINE_LEFT}</span>
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
          // className={`${styles['split-half']} ${styles.right} ${hovered === 'left' ? styles.hide : ''}`}
          className={`${styles['split-half']} ${styles.right} ${hovered === 'left' ? styles.hide : ''} ${hovered === 'right' ? styles.expanded : ''}`}
          onMouseEnter={() => setHovered('right')}
          onMouseLeave={() => setHovered(null)}
          onClick={() => goToSection('right')}
        >
          <div className={styles['split-content']}>
            <h2 className="text-8xl font-bold text-blue-800 mb-7">Process Mining Analyst</h2>
            <span className="text-gray-700 block text-center max-w-xs mb-2">{TAGLINE_RIGHT}</span>
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