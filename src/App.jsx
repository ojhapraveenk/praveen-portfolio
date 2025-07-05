import React, { useRef, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Navbar from './Components/Navbar';
import Section from './Components/Section';
import Education from './Components/Education';
import Projects from './Components/ProjectsPage';
import Testimonials from './Components/Testimonials';
import Contact from './Components/Contact';

// Component to handle /projects route with mode parameter
function ProjectsRedirect() {
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Extract mode parameter and redirect to main page with hash
    const params = new URLSearchParams(location.search);
    const mode = params.get('mode');
    
    if (mode) {
      // Redirect to main page with projects hash and mode parameter
      // Use state to pass the mode parameter since hash URLs don't preserve query params well
      navigate('/', { 
        replace: true, 
        state: { 
          scrollTo: 'projects', 
          mode: mode 
        } 
      });
    } else {
      // Redirect to main page projects section
      navigate('/', { 
        replace: true, 
        state: { 
          scrollTo: 'projects' 
        } 
      });
    }
  }, [location, navigate]);

  return <div>Redirecting...</div>;
}

// New Single Page Component
function SinglePage() {
  const location = useLocation();
  const sectionRefs = {
    section: useRef(null),
    education: useRef(null),
    projects: useRef(null),
    testimonials: useRef(null),
    contact: useRef(null)
  };

  const [activeSection, setActiveSection] = useState('section');

  // Smooth scroll to section
  const scrollToSection = (sectionName) => {
    const element = sectionRefs[sectionName]?.current;
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Handle initial navigation based on hash and location state
  useEffect(() => {
    // Check for navigation state from redirect
    if (location.state?.scrollTo) {
      const targetSection = location.state.scrollTo;
      if (sectionRefs[targetSection]) {
        setTimeout(() => {
          scrollToSection(targetSection);
        }, 100);
      }
      return;
    }
    
    // Fallback to hash-based navigation
    const hash = location.hash.replace('#', '');
    if (hash && sectionRefs[hash]) {
      setTimeout(() => {
        scrollToSection(hash);
      }, 100);
    }
  }, [location.hash, location.state]);

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for navbar

      // Check which section is currently in view
      for (const [sectionName, ref] of Object.entries(sectionRefs)) {
        if (ref.current) {
          const element = ref.current;
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(sectionName);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Expose scroll function globally for navbar
  useEffect(() => {
    window.scrollToSection = scrollToSection;
    window.activeSection = activeSection;
  }, [activeSection]);

  return (
    <div className="single-page-container">
      {/* Section - Home/About */}
      <section ref={sectionRefs.section} id="section" className="min-h-screen section-spacing">
        <Section />
      </section>

      {/* Education */}
      <section ref={sectionRefs.education} id="education" className="min-h-screen section-spacing">
        <Education />
      </section>

      {/* Projects - Pass mode from navigation state */}
      <section ref={sectionRefs.projects} id="projects" className="min-h-screen section-spacing">
        <Projects mode={location.state?.mode} />
      </section>

      {/* Testimonials */}
      <section ref={sectionRefs.testimonials} id="testimonials" className="min-h-screen section-spacing">
        <Testimonials />
      </section>

      {/* Contact */}
      <section ref={sectionRefs.contact} id="contact" className="min-h-screen section-spacing">
        <Contact />
      </section>
    </div>
  );
}

function App() {
  return (
    <Router>
      {/* Navbar is always displayed */}
      <Navbar />

      {/* Main content area */}
      <Routes>
        {/* Main single page route */}
        <Route path="/" element={<SinglePage />} />
        <Route path="/section" element={<SinglePage />} />
        
        {/* Handle /projects route with redirect to main page */}
        <Route path="/projects" element={<ProjectsRedirect />} />
        
        {/* Keep other individual routes for direct access */}
        <Route path="/education" element={<Education />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;