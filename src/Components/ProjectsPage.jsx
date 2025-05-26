// src/Components/ProjectsPage.jsx
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ProfessionalTimeline from "./ProfessionalTimeline";
import AcademicProjectsGrid from "./AcademicProjectsGrid";
import "./ProjectsPage.css"; // New CSS file for the data journey design

export default function ProjectsPage() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const modeParam = params.get('mode');
    const [activeMode, setActiveMode] = useState(modeParam);
    const [highlight, setHighlight] = useState(true);

    // Reset function for clicking empty areas
    const handleReset = (e) => {
        // Only reset if clicking on the container itself, not child elements
        if (e.target.classList.contains('data-journey-container') || 
            e.target.classList.contains('background-narrative')) {
            setHighlight(false);
            setActiveMode('');
        }
    };

    return (
        <div className="projects-page-wrapper">
            {/* Mode Selection Controls */}
            <div className="mode-controls">
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
                        setActiveMode("process-mining-analyst"); 
                        setHighlight(true); 
                    }}
                    className={`mode-btn ${activeMode === "process-mining-analyst" && highlight ? "active" : ""}`}
                >
                    Process Mining Journey
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
                        <span className={`skill-tag ${activeMode === 'data-analyst' && highlight ? 'glow' : ''}`}>
                            Data Analytics
                        </span>
                        <span className={`skill-tag ${activeMode === 'process-mining-analyst' && highlight ? 'glow' : ''}`}>
                            Process Mining
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
                        {/* Connection lines will be dynamically generated */}
                    </svg>
                </div>
            </div>
        </div>
    );
}