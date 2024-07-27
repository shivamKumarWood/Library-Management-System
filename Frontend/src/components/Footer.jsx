import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <>
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>About Our Library Management System</h3>
          <p>
            Our library management system offers a comprehensive solution for managing 
            library resources, improving operational efficiency, and enhancing user experience.
          </p>
        </div>
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p><span className="footer-span">Email: </span>swadeshi9936@gmail.com</p>
          <p><span className="footer-span">Mobile: </span>+917007133096</p>
          <p><span className="footer-span">Address:</span> partawal 273301,maharajganj,up,India</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Copyright ⓒ {year}. All rights reserved.</p>
      </div>
    </footer>
    </>
  );
}

export default Footer;