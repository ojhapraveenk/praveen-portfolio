import React, { useRef, useState, useEffect  } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import logo from '../assets/logo.jpg';
import '@fortawesome/fontawesome-free/css/all.css';
import './Navbar.css';

function Navbar() {
  const navRef = useRef();
  const [toggle, setToggle] = useState(false);
  const [activeSection, setActiveSection] = useState('section');
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we're on the main single page
  const isOnMainPage = location.pathname === '/' || location.pathname === '/section';

  // Update active section based on scroll (only on main page)
  useEffect(() => {
    if (isOnMainPage && window.activeSection) {
      setActiveSection(window.activeSection);
    }
  }, [isOnMainPage]);

  // Listen for active section changes from the main page
  useEffect(() => {
    const checkActiveSection = () => {
      if (isOnMainPage && window.activeSection) {
        setActiveSection(window.activeSection);
      }
    };

    const interval = setInterval(checkActiveSection, 100);
    return () => clearInterval(interval);
  }, [isOnMainPage]);

  const toggleMenu = () => {
    console.log('Toggle clicked, current state:', toggle);
    setToggle(!toggle);
  };

  // Handle navigation clicks
  const handleNavClick = (path, sectionName) => {
    console.log('Nav clicked:', path, sectionName);
    setToggle(false);

    if (isOnMainPage && sectionName && window.scrollToSection) {
      // If on main page, scroll to section
      window.scrollToSection(sectionName);
    } else {
      // If not on main page, navigate to route
      navigate(path);
    }
  };

  // Handle logo click
  const handleLogoClick = () => {
    if (isOnMainPage) {
      // If on main page, scroll to top section
      window.scrollToSection('section');
      // window.location.reload();
    } else {
      // If not on main page, navigate to home
      navigate('/');
    }
  };

  useGSAP(() => {
    gsap.from(
      navRef.current,
      { y: -130, duration: 0.8, delay: 0.4 },
    );
  });

  console.log('Current toggle state:', toggle);

  return (
    <>
      <nav ref={navRef} className="navbar">
        <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          <img src={logo} alt="Logo" className="logo-img" />
        </div>

        {/* Desktop Menu - Only visible on large screens */}
        <div className={`menu ${toggle ? 'show' : ''}`}>
          <ul className="menu-list">
            <li>
              <button 
                onClick={() => handleNavClick("/education", "education")} 
                className={`menu-item ${isOnMainPage && activeSection === 'education' ? 'active' : ''}`}
              >
                Education
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavClick("/projects", "projects")} 
                className={`menu-item ${isOnMainPage && activeSection === 'projects' ? 'active' : ''}`}
              >
                Projects
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavClick("/testimonials", "testimonials")} 
                className={`menu-item ${isOnMainPage && activeSection === 'testimonials' ? 'active' : ''}`}
              >
                Testimonials
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleNavClick("/contact", "contact")} 
                className={`menu-item ${isOnMainPage && activeSection === 'contact' ? 'active' : ''}`}
              >
                Contact
              </button>
            </li>
          </ul>

          <div className="social-icon">
            <ul className="social-list">
              <li className="social-item">
                <a href="mailto:ojha.praveenk@gmail.com" target="_blank" rel="noopener noreferrer">
                  <i className="fas fa-envelope text-white text-2xl"></i>
                </a>
              </li>
              <li className="social-item">
                <a href="https://linkedin.com/in/praveenojha3110" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin text-blue-400 text-2xl"></i>
                </a>
              </li>
              <li className="social-item">
                <a href="https://git.rwth-aachen.de/ojha.praveenk" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-gitlab text-orange-500 text-2xl"></i>
                </a>
              </li>
              <li className="social-item">
                <a href="https://www.google.com/maps/place/Pfaffenwaldring+42A,+70569+Stuttgart,+Germany/" target="_blank" rel="noopener noreferrer">
                  <i className="fas fa-map-marker-alt text-blue-500 text-2xl"></i>
                </a>
              </li>
              <li className="social-item">
                <a href="tel:+4915207598759">
                  <i className="fas fa-phone text-green-500 text-2xl"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Hamburger Button */}
        <div className="bars-container">
          <div 
            onClick={toggleMenu} 
            className={`bars ${toggle ? 'active' : ''}`}
          >
            <i className={`fas ${toggle ? 'fa-times' : 'fa-bars'}`}></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;



// import React, { useRef, useState, useEffect  } from 'react';
// import { useNavigate } from "react-router-dom";
// import gsap from 'gsap';
// import { useGSAP } from '@gsap/react';
// import logo from '../assets/logo.jpg';
// import '@fortawesome/fontawesome-free/css/all.css';
// import './Navbar.css';

// function Navbar() {
//   const navRef = useRef();
//   const [toggle, setToggle] = useState(false);
//   const [showHint, setShowHint] = useState(false);
//   const [isFirstVisit, setIsFirstVisit] = useState(false);
//   const [showMenuPreview, setShowMenuPreview] = useState(false);
//   const navigate = useNavigate();

//   // Hide menu preview after animation
//   useEffect(() => {
//     if (showMenuPreview) {
//       setTimeout(() => setShowMenuPreview(false), 3000);
//     }
//   }, [showMenuPreview]);
  
//   const toggleMenu = () => {
//     console.log('Toggle clicked, current state:', toggle); // Debug log
//     setToggle(!toggle);
//   };

//   const handleNavClick = (path) => {
//     console.log('Nav clicked:', path); // Debug log
//     setToggle(false);
//     navigate(path);
//   };

//   useGSAP(() => {
//     gsap.from(
//       navRef.current,
//       { y: -130, duration: 0.8, delay: 0.4 },
//     );
//   });

//   console.log('Current toggle state:', toggle); // Debug log

//   return (
//     <>
//       <nav ref={navRef} className="navbar">
//         <div className="logo">
//           <img src={logo} alt="Logo" className="logo-img" />
//         </div>

//         {/* Desktop Menu - Only visible on large screens */}
//         <div className={`menu ${toggle ? 'show' : ''}`}>
//           <ul className="menu-list">
//             <li>
//               <button onClick={() => handleNavClick("/section")} className="menu-item">About</button>
//             </li>
//             <li>
//               <button onClick={() => handleNavClick("/education")} className="menu-item">Education</button>
//             </li>
//             <li>
//               <button onClick={() => handleNavClick("/projects")} className="menu-item">Projects</button>
//             </li>
//             <li>
//               <button onClick={() => handleNavClick("/testimonials")} className="menu-item">Testimonials</button>
//             </li>
//             <li>
//               <button onClick={() => handleNavClick("/contact")} className="menu-item">Contact</button>
//             </li>
//           </ul>

//           <div className="social-icon">
//             <ul className="social-list">
//               <li className="social-item">
//                 <a href="mailto:ojha.praveenk@gmail.com" target="_blank" rel="noopener noreferrer">
//                   <i className="fas fa-envelope text-white text-2xl"></i>
//                 </a>
//               </li>
//               <li className="social-item">
//                 <a href="https://linkedin.com/in/praveenojha3110" target="_blank" rel="noopener noreferrer">
//                   <i className="fab fa-linkedin text-blue-400 text-2xl"></i>
//                 </a>
//               </li>
//               <li className="social-item">
//                 <a href="https://git.rwth-aachen.de/ojha.praveenk" target="_blank" rel="noopener noreferrer">
//                   <i className="fab fa-gitlab text-orange-500 text-2xl"></i>
//                 </a>
//               </li>
//               <li className="social-item">
//                 <a href="https://www.google.com/maps/place/Pfaffenwaldring+42A,+70569+Stuttgart,+Germany/" target="_blank" rel="noopener noreferrer">
//                   <i className="fas fa-map-marker-alt text-blue-500 text-2xl"></i>
//                 </a>
//               </li>
//               <li className="social-item">
//                 <a href="tel:+4915207598759">
//                   <i className="fas fa-phone text-green-500 text-2xl"></i>
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Enhanced Hamburger Button with notification badge */}
//         <div className="bars-container">
//           <div 
//             onClick={toggleMenu} 
//             className={`bars ${toggle ? 'active' : ''} ${isFirstVisit ? 'first-visit hint-animation' : ''}`}
//           >
//             <i className={`fas ${toggle ? 'fa-times' : 'fa-bars'}`}></i>
//           </div>
//           {/* Notification badge */}
//           {isFirstVisit && !toggle && (
//             <div className="menu-badge">5</div>
//           )}
//         </div>
//       </nav>
//     </>
//   );
// }

// export default Navbar;