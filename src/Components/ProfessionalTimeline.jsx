import React, { useState, useRef, useEffect } from "react";
import { timelineRoles } from "../data/projects";
import "./ProfessionalTimeline.css";

function initials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export default function ProfessionalTimeline({
  mode,
  highlight,
  prominence = "medium" // new prop for design hierarchy
}) {
  const [selected, setSelected] = useState(null);
  const [showTataSteel, setShowTataSteel] = useState(false);
  const timelineRef = useRef();
  const containerRef = useRef();
  // Calculate total width needed
  const [totalWidth, setTotalWidth] = useState('100%');

  // // Animate draw of line on mount
  // useEffect(() => {
  //   const line = timelineRef.current;
  //   if (!line) return;
    
  //   const length = line.getTotalLength();
  //   line.style.strokeDasharray = length;
  //   line.style.strokeDashoffset = length;
    
  //   setTimeout(() => {
  //     line.style.strokeDashoffset = 0; // Animates left to right
  //   }, 700);
  // }, []);

  useEffect(() => {
    // Calculate width based on number of nodes
    const nodeWidth = 220; // approximate width per node
    const gap = 32; // 2rem gap
    const padding = 32; // 2rem padding
    const calculatedWidth = (timelineRoles.length * nodeWidth) + ((timelineRoles.length - 1) * gap) + (padding * 2);
    setTotalWidth(`${calculatedWidth}px`);
  }, []);

  // Enhanced mode detection
  const isDA = mode === "data-analyst";
  const isPM = mode === "process-mining-analyst" || mode === "process-mining";
  const isReset = !highlight || (!isDA && !isPM);

  // Enhanced role classification
  const getRoleMode = (role) => {
    if (role.id === "tatasteel-intern") return "data-analyst";
    return "process-mining";
  };

  const getRoleVisibility = (role) => {
    const roleMode = getRoleMode(role);
    
    if (isReset) return "normal";
    if (isDA && roleMode === "data-analyst") return "glow";
    if (isPM && roleMode === "process-mining") return "glow";
    return "dimmed";
  };

  // Calculate timeline line gradient based on mode
  const getTimelineGradient = () => {
    if (isDA) return "url(#dataAnalystGradient)";
    if (isPM) return "url(#processMiningGradient)";
    return "url(#defaultGradient)";
  };

  // Handle node interactions
  const handleNodeClick = (role, idx) => {
    if (role.id === "tatasteel-intern" && isDA) {
      setShowTataSteel(prev => !prev);
    } else {
      setSelected(idx);
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`timeline-container ${prominence} ${mode} ${highlight ? 'highlight-active' : 'highlight-reset'}`}
    >
      {/* Enhanced Timeline Header */}
      <div className="timeline-header">
        <div className="timeline-stats">
          <div className="stat-item">
            <span className="stat-number">5+</span>
            <span className="stat-label">Years Experience</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{timelineRoles.length}</span>
            <span className="stat-label">Roles</span>
          </div>
          {/* <div className="stat-item">
            <span className="stat-number">3</span>
            <span className="stat-label">Companies</span>
          </div> */}
        </div>
      </div>

      <div className="timeline-scroll">
        {/* Enhanced SVG with multiple gradients */}
        <svg 
          height={200} 
          width={totalWidth} 
          style={{ 
            position: "absolute", 
            top: "50%", 
            left: 0, 
            transform: "translateY(-50%)",
            zIndex: 1,
            pointerEvents: "none"
          }}
          className="timeline-svg"
          // viewBox="0 0 100 6"
          // preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="defaultGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1857b8" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
            <linearGradient id="dataAnalystGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1857b8" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
            <linearGradient id="processMiningGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            
            {/* Glow filter for active line */}
            <filter id="timelineGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/> 
              </feMerge>
            </filter>
          </defs>
          
          <line
            ref={timelineRef}
            x1="8%"
            y1="5"
            x2="90%"
            y2="5"
            stroke="#1857b8"
            strokeWidth="9"
            strokeLinecap="round"
            className="timeline-main-line"
            // vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Enhanced Timeline Nodes */}
        <div className="timeline-nodes">
          {timelineRoles.reverse().map((role, idx) => {
            const visibility = getRoleVisibility(role);
            const roleMode = getRoleMode(role);
            
            return (
              <div
                key={role.id}
                className={`timeline-node ${visibility} ${roleMode} ${selected === idx ? 'selected' : ''}`}
                onClick={() => handleNodeClick(role, idx)}
                style={{
                  animationDelay: `${idx * 0.1}s`
                }}
              >
                {/* Enhanced Node Circle */}
                <div className="timeline-node-circle">
                  {role.logo ? (
                    <img 
                      src={role.logo} 
                      alt={role.org} 
                      className="timeline-logo" 
                    />
                  ) : (
                    <span className="timeline-initials">
                      {initials(role.org)}
                    </span>
                  )}
                  
                  {/* Pulse effect for glowing nodes */}
                  {visibility === 'glow' && (
                    <div className="timeline-pulse-ring"></div>
                  )}
                </div>

                {/* Enhanced Node Content */}
                <div className="timeline-node-content">
                  <div className="timeline-role-title">{role.title}</div>
                  <div className="timeline-org-name">{role.org}</div>
                  <div className="timeline-duration">{role.dates}</div>
                  <div className="timeline-location">{role.location}</div>
                  
                  {/* Skill indicators */}
                  <div className="timeline-skills">
                    {roleMode === 'data-analyst' && (
                      <span className="skill-indicator da">DA</span>
                    )}
                    {roleMode === 'process-mining' && (
                      <span className="skill-indicator pm">PM</span>
                    )}
                  </div>
                </div>

                {/* Connection lines to show progression */}
                {idx < timelineRoles.length - 1 && (
                  <div className="timeline-connection">
                    <div className="connection-line"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Enhanced Tata Steel Info Box */}
      {isDA && showTataSteel && (
        <div className="timeline-info-box enhanced">
          <div className="info-box-header">
            <img 
              src={timelineRoles.find(r => r.id === "tatasteel-intern")?.logo} 
              alt="Tata Steel"
              className="info-box-logo"
            />
            <div>
              <div className="info-box-title">
                {timelineRoles.find(r => r.id === "tatasteel-intern")?.title}
              </div>
              <div className="info-box-meta">
                {timelineRoles.find(r => r.id === "tatasteel-intern")?.org} • 
                {timelineRoles.find(r => r.id === "tatasteel-intern")?.dates}
              </div>
            </div>
          </div>
          <div className="info-box-content">
            <ul className="info-box-bullets">
              {timelineRoles.find(r => r.id === "tatasteel-intern")?.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Enhanced Modal */}
      {selected !== null && (
        <div className="timeline-modal enhanced">
          <div className="modal-backdrop" onClick={() => setSelected(null)}></div>
          <div className="modal-content">
            <button 
              className="modal-close" 
              onClick={() => setSelected(null)}
            >
              <span>&times;</span>
            </button>
            
            <div className="modal-header">
              {timelineRoles[selected].logo ? (
                <img 
                  src={timelineRoles[selected].logo} 
                  alt={timelineRoles[selected].org} 
                  className="modal-logo" 
                />
              ) : (
                <div className="modal-initials-circle">
                  <span className="modal-initials">
                    {initials(timelineRoles[selected].org)}
                  </span>
                </div>
              )}
              
              <div className="modal-title-section">
                <h2 className="modal-title">{timelineRoles[selected].title}</h2>
                <h3 className="modal-org">{timelineRoles[selected].org}</h3>
                <div className="modal-meta">
                  <span className="modal-location">{timelineRoles[selected].location}</span>
                  <span className="modal-dates">{timelineRoles[selected].dates}</span>
                </div>
              </div>
            </div>

            <div className="modal-body">
              <h4 className="modal-section-title">Key Achievements</h4>
              <ul className="modal-bullets">
                {timelineRoles[selected].bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}