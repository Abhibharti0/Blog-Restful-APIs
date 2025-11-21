import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Register() {
  const { setIsAuthenticated, setProfile } = useAuth();
  const navigateTo = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [education, setEducation] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoPreview, setPhotoPreview] = useState("");

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPhotoPreview(reader.result);
      setPhoto(file);
    };
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("education", education);
    formData.append("photo", photo);

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/user/register",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      localStorage.setItem("jwt", data.token);
      toast.success(data.message || "User registered successfully");
      setProfile(data);
      setIsAuthenticated(true);
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setRole("");
      setEducation("");
      setPhoto("");
      setPhotoPreview("");
      navigateTo("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Please fill the required fields");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200  to-yellow-700">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 transform transition duration-500 hover:scale-105">
        <h1 className="text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-600 to-yellow-600">
          CilliBlog
        </h1>
        <h2 className="text-xl font-semibold mb-6 text-center text-gray-700">Register</h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition duration-300"
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-purple-400 focus:ring-2 focus:ring-purple-200 transition duration-300"
          />

          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition duration-300"
          />

          <input
            type="number"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-green-400 focus:ring-2 focus:ring-green-200 transition duration-300"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-red-400 focus:ring-2 focus:ring-red-200 transition duration-300"
          />

          <select
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition duration-300"
          >
            <option value="">Select Your Education</option>
            <option value="BCA">BCA</option>
            <option value="MCA">MCA</option>
            <option value="MBA">MBA</option>
            <option value="BBA">BBA</option>
          </select>

          <div className="flex items-center mb-4">
            <div className="w-20 h-20 mr-4 rounded-full overflow-hidden border-2 border-gray-300">
              <img src={photoPreview || "https://via.placeholder.com/80"} alt="preview" className="w-full h-full object-cover" />
            </div>
            <input
              type="file"
              onChange={changePhotoHandler}
              className="w-full p-2 border-2 border-gray-300 rounded-xl transition duration-300"
            />
          </div>

          <p className="text-center text-gray-600">
            Already registered? <Link to="/login" className="text-blue-500 font-semibold">Login Now</Link>
          </p>

          <button
            type="submit"
            className="w-full p-3 bg-gradient-to-r from-purple-900 via-pink-800 to-yellow-600 text-white font-bold rounded-2xl hover:from-blue-800 hover:to-green-600 transition duration-500"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
