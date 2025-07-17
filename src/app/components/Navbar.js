'use client';

import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      if (scrollTop > (window.lastScrollTop || 0)) {
        document.getElementById('main-navbar').style.top = `-${document.getElementById('main-navbar').offsetHeight}px`;
      } else {
        document.getElementById('main-navbar').style.top = '0';
      }
      window.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header id="main-navbar" className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="logo">
          <img src="/logo.png" alt="Suitmedia Logo" />
        </div>
        <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <i className="fas fa-bars"></i>
          <i className="fas fa-times"></i>
        </div>
        <nav className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            {['Work', 'About', 'Services', 'Ideas', 'Careers', 'Contact'].map((item) => (
              <li key={item}>
                <a
                  href={`/${item.toLowerCase()}`}
                  className={item === 'Ideas' ? 'active' : ''}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}