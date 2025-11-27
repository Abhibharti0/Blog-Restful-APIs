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
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPhotoPreview(reader.result);
      setPhoto(file);
      setErrors({ ...errors, photo: "" });
    };
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    
    if (!name) newErrors.name = "Name is required";
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!phone) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(phone)) newErrors.phone = "Phone must be 10 digits";
    
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    
    if (!role) newErrors.role = "Please select a role";
    if (!education) newErrors.education = "Please select education";
    if (!photo) newErrors.photo = "Please upload a profile photo";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      toast.error("Please fill all fields correctly");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("education", education);
    formData.append("photo", photo);

    try {
      setLoading(true);
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
      setErrors({});
      navigateTo("/");
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage = 
        error.response?.data?.message || 
        error.message || 
        "Registration failed. Please try again.";
      
      toast.error(errorMessage);
      
      // Set specific errors if available
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
    } finally {
      setLoading(false);
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
                  : "border-gray-300 focus:border-pink-400 focus:ring-pink-200"
              }`}
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
          </div>

          {/* Name Input */}
          <div>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrors({ ...errors, name: "" });
              }}
              className={`w-full p-3 border-2 rounded-xl focus:ring-2 transition duration-300 ${
                errors.name
                  ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:border-purple-400 focus:ring-purple-200"
              }`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
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
                  : "border-gray-300 focus:border-blue-400 focus:ring-blue-200"
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Phone Input */}
          <div>
            <input
              type="number"
              placeholder="Phone Number (10 digits)"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setErrors({ ...errors, phone: "" });
              }}
              className={`w-full p-3 border-2 rounded-xl focus:ring-2 transition duration-300 ${
                errors.phone
                  ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:border-green-400 focus:ring-green-200"
              }`}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* Password Input */}
          <div>
            <input
              type="password"
              placeholder="Password (min 6 characters)"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors({ ...errors, password: "" });
              }}
              className={`w-full p-3 border-2 rounded-xl focus:ring-2 transition duration-300 ${
                errors.password
                  ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:border-red-400 focus:ring-red-200"
              }`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Education Select */}
          <div>
            <select
              value={education}
              onChange={(e) => {
                setEducation(e.target.value);
                setErrors({ ...errors, education: "" });
              }}
              className={`w-full p-3 border-2 rounded-xl focus:ring-2 transition duration-300 ${
                errors.education
                  ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:border-yellow-400 focus:ring-yellow-200"
              }`}
            >
              <option value="">Select Your Education</option>
              <option value="BCA">BCA</option>
              <option value="MCA">MCA</option>
              <option value="MBA">MBA</option>
              <option value="Bsc.IT">Bsc.IT</option>
              <option value="BBA">BBA</option>
            </select>
            {errors.education && <p className="text-red-500 text-sm mt-1">{errors.education}</p>}
          </div>

          {/* Photo Upload */}
          <div>
            <div className="flex items-center mb-2">
              <div className={`w-20 h-20 mr-4 rounded-full overflow-hidden border-4 ${
                errors.photo ? "border-red-500" : "border-gray-300"
              }`}>
                <img 
                  src={photoPreview || "https://via.placeholder.com/80"} 
                  alt="preview" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <input
                type="file"
                onChange={changePhotoHandler}
                className={`w-full p-2 border-2 rounded-xl transition duration-300 ${
                  errors.photo
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                accept="image/*"
              />
            </div>
            {errors.photo && <p className="text-red-500 text-sm mt-1">{errors.photo}</p>}
          </div>

          <p className="text-center text-gray-600">
            Already registered? <Link to="/login" className="text-blue-500 font-semibold hover:underline">Login Now</Link>
          </p>

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 bg-gradient-to-r from-purple-900 via-pink-800 to-yellow-600 text-white font-bold rounded-2xl transition duration-500 ${
              loading
                ? "opacity-50 cursor-not-allowed"
                : "hover:from-blue-800 hover:to-green-600 hover:shadow-lg transform hover:scale-105"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Registering...
              </span>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
