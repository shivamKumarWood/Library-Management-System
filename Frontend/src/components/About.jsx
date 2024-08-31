import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
function About() {
  return (
    <div>
    <Navbar/>
    <div className="about-container">
      <h1>About Us</h1>
      <p>
        Welcome to our Library Management System. We are dedicated to providing
        a seamless and efficient experience for managing and accessing library
        resources. Our mission is to support the love of reading and lifelong
        learning through innovative technology and exceptional service.
      </p>
      <h2>Our History</h2>
      <p>
        Founded in 2024, our library system has grown to serve thousands of
        users, providing access to a vast collection of books, journals, and
        digital resources. We are proud of our journey and the milestones we
        have achieved.
      </p>
      <h2>Our Team</h2>
      <div className="team">
        <div className="team-member">
         
          <p>Shivam Kumar - Founder & CEO</p>
        </div>
        <div className="team-member">
          
          <p>Punit - Head Librarian</p>
        </div>
        <div className="team-member">
          
          <p>Shubham - Assisstant Librarian</p>
        </div>
    
      </div>
      <h2>Our Values</h2>
      <p>
        We believe in the power of knowledge and the importance of community. Our
        core values include accessibility, innovation, and a commitment to
        fostering a love of reading in all our users.
      </p>
      <h2>Testimonials</h2>
      <p>
        "This library system has transformed the way I access and manage books.
        The user-friendly interface and vast resources are unmatched." - Happy
        User
      </p>
      
    </div>
    <Footer/>
    </div>
  )
}

export default About
