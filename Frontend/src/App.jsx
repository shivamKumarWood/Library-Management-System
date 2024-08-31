import React from "react"
import {Navigate, Route,Routes  } from "react-router-dom";
import Home from "./components/home/Home";
import Library from "./components/library/Library";
import Signup from "./components/Signup"
import Login from "./components/Login";
import Profile from "./components/Profile";
import {Toaster} from "react-hot-toast";
import { useAuth } from './context/AuthProvider';
import Contact from "./components/Contact"
import About from "./components/About"
function App() {
  const [authUser,setAuthUser]=useAuth();
  console.log(authUser);
  return (
     <>
      <div className="App">
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/library" element={authUser?<Library/>:<Navigate to="/login"/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/about" element={<About/>}/>
      </Routes>
      <Toaster/>
      </div>
  </>
  );
}

export default App;
