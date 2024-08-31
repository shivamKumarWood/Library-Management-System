import React from 'react'
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";
import { Link,useNavigate} from "react-router-dom";
function Logout() {
    const navigate = useNavigate();
    const [authUser, setAuthUser] = useAuth();
  const handleLogout = () => {
    try {
      setAuthUser({
        ...authUser,
        user: null,
      });
      localStorage.removeItem("user");
      navigate("/");
      toast.success("Logout successfully");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      toast.error("Error: " + error);
      setTimeout(() => {}, 2000);
    }
  };
  return (
    <div>
      <button onClick={handleLogout} className="btn login-btn" style={{backgroundColor:"red",fontWeight:"600"}}>
          Log Out
        </button>
    </div>
  )
}

export default Logout
