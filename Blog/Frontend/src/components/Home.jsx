import React from "react";
import Hero from "../Home/Hero";
import Trending from "../Home/Trending";
import Devotional from "../Home/Devotional";
import Creator from "../Home/Creator";

function Home() {
  return (
    <div className="space-y-16">
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
    </div>
  );
}

export default Home;
