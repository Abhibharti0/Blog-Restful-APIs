import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Creator() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "http://localhost:5000/api/user/admins",
          { withCredentials: true }
        );
        // Backend returns array directly, handle both cases
        const adminsData = Array.isArray(data) ? data : data.admins || [];
        setAdmins(adminsData);
        console.log("Admins fetched:", adminsData);
      } catch (error) {
        console.error("Failed to fetch admins:", error);
        toast.error("Failed to load creators");
        setAdmins([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAdmins();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <p className="text-gray-500">Loading creators...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">
        Popular Creators
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {admins && admins.length > 0 ? (
          admins.map((admin) => (
            <div
              key={admin._id}
              className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-4 transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="relative w-40 h-40 rounded-full overflow-hidden ring-4 ring-gradient-to-r from-purple-500 to-pink-500 bg-gray-200">
                <img
                  src={admin.photo?.url || "https://via.placeholder.com/160"}
                  alt={admin.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/160"; }}
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
