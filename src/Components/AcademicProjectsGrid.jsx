import React, { useState } from "react";
import { academicProjects } from "../data/projects";
import "./AcademicProjectsGrid.css";

function AcademicProjectsGrid({ 
  mode, 
  highlight, 
  prominence = "medium" // new prop for design hierarchy
}) {
  const [modal, setModal] = useState(null);
  const [hoveredProject, setHoveredProject] = useState(null);

  // Enhanced filtering logic
  const getProjectMode = (project) => {
    if (project.id === "conformance-insights") return "process-mining";
    return "data-analyst";
  };

  const getProjectVisibility = (project) => {
    const projectMode = getProjectMode(project);
    const isDA = mode === "data-analyst";
    const isPM = mode === "process-mining-analyst" || mode === "process-mining";
    const isReset = !highlight || (!isDA && !isPM);

    if (isReset) return "normal";
    if (isDA && projectMode === "data-analyst") return "glow";
    if (isPM && projectMode === "process-mining") return "glow";
    return "dimmed";
  };

  // Filter projects based on mode - but show all when reset
  const getFilteredProjects = () => {
    if (!highlight || (!mode || mode === "")) {
      return academicProjects; // Show all projects when reset
    }
    
    if (mode === "data-analyst") {
      return academicProjects.filter(p => p.id !== "conformance-insights");
    } else if (mode === "process-mining-analyst" || mode === "process-mining") {
      return academicProjects.filter(p => p.id === "conformance-insights");
    }
    
    return academicProjects;
  };

  const filteredProjects = getFilteredProjects();

  // Enhanced project statistics
  const getProjectStats = () => {
    const totalProjects = filteredProjects.length;
    const featuredProjects = filteredProjects.filter(p => p.featured).length;
    const universities = [...new Set(filteredProjects.map(p => p.uni))].length;
    
    return { totalProjects, featuredProjects, universities };
  };

  const { totalProjects, featuredProjects, universities } = getProjectStats();

  return (
    <section className={`apg-container ${prominence} ${mode} ${highlight ? 'highlight-active' : 'highlight-reset'}`}>
      
      {/* Enhanced Header with Stats */}
      <div className="apg-header">
        <div className="apg-stats">
          <div className="apg-stat-item">
            <span className="apg-stat-number">{totalProjects}</span>
            <span className="apg-stat-label">Projects</span>
          </div>
          <div className="apg-stat-item">
            <span className="apg-stat-number">{featuredProjects}</span>
            <span className="apg-stat-label">Featured</span>
          </div>
          <div className="apg-stat-item">
            <span className="apg-stat-number">{universities}</span>
            <span className="apg-stat-label">Universities</span>
          </div>
        </div>
      </div>

      {/* Enhanced Grid */}
      <div className="apg-grid">
        {filteredProjects.map((project, index) => {
          const visibility = getProjectVisibility(project);
          const projectMode = getProjectMode(project);
          
          return (
            <div
              className={`apg-card ${visibility} ${projectMode} ${hoveredProject === project.id ? 'hovered' : ''}`}
              key={project.id}
              onClick={() => setModal(project)}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* Enhanced Image Container */}
              <div className="apg-imgbox">
                <div className="apg-img-container">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="apg-img" 
                    />
                  ) : (
                    <div className="apg-img-placeholder">
                      <span className="apg-placeholder-icon">📊</span>
                    </div>
                  )}
                  
                  {/* Overlay effects */}
                  <div className="apg-img-overlay">
                    <div className="apg-overlay-content">
                      <span className="apg-view-details">View Details</span>
                    </div>
                  </div>
                </div>

                {/* Enhanced Badges */}
                {project.featured && (
                  <div className="apg-badge-featured">
                    <span className="apg-badge-icon">⭐</span>
                    Featured
                  </div>
                )}
                
                <div className="apg-badge-uni">
                  <img 
                    src={project.uniLogo} 
                    alt={project.uni} 
                    className="apg-uni-logo" 
                  />
                  <span className="apg-uni-name">{project.uni}</span>
                </div>

                {/* Mode indicator */}
                <div className="apg-mode-indicator">
                  <span className={`apg-mode-tag ${projectMode}`}>
                    {projectMode === 'data-analyst' ? 'DA' : 'PM'}
                  </span>
                </div>

                {/* Pulse effect for glowing cards */}
                {visibility === 'glow' && (
                  <div className="apg-pulse-ring"></div>
                )}
              </div>

              {/* Enhanced Content */}
              <div className="apg-content">
                <div className="apg-title-short">{project.title}</div>
                <div className="apg-summary">{project.summary}</div>
                
                {/* Tech Stack */}
                <div className="apg-tech">
                  {project.tech.slice(0, 4).map((tech, i) => (
                    <span className="apg-tech-tag" key={i}>
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="apg-tech-more">
                      +{project.tech.length - 4} more
                    </span>
                  )}
                </div>

                {/* Project Links Preview */}
                {project.links && project.links.length > 0 && (
                  <div className="apg-links-preview">
                    <span className="apg-links-icon">🔗</span>
                    <span className="apg-links-text">
                      {project.links.length} link{project.links.length > 1 ? 's' : ''} available
                    </span>
                  </div>
                )}
              </div>

              {/* Hover Indicator */}
              <div className="apg-hover-indicator">
                <span>Click to explore</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Enhanced Modal */}
      {modal && (
        <div className="apg-modal-backdrop enhanced" onClick={() => setModal(null)}>
          <div className="apg-modal enhanced" onClick={e => e.stopPropagation()}>
            <button 
              className="apg-modal-close" 
              onClick={() => setModal(null)}
            >
              <span>&times;</span>
            </button>

            {/* Modal Header */}
            <div className="apg-modal-header">
              <div className="apg-modal-img-container">
                {modal.image ? (
                  <img 
                    src={modal.image} 
                    alt={modal.title} 
                    className="apg-modal-img" 
                  />
                ) : (
                  <div className="apg-modal-img-placeholder">
                    <span className="apg-placeholder-icon">📊</span>
                  </div>
                )}
                
                {modal.featured && (
                  <div className="apg-modal-badge-featured">
                    <span className="apg-badge-icon">⭐</span>
                    Featured Project
                  </div>
                )}
              </div>

              <div className="apg-modal-title-section">
                <h2 className="apg-modal-title">{modal.title}</h2>
                
                <div className="apg-modal-uni-section">
                  <img 
                    src={modal.uniLogo} 
                    alt={modal.uni} 
                    className="apg-modal-uni-logo" 
                  />
                  <span className="apg-modal-uni-name">{modal.uni}</span>
                </div>

                <div className="apg-modal-mode">
                  <span className={`apg-modal-mode-tag ${getProjectMode(modal)}`}>
                    {getProjectMode(modal) === 'data-analyst' ? 'Data Analytics Project' : 'Process Mining Project'}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="apg-modal-body">
              <div className="apg-modal-summary-section">
                <h3 className="apg-modal-section-title">Project Overview</h3>
                <p className="apg-modal-summary">{modal.summary}</p>
              </div>

              {modal.details && modal.details.length > 0 && (
                <div className="apg-modal-details-section">
                  <h3 className="apg-modal-section-title">Key Achievements</h3>
                  <ul className="apg-modal-details">
                    {modal.details.map((detail, i) => (
                      <li key={i}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="apg-modal-tech-section">
                <h3 className="apg-modal-section-title">Technologies Used</h3>
                <div className="apg-modal-tech">
                  {modal.tech.map((tech, i) => (
                    <span className="apg-tech-tag enhanced" key={i}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            {modal.links && modal.links.length > 0 && (
              <div className="apg-modal-footer">
                <div className="apg-modal-links">
                  {modal.links.map((link, i) => (
                    <a
                      href={link.url}
                      key={i}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="apg-modal-link"
                    >
                      <span className="apg-link-icon">🔗</span>
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default AcademicProjectsGrid;