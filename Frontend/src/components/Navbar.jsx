import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${sticky ? 'sticky-navbar' : ''}`}>
      <div className="container-navbar">
        <div className="navbar-brand">
          <h1>Digital Library</h1>
        </div>
        <div className="navbar-items">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a href="/" className="nav-link">Home</a>
            </li>
            <li className="nav-item">
              <a href="/about" className="nav-link">About Us</a>
            </li>
            <li className="nav-item">
              <a href="/contact" className="nav-link">Contact Us</a>
            </li>
          </ul>
          <div className="navbar-buttons">
            <button className="btn login-btn">Login</button>
            <button className="btn profile-btn">Profile</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
