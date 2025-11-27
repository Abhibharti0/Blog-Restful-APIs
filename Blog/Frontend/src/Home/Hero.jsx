import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Hero() {
  const { blogs } = useAuth();
  console.log("Blogs:", blogs);

  return (
    <div className="container mx-auto mt-20 mb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
      {blogs && blogs.length > 0 ? (
        blogs.slice(0, 4).map((element) => {
          // Safe parse adminPhoto string to object
          let adminPhotoUrl = "https://via.placeholder.com/50";
          try {
            if (typeof element.adminPhoto === "string" && element.adminPhoto.startsWith("{")) {
              adminPhotoUrl = JSON.parse(element.adminPhoto)?.url || "https://via.placeholder.com/50";
            } else {
              adminPhotoUrl = element.adminPhoto || "https://via.placeholder.com/50";
            }
          } catch (e) {
            adminPhotoUrl = element.adminPhoto || "https://via.placeholder.com/50";
          }

          return (
            <Link
              to={`/blog/${element._id}`}
              key={element._id}
              className="bg-white rounded-lg hover:shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <div className="group relative">
                <img
                  src={element.blogImage.url}
                  alt={element.title}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75 group-hover:opacity-100 transition-transform duration-300"></div>
                <h1 className="absolute bottom-4 left-4 text-white text-xl font-bold group-hover:text-yellow-500 transition-colors duration-300">
                  {element.title}
                </h1>
              </div>
              <div className="p-6 flex items-center">
                <img
                  src={adminPhotoUrl}
                  alt={element.adminName || "Admin"}
                  className="w-12 h-12 rounded-full border-2 border-yellow-400"
                />
                <div className="ml-4">
                  <p className="text-lg font-semibold text-gray-800">
                    {element.adminName || "Unknown"}
                  </p>
                  <p className="text-xs text-gray-400">New</p>
                </div>
              </div>
            </Link>
          );
        })
      ) : (
        <div className="flex h-screen items-center justify-center">
          Loading...
        </div>
      )}
    </div>
  );
}

export default Hero;
