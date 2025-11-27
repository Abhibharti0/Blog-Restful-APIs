import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiMail, FiPhone, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

function Creators() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "http://localhost:5000/api/user/admins",
          {
            withCredentials: true,
          }
        );
        const adminsData = Array.isArray(data) ? data : data.admins || [];
        setCreators(adminsData);
        console.log("Creators fetched:", adminsData);
      } catch (error) {
        console.log("Error fetching creators:", error);
        toast.error("Failed to load creators");
        setCreators([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCreators();
  }, []);

  // Filter creators based on search query
  const filteredCreators = creators.filter((creator) =>
    creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    creator.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen mt-16">
        <div className="text-center">
          <div className="inline-block">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600 text-lg mt-4 font-semibold">Loading amazing creators...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12 mt-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header with enhanced design */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-block">
            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
              ✨ Our Community
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Meet Our Creators
          </h1>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
            Connect with talented writers and creators who share their stories with our community. 
            Every creator brings unique perspectives and inspiration.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <input
              type="text"
              placeholder="Search creators by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:border-blue-500 transition-colors bg-white shadow-md"
            />
          </div>
        </div>

        {/* Creators Grid */}
        {filteredCreators && filteredCreators.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredCreators.map((creator, index) => (
              <div
                key={creator._id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-300 animate-fadeIn"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

                {/* Cover Image with Gradient */}
                <div className="relative h-40 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 overflow-hidden">
                  <img
                    src={creator.photo?.url}
                    alt={creator.name}
                    className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-300 scale-110"
                    onError={(e) => { e.target.style.display = "none"; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>

                {/* Profile Section */}
                <div className="px-6 pb-6 relative z-10">
                  {/* Avatar with enhanced styling */}
                  <div className="flex justify-center -mt-20 mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                      <img
                        src={creator.photo?.url || "https://via.placeholder.com/140"}
                        alt={creator.name}
                        className="relative w-36 h-36 rounded-full border-4 border-white shadow-xl object-cover bg-gray-200 group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/140"; }}
                      />
                      <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                    </div>
                  </div>

                  {/* Creator Info */}
                  <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                      {creator.name}
                    </h2>
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                        {creator.role || "Creator"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 font-medium">
                      {creator.education || "Passionate Writer"}
                    </p>
                  </div>

                  {/* Contact Section */}
                  <div className="space-y-2 mb-6 pb-6 border-b border-gray-100">
                    <div className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
                      <FiMail className="w-4 h-4 flex-shrink-0" />
                      <p className="text-sm truncate hover:text-clip">{creator.email}</p>
                    </div>
                    {creator.phone && (
                      <div className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
                        <FiPhone className="w-4 h-4 flex-shrink-0" />
                        <p className="text-sm">{creator.phone}</p>
                      </div>
                    )}
                  </div>

                  {/* CTA Button with Icon */}
                  <Link
                    to={`/creator/${creator._id}/blogs/${encodeURIComponent(creator.name)}`}
                    className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold flex items-center justify-center gap-2 group/btn hover:shadow-lg transform hover:scale-105"
                  >
                    View Blogs
                    <FiArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-center max-w-md">
              <div className="mb-4 text-7xl">🔍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {searchQuery ? "No creators found" : "No Creators Yet"}
              </h3>
              <p className="text-gray-600">
                {searchQuery
                  ? "Try adjusting your search query"
                  : "More creators will be joining our community soon. Stay tuned!"}
              </p>
            </div>
          </div>
        )}

        {/* Stats Section */}
        {creators.length > 0 && (
          <div className="mt-16 pt-12 border-t border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div className="p-6 bg-blue-50 rounded-xl">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {creators.length}
                </div>
                <p className="text-gray-600 font-medium">Active Creators</p>
              </div>
              <div className="p-6 bg-purple-50 rounded-xl">
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  100%
                </div>
                <p className="text-gray-600 font-medium">Verified</p>
              </div>
              <div className="p-6 bg-pink-50 rounded-xl">
                <div className="text-4xl font-bold text-pink-600 mb-2">
                  🌟
                </div>
                <p className="text-gray-600 font-medium">Quality Content</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}

export default Creators;