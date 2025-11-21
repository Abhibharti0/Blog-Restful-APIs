import axios from "axios";
import React, { useEffect, useState } from "react";

function Creator() {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/user/admins",
          { withCredentials: true }
        );
        setAdmins(data.admins);
      } catch (error) {
        console.error("Failed to fetch admins:", error);
      }
    };
    fetchAdmins();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">
        Popular Creators
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {admins && admins.length > 0 ? (
          admins.slice(0, 4).map((admin) => (
            <div
              key={admin._id}
              className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-4 transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="relative w-40 h-40 rounded-full overflow-hidden ring-4 ring-gradient-to-r from-purple-500 to-pink-500">
                <img
                  src={admin.photo.url}
                  alt={admin.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center mt-4">
                <p className="font-semibold text-lg text-gray-800">{admin.name}</p>
                <p className="text-gray-500 text-sm">{admin.role}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No creators available.
          </p>
        )}
      </div>
    </div>
  );
}

export default Creator;
