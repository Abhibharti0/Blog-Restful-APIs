import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Devotional() {
  const { blogs } = useAuth();
  const devotionalBlogs = blogs?.filter((blog) => blog.category === "Devotion");

  return (
    <div className="container mx-auto my-12 p-4 mt-20">
      <h1 className="text-2xl font-bold mb-6">Devotional</h1>
      <p className="text-center text-gray-600 mb-8">
        Explore spiritual and devotional content that inspires and uplifts your soul
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {devotionalBlogs && devotionalBlogs.length > 0 ? (
          devotionalBlogs.map((blog) => {
            // Safe parse adminPhoto (if JSON string)
            let adminPhotoUrl = "https://via.placeholder.com/40";
            try {
              if (typeof blog.adminPhoto === "string" && blog.adminPhoto.startsWith("{")) {
                adminPhotoUrl =
                  JSON.parse(blog.adminPhoto)?.url || "https://via.placeholder.com/40";
              } else {
                adminPhotoUrl = blog.adminPhoto || "https://via.placeholder.com/40";
              }
            } catch (e) {
              adminPhotoUrl = blog.adminPhoto || "https://via.placeholder.com/40";
            }

            return (
              <div
  key={blog._id}
  className="p-3 bg-white border border-gray-300 rounded-lg shadow-md w-full"
>
  <Link to={`/blog/${blog._id}`}>
    <div className="relative">
      <img
        src={blog.blogImage?.url}
        alt={blog.title}
        className="w-full h-40 object-cover rounded-t-lg"   // ↓ decreased height
      />
      <div className="absolute top-3 left-3 bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
        {blog.category}
      </div>
    </div>

    <div className="p-3 bg-gray-50 rounded-b-lg h-28 flex flex-col justify-between"> 
      {/* ↓ reduced overall height */}
      <h1
        className="text-base font-bold mb-2 overflow-hidden text-ellipsis"
        style={{ whiteSpace: "nowrap" }}
      >
        {blog.title}
      </h1>

      <div className="flex items-center">
        <img
          src={adminPhotoUrl}
          alt="author_avatar"
          className="w-8 h-8 rounded-full"    // ↓ smaller avatar
        />
        <p className="ml-3 text-gray-400 text-xs">{blog.adminName}</p>
      </div>
    </div>
  </Link>
</div>

            );
          })
        ) : (
          <div className="flex h-32 items-center justify-center col-span-full">
            <p className="text-gray-500">No devotional blogs available</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Devotional;
