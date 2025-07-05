// src/Components/ProjectsPage.jsx - Mobile Optimized
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProfessionalTimeline from "./ProfessionalTimeline";
import AcademicProjectsGrid from "./AcademicProjectsGrid";
import "./ProjectsPage.css";
import "./MobileProjectsPage.css";

export default function ProjectsPage({ mode: propMode }) {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const urlModeParam = params.get('mode');
    
    // Priority: prop mode > URL mode > null
    const initialMode = propMode || urlModeParam;
    
    const [activeMode, setActiveMode] = useState(initialMode);
    const [highlight, setHighlight] = useState(!!initialMode); // Set to true if mode is provided
    const [isMobile, setIsMobile] = useState(false);
    const [showModeHint, setShowModeHint] = useState(false);

    // Update mode when prop changes (for navigation from external links)
    useEffect(() => {
        if (propMode) {
            setActiveMode(propMode);
            setHighlight(true);
        }
    }, [propMode]);

    // Check if mobile
    useEffect(() => {
        const checkDevice = () => {
            setIsMobile(window.innerWidth <= 767);
        };
        
        checkDevice();
        window.addEventListener('resize', checkDevice);
        return () => window.removeEventListener('resize', checkDevice);
    }, []);

    // Show hint when mode is selected on mobile
    useEffect(() => {
        if (isMobile && activeMode && highlight) {
            setShowModeHint(true);
            const timer = setTimeout(() => setShowModeHint(false), 4000);
            return () => clearTimeout(timer);
        }
    }, [activeMode, highlight, isMobile]);

    // Reset function for clicking empty areas
    const handleReset = (e) => {
        if (e.target.classList.contains('data-journey-container') || 
            e.target.classList.contains('background-narrative')) {
            setHighlight(false);
            setActiveMode('');
            setShowModeHint(false);
        }
    };

    // Handle mode selection with mobile feedback
    const handleModeSelection = (mode) => {
        setActiveMode(mode);
        setHighlight(true);
        if (isMobile) {
            setShowModeHint(true);
            // Auto-hide hint after 4 seconds
            setTimeout(() => setShowModeHint(false), 4000);
        }
    };

    // Mobile Component
    const MobileProjects = () => (
        <div className="mobile-projects-wrapper">
            {/* Mobile Header */}
            <div className="mobile-projects-header">
                <h1 className="mobile-projects-title">My Projects</h1>
                <p className="mobile-projects-subtitle">Professional Journey & Academic Work</p>
            </div>

            {/* Mobile Mode Controls */}
            <div className="mobile-mode-controls">
                <button
                    onClick={() => handleModeSelection("process-mining-analyst")}
                    className={`mobile-mode-btn ${activeMode === "process-mining-analyst" && highlight ? "active process-mining" : ""}`}
                >
                    <span className="mobile-mode-icon">⚙️</span>
                    <span className="mobile-mode-text">Process Mining</span>
                </button>
                <button
                    onClick={() => handleModeSelection("data-analyst")}
                    className={`mobile-mode-btn ${activeMode === "data-analyst" && highlight ? "active data-analyst" : ""}`}
                >
                    <span className="mobile-mode-icon">📊</span>
                    <span className="mobile-mode-text">Data Analytics</span>
                </button>
                <button
                    onClick={() => {
                        setHighlight(false);
                        setActiveMode('');
                        setShowModeHint(false);
                    }}
                    className={`mobile-mode-btn reset ${!highlight ? "active" : ""}`}
                >
                    <span className="mobile-mode-icon">👁️</span>
                    <span className="mobile-mode-text">View All</span>
                </button>
            </div>

            {/* Mode Selection Hint */}
            {showModeHint && (
                <div className="mobile-mode-hint">
                    <div className="mobile-hint-content">
                        <span className="mobile-hint-icon">👇</span>
                        <span className="mobile-hint-text">
                            Scroll down to see {activeMode === "process-mining-analyst" ? "Process Mining" : "Data Analytics"} projects highlighted
                        </span>
                    </div>
                </div>
            )}

            {/* Mobile Stats Overview */}
            <div className="mobile-stats-overview">
                <div className="mobile-stat-card">
                    <span className="mobile-stat-number">5+</span>
                    <span className="mobile-stat-label">Years Experience</span>
                </div>
                <div className="mobile-stat-card">
                    <span className="mobile-stat-number">4</span>
                    <span className="mobile-stat-label">Professional Roles</span>
                </div>
                <div className="mobile-stat-card">
                    <span className="mobile-stat-number">6+</span>
                    <span className="mobile-stat-label">Academic Projects</span>
                </div>
            </div>

            {/* Professional Journey Section */}
            <section className="mobile-professional-section">
                <div className="mobile-section-header">
                    <h2 className="mobile-section-title">Professional Journey</h2>
                    <div className="mobile-section-subtitle">Work Experience & Career Growth</div>
                </div>
                <div className="mobile-section-content">
                    <ProfessionalTimeline 
                        mode={activeMode} 
                        highlight={highlight}
                        prominence="high"
                        isMobile={true}
                    />
                </div>
            </section>

            {/* Academic Projects Section */}
            <section className="mobile-academic-section">
                <div className="mobile-section-header">
                    <h2 className="mobile-section-title">Academic Projects</h2>
                    <div className="mobile-section-subtitle">University Research & Development</div>
                </div>
                <div className="mobile-section-content">
                    <AcademicProjectsGrid 
                        mode={activeMode} 
                        highlight={highlight}
                        prominence="medium"
                        isMobile={true}
                    />
                </div>
            </section>

            {/* Mobile Footer Info */}
            <div className="mobile-projects-footer">
                <div className="mobile-footer-content">
                    <div className="mobile-footer-text">
                        Interested in collaborating? Let's connect and discuss opportunities.
                    </div>
                    <div className="mobile-footer-actions">
                        <button 
                            className="mobile-contact-btn"
                            onClick={() => window.location.href = '/contact'}
                        >
                            Get In Touch
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    // Desktop Component (your existing design)
    const DesktopProjects = () => (
        <div className="projects-page-wrapper">
            {/* Mode Selection Controls */}
            <div className="mode-controls">
                <button
                    onClick={() => { 
                        setActiveMode("process-mining-analyst"); 
                        setHighlight(true); 
                    }}
                    className={`mode-btn ${activeMode === "process-mining-analyst" && highlight ? "active" : ""}`}
                >
                    Process Mining Journey
                </button>
                <button
                    onClick={() => { 
                        setActiveMode("data-analyst"); 
                        setHighlight(true); 
                    }}
                    className={`mode-btn ${activeMode === "data-analyst" && highlight ? "active" : ""}`}
                >
                    Data Analyst Journey
                </button>
                <button
                    onClick={() => {
                        setHighlight(false);
                        setActiveMode('');
                    }}
                    className={`mode-btn reset-btn ${!highlight ? "active" : ""}`}
                >
                    View All
                </button>
            </div>

            {/* Main Data Journey Container */}
            <div 
                className={`data-journey-container ${activeMode}`} 
                onClick={handleReset}
            >
                {/* Dynamic Background Narrative */}
                <div className={`background-narrative ${activeMode}`}>
                    <div className="narrative-pattern"></div>
                </div>

                {/* Skill Evolution Indicator */}
                <div className="journey-progress">
                    <div className="progress-line"></div>
                    <div className="skill-evolution">
                        <span className={`skill-tag ${activeMode === 'process-mining-analyst' && highlight ? 'glow' : ''}`}>
                            Process Mining
                        </span>
                        <span className={`skill-tag ${activeMode === 'data-analyst' && highlight ? 'glow' : ''}`}>
                            Data Analytics
                        </span>
                        <span className="skill-tag">Machine Learning</span>
                        <span className="skill-tag">Business Intelligence</span>
                    </div>
                </div>

                {/* Professional Timeline - Main Pipeline */}
                <section className="professional-pipeline">
                    <h2 className="section-title prominent">Professional Journey</h2>
                    <div className="pipeline-container">
                        <ProfessionalTimeline 
                            mode={activeMode} 
                            highlight={highlight}
                            prominence="high"
                            isMobile={false}
                        />
                    </div>
                </section>

                {/* Academic Projects - Branching Nodes */}
                <section className="academic-nodes">
                    <h2 className="section-title">Academic Projects</h2>
                    <div className="nodes-container">
                        <AcademicProjectsGrid 
                            mode={activeMode} 
                            highlight={highlight}
                            prominence="medium"
                            isMobile={false}
                        />
                    </div>
                </section>

                {/* Skill Connections Overlay */}
                <div className="skill-connections">
                    <svg className="connections-svg" width="100%" height="100%">
                        <defs>
                            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="rgba(24, 87, 184, 0.3)" />
                                <stop offset="100%" stopColor="rgba(24, 87, 184, 0.1)" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            </div>
        </div>
    );

    // Main render with device detection
    return isMobile ? <MobileProjects /> : <DesktopProjects />;
}