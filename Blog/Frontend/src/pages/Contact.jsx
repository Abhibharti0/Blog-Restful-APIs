import React from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      access_key: "c660c9ce-c6f9-41f7-aa0f-8a24ea887b94",
      name: data.username,
      email: data.email,
      message: data.message,
    };
    try {
      await axios.post("https://api.web3forms.com/submit", userInfo);
      toast.success("Message sent successfully");
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8 bg-white p-10 rounded-2xl shadow-2xl">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
            Contact Us
          </h2>
          <p className="text-gray-500">We’d love to hear from you!</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Form */}
          <div className="w-full md:w-1/2">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Send us a message
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gradient-to-r from-blue-500 to-purple-600 transition duration-300"
                  {...register("username", { required: true })}
                />
                {errors.username && (
                  <span className="text-sm text-red-500 font-semibold">
                    Name is required
                  </span>
                )}
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gradient-to-r from-blue-500 to-purple-600 transition duration-300"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-sm text-red-500 font-semibold">
                    Email is required
                  </span>
                )}
              </div>

              <div>
                <textarea
                  placeholder="Your Message"
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gradient-to-r from-blue-500 to-purple-600 transition duration-300"
                  {...register("message", { required: true })}
                  rows={5}
                />
                {errors.message && (
                  <span className="text-sm text-red-500 font-semibold">
                    Message is required
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 rounded-xl hover:scale-105 transform transition duration-300 shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Contact Information
            </h3>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-center space-x-3 hover:text-blue-500 transition duration-300">
                <FaPhone className="text-red-500 text-xl" />
                <span>+91 834025676</span>
              </li>
              <li className="flex items-center space-x-3 hover:text-blue-500 transition duration-300">
                <FaEnvelope className="text-pink-500 text-xl" />
                <span>abhibharti457@gmai.com</span>
              </li>
              <li className="flex items-center space-x-3 hover:text-blue-500 transition duration-300">
                <FaMapMarkerAlt className="text-green-500 text-xl" />
                <span>patna,Bihar</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
