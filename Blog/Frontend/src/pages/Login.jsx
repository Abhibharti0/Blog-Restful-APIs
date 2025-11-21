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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
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
      navigateTo("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials");
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
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-300"
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition duration-300"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition duration-300"
          />

          <p className="text-center text-gray-600">
            New user? <Link to="/register" className="text-yellow-500 font-semibold">Register Now</Link>
          </p>

          <button
            type="submit"
            className="w-full p-3 bg-gradient-to-r from-blue-500 via-purple-500 to-green-400 text-white font-bold rounded-2xl hover:from-green-400 hover:to-blue-500 transition duration-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
