import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from 'react';
import Login from './Login';
import Navbar from "./Navbar"
import Footer from './Footer';
import toast from 'react-hot-toast';

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate(); // Initialize the navigate function
  const onSubmit = async (data) => {

    try {
      console.log(data);
      const response = await fetch('http://localhost:3000/sign/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Converts the 'body' object to a JSON string
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Signup successful");
        console.log(result); // Handle successful signup
        localStorage.setItem("user", JSON.stringify(result));
        navigate('/'); // Navigate to the home page
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        toast.error("Error: " + result.error);
      }
    } catch (error) {
      toast.error('Error:' + error.response.data.message);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="login_container">
        <div className="modal-box">
          <form onSubmit={handleSubmit(onSubmit)} method='dialog'>
            <Link
              to="/"
              className="close_button"
            >
              ✕close
            </Link>

            <h3 className="modal-title">Signup</h3>
            <h4 style={{ textAlign: "center", justifyContent: "center" }}>Please Signup to visit Library</h4>
            <div className="input-group">
              <span>Name</span>
              <input
                type="text"
                placeholder="Enter your name"
                className="input-field"
                {...register("name", { required: true })}
              />
              {errors.password && (
                <span className="error-message">
                  This field is required
                </span>
              )}
            </div>
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
              <button className="btn-login" type="submit">
                Signup
              </button>
              <p>
                Already have an account! {" "}
                <Link to="/login" className="link-signup">
                  login
                </Link>{" "}
              </p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Signup;
