import React from 'react';
import { Link,useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from 'react';
import Signup from './Signup';
import Navbar from "./Navbar"
import Footer from './Footer';
import toast from 'react-hot-toast';

function Login() {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    const navigate = useNavigate(); // Initialize the navigate function
  const onSubmit = async (data) => {
    
    try {
      console.log(data);
      const response = await fetch('http://localhost:3000/login/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Converts the 'body' object to a JSON string
      });
  
      const result = await response.json();
  
      if (response.ok) {
        toast.success("Loggedin Successful");
        console.log(result); // Handle successful signup
        localStorage.setItem('user', JSON.stringify(result.user));
        console.log(JSON.stringify(result.user));
        navigate('/'); // Navigate to the home page
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        toast.error("Error: "+result.error);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Error: "+result.error.response.data.message);
    }
  };
    return (
        
      <div>
      <Navbar/>
      <div className="login_container">
          <div className="modal-box">
            <form onSubmit={handleSubmit(onSubmit)} method='dialog'>
             <Link
              to="/"
              className="close_button"
            >
              ✕close
            </Link>
  
              <h3 className="modal-title">Login</h3>
              <h4 style={{textAlign:"center",justifyContent:"center"}}>Please Login to visit Library</h4>
              <div className="input-group">
                <span>Email</span>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input-field"
                  {...register("email_id", { required: true })}
                />
                {errors.email_id && (
                  <span className="error-message">
                    This field is required
                  </span>
                )}
              </div>
  
              <div className="input-group">
                <span>Password</span>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="input-field"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <span className="error-message">
                    This field is required
                  </span>
                )}
              </div>
  
              <div className="action-group">
                <button className="btn-login">
                  Login
                </button>
                <p>
                  Not registered?{" "}
                  <Link to="/signup" className="link-signup">
                    Signup
                  </Link>{" "}
                </p>
              </div>
            </form>
          </div>
        
      </div>
      <Footer/>
      </div>
    );
  }
  export default Login;