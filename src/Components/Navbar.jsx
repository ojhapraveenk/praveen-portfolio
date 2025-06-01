import React, { useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import logo from '../assets/logo.jpg';
import '@fortawesome/fontawesome-free/css/all.css';
import './Navbar.css';

function Navbar() {
  const navRef = useRef();
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    console.log('Toggle clicked, current state:', toggle); // Debug log
    setToggle(!toggle);
  };

  const handleNavClick = (path) => {
    console.log('Nav clicked:', path); // Debug log
    setToggle(false);
    navigate(path);
  };

  useGSAP(() => {
    gsap.from(
      navRef.current,
      { y: -130, duration: 0.8, delay: 0.4 },
    );
  });

  console.log('Current toggle state:', toggle); // Debug log

  return (
    <nav ref={navRef} className="navbar">
      <div className="logo">
        <img src={logo} alt="Logo" className="logo-img" />
      </div>

      {/* Desktop Menu - Only visible on large screens */}
      <div className={`menu ${toggle ? 'show' : ''}`}>
        <ul className="menu-list">
          <li>
            <button onClick={() => handleNavClick("/section")} className="menu-item">About</button>
          </li>
          <li>
            <button onClick={() => handleNavClick("/education")} className="menu-item">Education</button>
          </li>
          <li>
            <button onClick={() => handleNavClick("/projects")} className="menu-item">Projects</button>
          </li>
          <li>
            <button onClick={() => handleNavClick("/testimonials")} className="menu-item">Testimonials</button>
          </li>
          <li>
            <button onClick={() => handleNavClick("/contact")} className="menu-item">Contact</button>
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
      <div onClick={toggleMenu} className="bars">
        <i className={`fas ${toggle ? 'fa-times' : 'fa-bars'}`}></i>
      </div>
    </nav>
  );
}

export default Navbar;