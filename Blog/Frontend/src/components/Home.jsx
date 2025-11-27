import React from "react";
import Hero from "../Home/Hero";
import Trending from "../Home/Trending";
import Devotional from "../Home/Devotional";
import Creator from "../Home/Creator";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Home() {
  const { profile } = useAuth();
  
  // Check if user is admin
  const isAdmin = profile?.user?.role === "admin" || profile?.role === "admin";

  return (
    <div className="space-y-16 m-16">
      {/* Hero Section */}
      <section>
        <Hero />
      </section>

      {/* Trending Blogs Section */}
      <section className="bg-gray-50 py-12">
        <Trending />
      </section>

      {/* Devotional Section */}
      <section className="py-12">
        <Devotional />
      </section>

      {/* Popular Creators Section */}
      <section className="bg-gray-50 py-12">
        <Creator />
      </section>

      {/* Call to Action Section - Only for Admins */}
      {isAdmin && (
        <section className="bg-gradient-to-r from-blue-500 to-blue-700 py-12 text-center">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Share Your Story?
            </h2>
            <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
              Join our community of writers and creators. Start publishing your blogs today and reach thousands of readers worldwide.
            </p>
            <Link
              to="/dashboard"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200"
            >
              Create Your First Blog
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}

export default Home;
