import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminModal = ({ isOpen, onClose,trigger,setTrigger }) => {

  const[username,setUserName]=useState("")
  const[password,setPassword]=useState("")
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
  
  const handleSubmit=async(e)=>{
    
    e.preventDefault();
    
    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include'
      });
      
      // Debugging logs
      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);
      
      if (response.ok) {
        // Set auth flag in localStorage
        localStorage.setItem("isAdminAuthenticated", "true");
        // onLoginSuccess(); // Update the UI
        onClose();
        navigate("/admin");
        setTrigger(!trigger)
        // alert("Login successful!");
      } else {
        setError(data.message || "Invalid username or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    };
    
  }
  
  


  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] z-40" onClick={onClose}></div>

      {/* Modal */}
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl relative mx-4">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute hover:cursor-pointer top-1 right-3 text-gray-500 hover:text-black text-3xl"
          >
            &times;
          </button>

          <h2 className="text-2xl font-semibold text-center mb-6">Admin Login</h2>
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter username"
                onChange={(e)=>{
                  setUserName(e.target.value);
                  console.log(e.target.value)
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
                onChange={(e)=>{
                  setPassword(e.target.value);
                  console.log(e.target.value)
                }}
              />
            </div>

            <div className="text-right">
              <button
                type="button"
                className="text-blue-600 hover:cursor-pointer hover:underline text-sm"
              >
                Forgot Password?
              </button>
            </div>

            <button
            
              
              type="submit"
              className="w-full hover:cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition duration-300"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminModal;
