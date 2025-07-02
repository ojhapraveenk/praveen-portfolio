import React, { useRef, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import Section from './Components/Section';
import Education from './Components/Education';
import Projects from './Components/ProjectsPage';
import Testimonials from './Components/Testimonials';
import Contact from './Components/Contact';

// New Single Page Component
function SinglePage() {
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

      {/* Projects */}
      <section ref={sectionRefs.projects} id="projects" className="min-h-screen section-spacing">
        <Projects />
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
        
        {/* Keep individual routes for direct access */}
        <Route path="/education" element={<Education />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;