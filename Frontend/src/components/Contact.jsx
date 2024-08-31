import React from 'react'
import { useNavigate} from "react-router-dom";
import Navbar from './Navbar';
import Footer from './Footer';
function Contact() {
    const navigate = useNavigate(); // Initialize the navigate function
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the form from submitting the traditional way
        navigate('/'); // Navigate to the home page
      };
  return (
    <div>
    <Navbar/>
    <div className="contact-container">
      <h1>Contact Us</h1>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" required />
        </label>
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <label>
          Subject:
          <input type="text" name="subject" required/>
        </label>
        <label>
          Message:
          <textarea name="message" required/>
        </label>
        <button type="submit" >Submit</button>
      </form>
      <div className="contact-info">
        <p>Email: swadeshi9936@gmail.com</p>
        <p>Phone: +917007133096</p>
        <p>Address: Partawal 273301,Maharajganj,Uttar Pradesh,India</p>
      </div>
    </div>
    <Footer/>
    </div>
  )
}

export default Contact
