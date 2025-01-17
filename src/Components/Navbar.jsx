import React, { useRef, useState } from 'react';
import { Link } from "react-router";
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

      {/* Corrected className */}
      <div ref={ menuToogle} className={`menu ${toogle ? 'show' : ''}`}>
        <ul className="menu-list">
          <li>
            <Link to="/section" className="menu-item">about</Link>
          </li>
          <li>
            <Link to="/Learn" className="menu-item">learn</Link>
          </li>
          <li>
            <Link to="/portfolio" className="menu-item">portfolio</Link>
          </li>
          <li>
            <Link to="/blog" className="menu-item">blog</Link>
          </li>
          <li>
            <Link to="/contact" className="menu-item">contact</Link>
          </li>
        </ul>

        <div className="social-icon">
          <ul className="social-list">
            <li className="social-item">
              <i className="fab fa-facebook hover:text-blue-400 text-white text-3xl"></i>
            </li>
            <li className="social-item">
              <i className="fab fa-instagram text-pink-600 hover:text-pink-900 text-3xl"></i>
            </li>
            <li className="social-item">
              <i className="fab fa-x-twitter text-white hover:text-gray-400 text-3xl"></i>
            </li>
            <li className="social-item">
              <i className="fab fa-linkedin text-3xl text-blue-600 hover:text-blue-400"></i>
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
