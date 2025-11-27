import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Login() {
  const { setIsAuthenticated, setProfile } = useAuth();
  const navigateTo = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    
    // Only validate fields that have values (to check format)
    // Empty fields will be caught by the backend
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Email format is invalid";
    }
    if (password && password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    // Check if any required fields are completely empty
    if (!role) {
      newErrors.role = "Please select a role";
    }
    if (!email) {
      newErrors.email = "Email is required";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      toast.error("Please fill all fields correctly");
      return;
    }

    try {
      setLoading(true);
      setErrors({}); // Clear previous errors
      const { data } = await axios.post(
        "http://localhost:5000/api/user/login",
        { email, password, role },
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );

      localStorage.setItem("jwt", data.token);
      toast.success(data.message || "Logged in successfully");
      setProfile(data);
      setIsAuthenticated(true);
      setEmail("");
      setPassword("");
      setRole("");
      setErrors({});
      navigateTo("/");
    } catch (error) {
      console.error("Login error full object:", error);
      console.error("Error response:", error.response);
      
      let errorMessage = "Login failed. Please try again.";
      let errorType = "general"; // Track error type
      
      // Check different error sources
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.response?.statusText) {
        errorMessage = error.response.statusText;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      console.log("Final error message:", errorMessage);
      
      // Clear all field errors first
      setErrors({});
      
      // Show both toast and alert for visibility
      toast.error(errorMessage);
      // Also show alert as backup
      alert(`Login Error:\n${errorMessage}`);
      
      // Set specific errors based on message content (only one field error)
      const lowerMessage = errorMessage.toLowerCase();
      if (lowerMessage.includes("email") || lowerMessage.includes("user not found") || lowerMessage.includes("not registered")) {
        setErrors({ email: errorMessage });
        errorType = "email";
      } else if (lowerMessage.includes("password") || lowerMessage.includes("incorrect")) {
        setErrors({ password: errorMessage });
        errorType = "password";
      } else if (lowerMessage.includes("role")) {
        setErrors({ role: errorMessage });
        errorType = "role";
      }
      
      console.log("Error type set to:", errorType);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-500 to-green-300">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 transform transition duration-500 hover:scale-105">
        <h1 className="text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-green-500">
          CilliBlog
        </h1>
        <h2 className="text-xl font-semibold mb-6 text-center text-gray-700">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Role Select */}
          <div>
            <select
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                setErrors({ ...errors, role: "" });
              }}
              className={`w-full p-3 border-2 rounded-xl focus:ring-2 transition duration-300 ${
                errors.role
                  ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
              }`}
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
          </div>

          {/* Email Input */}
          <div>
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors({ ...errors, email: "" });
              }}
              className={`w-full p-3 border-2 rounded-xl focus:ring-2 transition duration-300 ${
                errors.email
                  ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:border-purple-500 focus:ring-purple-200"
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password Input */}
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors({ ...errors, password: "" });
              }}
              className={`w-full p-3 border-2 rounded-xl focus:ring-2 transition duration-300 ${
                errors.password
                  ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:border-green-500 focus:ring-green-200"
              }`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <p className="text-center text-gray-600">
            New user? <Link to="/register" className="text-yellow-500 font-semibold hover:underline">Register Now</Link>
          </p>

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 bg-gradient-to-r from-blue-500 via-purple-500 to-green-400 text-white font-bold rounded-2xl transition duration-500 ${
              loading
                ? "opacity-50 cursor-not-allowed"
                : "hover:from-green-400 hover:to-blue-500 hover:shadow-lg transform hover:scale-105"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
