import React, { useRef, useState } from 'react';
import { Link } from "react-router-dom";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import logo from '../assets/logo.jpg';
import '@fortawesome/fontawesome-free/css/all.css';
import './Navbar.css';

function Navbar() {
  const navRef = useRef();
  const menuToogle = useRef();
  const [toogle, setToggle] = useState(false);  

  const toogleMenu = () => {
    setToggle(!toogle);  

  };

  useGSAP(() => {
    gsap.from(
      navRef.current,
      { y: -130, duration: 0.8, delay: 0.4 },
    );
  });

  return (
    <nav ref={navRef} className="navbar">
      <div className="logo">
        <img src={logo} alt="Logo" className="logo-img" />
      </div>

      <div ref={ menuToogle} className={`menu ${toogle ? 'show' : ''}`}>
        <ul className="menu-list">
          <li>
            <Link to="/section" className="menu-item">About</Link>
          </li>
          <li>
            <Link to="/education" className="menu-item">Education</Link>
          </li>
          <li>
            <Link to="/projects" className="menu-item">Projects</Link>
          </li>
          <li>
            <Link to="/testimonials" className="menu-item">Testimonials</Link>
          </li>
          <li>
            <Link to="/contact" className="menu-item">Contact</Link>
          </li>
        </ul>

        <div className="social-icon">
          <ul className="social-list">
            <li className="social-item">
              <a href="mailto:ojha.praveenk@gmail.com" target="_blank" rel="noopener noreferrer">
                <i className="fas fa-envelope hover:text-blue-400 text-white text-2xl"></i>
              </a>
            </li>
            <li className="social-item">
              <a href="https://linkedin.com/in/praveenojha3110" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin text-blue-600 hover:text-blue-400 text-2xl"></i>
              </a>
            </li>
            <li className="social-item">
              <a href="https://git.rwth-aachen.de/ojha.praveenk" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-gitlab text-orange-500 hover:text-orange-600 text-2xl"></i>
              </a>
            </li>
            <li className="social-item">
              <a href="https://www.google.com/maps/place/Pfaffenwaldring+42A,+70569+Stuttgart,+Germany/" target="_blank" rel="noopener noreferrer">
                <i className="fas fa-map-marker-alt text-blue-500 hover:text-blue-800 text-2xl"></i>
              </a>
            </li>
            <li className="social-item">
              <a href="tel:+4915207598759">
                <i className="fas fa-phone text-green-500 hover:text-green-700 text-2xl"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div onClick={toogleMenu} className="bars">
        <i className="fas fa-bars"></i>
      </div>
    </nav>
  );
}

export default Navbar;
