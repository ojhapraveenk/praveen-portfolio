import React, { useState, useEffect, useRef } from 'react';
import profilePhoto from '../assets/profile_photo.jpg';
import './Contact.css';
import './MobileContact.css';

function Contact() {
  const [selectedContact, setSelectedContact] = useState(null);
  const [processStep, setProcessStep] = useState('initiated');
  const [hoveredMethod, setHoveredMethod] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const flowLinesRef = useRef();

  // Contact methods with correct info from navbar
  const contactMethods = [
    {
      id: 'email',
      icon: 'fas fa-envelope',
      label: 'Email',
      value: 'ojha.praveenk@gmail.com',
      href: 'mailto:ojha.praveenk@gmail.com',
      color: '#3b82f6',
      status: '< 24h response',
      angle: 0,
      priority: 'primary'
    },
    {
      id: 'phone',
      icon: 'fas fa-phone',
      label: 'Phone',
      value: '+49 152 0759 8759',
      href: 'tel:+4915207598759',
      color: '#10b981',
      status: 'Available weekdays',
      angle: 216,
      priority: 'primary'
    },
    {
      id: 'linkedin',
      icon: 'fab fa-linkedin',
      label: 'LinkedIn',
      value: 'praveenojha3110',
      href: 'https://linkedin.com/in/praveenojha3110',
      color: '#0077b5',
      status: 'Professional network',
      angle: 288,
      priority: 'secondary'
    },
    {
      id: 'gitlab',
      icon: 'fab fa-gitlab',
      label: 'GitLab',
      value: 'ojha.praveenk',
      href: 'https://git.rwth-aachen.de/ojha.praveenk',
      color: '#fc6d26',
      status: 'Code & projects',
      angle: 144,
      priority: 'secondary'
    },
    {
      id: 'location',
      icon: 'fas fa-map-marker-alt',
      label: 'Location',
      value: 'Aachen, Germany',
      href: 'https://maps.app.goo.gl/BYVXDmKzZkyoUsrq9',
      color: '#8b5cf6',
      status: 'Open to meet',
      angle: 72,
      priority: 'tertiary'
    }
  ];

  // Process mining steps (for desktop only)
  const processSteps = [
    { id: 'initiated', label: 'Contact Process Initiated', status: 'completed' },
    { id: 'method-selection', label: 'Select Communication Method', status: processStep === 'initiated' ? 'active' : 'completed' },
    { id: 'data-processing', label: 'Processing Contact Request', status: processStep === 'processing' ? 'active' : 'pending' },
    { id: 'connection-established', label: 'Connection Established', status: processStep === 'connected' ? 'completed' : 'pending' }
  ];

  // Check if mobile
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Animate process steps (desktop only)
  useEffect(() => {
    if (!isMobile) {
      const timer = setTimeout(() => {
        if (processStep === 'initiated') {
          setProcessStep('method-selection');
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [processStep, isMobile]);

  // Handle contact method selection
  const handleContactClick = (method) => {
    setSelectedContact(method);
    if (!isMobile) {
      setProcessStep('processing');
      setTimeout(() => {
        setProcessStep('connected');
        window.open(method.href, '_blank');
      }, 1500);
    } else {
      // Simple immediate navigation on mobile
      window.open(method.href, '_blank');
    }
  };

  // Mobile Component
  const MobileContact = () => (
    <div className="mobile-contact-container">
      {/* Mobile Header */}
      <div className="mobile-header">
        <h1 className="mobile-title">Contact Me</h1>
      </div>

      {/* Mobile Stats - Horizontal Scroll */}
      <div className="mobile-stats-container">
        <div className="mobile-stats">
          <div className="mobile-stat-card">
            <span className="mobile-stat-number">5</span>
            <span className="mobile-stat-label">Contact Methods</span>
          </div>
          <div className="mobile-stat-card">
            <span className="mobile-stat-number">24h</span>
            <span className="mobile-stat-label">Avg Response</span>
          </div>
          <div className="mobile-stat-card">
            <span className="mobile-stat-number">100%</span>
            <span className="mobile-stat-label">Success Rate</span>
          </div>
        </div>
      </div>

      {/* Mobile Profile Section */}
      <div className="mobile-profile-section">
        <div className="mobile-profile-container">
          <img src={profilePhoto} alt="Praveen Kumar Ojha" className="mobile-profile-img" />
          <div className="mobile-profile-status">
            <div className="mobile-status-dot"></div>
            <span>Open to work</span>
          </div>
        </div>
      </div>

      {/* Mobile Contact Methods - Vertical Stack */}
      <div className="mobile-contact-methods">
        <h2 className="mobile-section-title">Get In Touch</h2>
        
        {/* Primary Methods */}
        <div className="mobile-methods-group">
          <h3 className="mobile-group-title">Primary Contact</h3>
          {contactMethods.filter(method => method.priority === 'primary').map((method) => (
            <div
              key={method.id}
              className="mobile-contact-card primary"
              onClick={() => handleContactClick(method)}
              style={{'--method-color': method.color}}
            >
              <div className="mobile-card-icon">
                <i className={method.icon}></i>
              </div>
              <div className="mobile-card-content">
                <div className="mobile-card-label">{method.label}</div>
                <div className="mobile-card-value">{method.value}</div>
                <div className="mobile-card-status">{method.status}</div>
              </div>
              <div className="mobile-card-arrow">
                <i className="fas fa-arrow-right"></i>
              </div>
            </div>
          ))}
        </div>

        {/* Secondary Methods */}
        <div className="mobile-methods-group">
          <h3 className="mobile-group-title">Professional</h3>
          {contactMethods.filter(method => method.priority === 'secondary').map((method) => (
            <div
              key={method.id}
              className="mobile-contact-card secondary"
              onClick={() => handleContactClick(method)}
              style={{'--method-color': method.color}}
            >
              <div className="mobile-card-icon">
                <i className={method.icon}></i>
              </div>
              <div className="mobile-card-content">
                <div className="mobile-card-label">{method.label}</div>
                <div className="mobile-card-value">{method.value}</div>
                <div className="mobile-card-status">{method.status}</div>
              </div>
              <div className="mobile-card-arrow">
                <i className="fas fa-arrow-right"></i>
              </div>
            </div>
          ))}
        </div>

        {/* Tertiary Methods */}
        <div className="mobile-methods-group">
          <h3 className="mobile-group-title">Location</h3>
          {contactMethods.filter(method => method.priority === 'tertiary').map((method) => (
            <div
              key={method.id}
              className="mobile-contact-card tertiary"
              onClick={() => handleContactClick(method)}
              style={{'--method-color': method.color}}
            >
              <div className="mobile-card-icon">
                <i className={method.icon}></i>
              </div>
              <div className="mobile-card-content">
                <div className="mobile-card-label">{method.label}</div>
                <div className="mobile-card-value">{method.value}</div>
                <div className="mobile-card-status">{method.status}</div>
              </div>
              <div className="mobile-card-arrow">
                <i className="fas fa-arrow-right"></i>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Footer */}
      <div className="mobile-footer">
        <div className="mobile-availability">
          <div className="mobile-availability-card">
            <i className="fas fa-clock"></i>
            <div>
              <span className="mobile-info-label">Response Time</span>
              <span className="mobile-info-value">Within 24 hours</span>
            </div>
          </div>
          <div className="mobile-availability-card">
            <i className="fas fa-calendar"></i>
            <div>
              <span className="mobile-info-label">Availability</span>
              <span className="mobile-info-value">Monday - Friday</span>
            </div>
          </div>
          <div className="mobile-availability-card">
            <i className="fas fa-globe"></i>
            <div>
              <span className="mobile-info-label">Timezone</span>
              <span className="mobile-info-value">CET (GMT+2)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Desktop Component (your existing design)
  const DesktopContact = () => (
    <div className="contact-container">
      {/* Animated Background */}
      <div className="contact-background">
        <div className="process-particles"></div>
        <div className="data-flow-lines"></div>
      </div>

      {/* Process Mining Header */}
      <div className="process-header">
        <div className="process-title">
          <h1 className="main-title">Contact Me</h1>
        </div>
        
        <div className="process-stats">
          <div className="stat-card">
            <span className="stat-number">5</span>
            <span className="stat-label">Contact Methods</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">24h</span>
            <span className="stat-label">Avg Response</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">100%</span>
            <span className="stat-label">Success Rate</span>
          </div>
        </div>
      </div>

      {/* Main Process Flow */}
      <div className="process-flow-container">
        
        {/* Process Steps Timeline */}
        <div className="process-steps">
          {processSteps.map((step, index) => (
            <div key={step.id} className={`process-step ${step.status}`}>
              <div className="step-indicator">
                <div className="step-number">{index + 1}</div>
                {step.status === 'active' && <div className="step-pulse"></div>}
              </div>
              <div className="step-content">
                <div className="step-label">{step.label}</div>
                <div className="step-status">{step.status}</div>
              </div>
              {index < processSteps.length - 1 && (
                <div className={`step-connector ${step.status === 'completed' ? 'active' : ''}`}></div>
              )}
            </div>
          ))}
        </div>

        {/* Central Hub - Large Profile Photo */}
        <div className="central-hub">
          <div className="profile-container">
            {/* Orbital Rings */}
            <div className="orbital-ring ring-1"></div>
            <div className="orbital-ring ring-2"></div>
            <div className="orbital-ring ring-3"></div>
            
            {/* Profile Photo */}
            <div className="profile-photo-large">
              <img src={profilePhoto} alt="Praveen Kumar Ojha" className="profile-img" />
              <div className="profile-glow"></div>
              <div className="profile-status">
                <div className="status-dot"></div>
                <span>Open to work</span>
              </div>
            </div>

            {/* Floating Skills */}
            <div className="floating-skills">
              <div className="skill-badge" style={{animationDelay: '0s'}}>Process Mining</div>
              <div className="skill-badge" style={{animationDelay: '0.5s'}}>Data Analytics</div>
              <div className="skill-badge" style={{animationDelay: '1s'}}>Machine Learning</div>
              <div className="skill-badge" style={{animationDelay: '1.5s'}}>Business Intelligence</div>
            </div>
          </div>

          {/* Contact Methods Orbital */}
          <div className="contact-methods-orbital">
            {contactMethods.map((method, index) => (
              <div
                key={method.id}
                className={`contact-method-node ${hoveredMethod === method.id ? 'hovered' : ''} ${selectedContact?.id === method.id ? 'selected' : ''}`}
                style={{
                  '--angle': `${method.angle}deg`,
                  '--delay': `${index * 0.2}s`
                }}
                onMouseEnter={() => setHoveredMethod(method.id)}
                onMouseLeave={() => setHoveredMethod(null)}
                onClick={() => handleContactClick(method)}
              >
                <div className="method-circle" style={{'--method-color': method.color}}>
                  <i className={method.icon}></i>
                  <div className="method-pulse"></div>
                </div>
                
                <div className="method-info">
                  <div className="method-label">{method.label}</div>
                  <div className="method-value">{method.value}</div>
                  <div className="method-status">{method.status}</div>
                </div>

                {/* Connection Line */}
                <div className="connection-line">
                  <svg width="100" height="2">
                    <line x1="0" y1="1" x2="100" y2="1" stroke={method.color} strokeWidth="2" strokeDasharray="5,5">
                      <animate attributeName="stroke-dashoffset" values="10;0" dur="2s" repeatCount="indefinite" />
                    </line>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Flow Visualization */}
        <div className="flow-visualization" ref={flowLinesRef}>
          <svg className="flow-svg" width="100%" height="100%">
            <defs>
              <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8"/>
                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.6"/>
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.4"/>
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {contactMethods.map((method, index) => (
              <g key={method.id}>
                <path
                  d={`M 50,50 Q ${50 + Math.cos(method.angle * Math.PI / 180) * 30},${50 + Math.sin(method.angle * Math.PI / 180) * 30} ${50 + Math.cos(method.angle * Math.PI / 180) * 60},${50 + Math.sin(method.angle * Math.PI / 180) * 60}`}
                  stroke="url(#flowGradient)"
                  strokeWidth="2"
                  fill="none"
                  filter="url(#glow)"
                  className="flow-path"
                  style={{animationDelay: `${index * 0.3}s`}}
                />
                <circle
                  cx="50"
                  cy="50"
                  r="2"
                  fill={method.color}
                  className="flow-particle"
                  style={{animationDelay: `${index * 0.5}s`}}
                >
                  <animateMotion dur="3s" repeatCount="indefinite">
                    <mpath href={`#path-${method.id}`}/>
                  </animateMotion>
                </circle>
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* Footer Info */}
      <div className="contact-footer">
        <div className="footer-content">
          <div className="availability-info">
            <div className="availability-card">
              <i className="fas fa-clock"></i>
              <div>
                <span className="info-label">Response Time</span>
                <span className="info-value">Within 24 hours</span>
              </div>
            </div>
            <div className="availability-card">
              <i className="fas fa-calendar"></i>
              <div>
                <span className="info-label">Availability</span>
                <span className="info-value">Monday - Friday</span>
              </div>
            </div>
            <div className="availability-card">
              <i className="fas fa-globe"></i>
              <div>
                <span className="info-label">Timezone</span>
                <span className="info-value">CET (GMT+2)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Main render with device detection
  if (isMobile) {
    return <MobileContact />;
  } else {
    return <DesktopContact />;
  }
}

export default Contact;