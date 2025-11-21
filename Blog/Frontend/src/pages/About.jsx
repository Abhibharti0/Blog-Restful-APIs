import React from "react";
import { useAuth } from "../context/AuthProvider";
import { FaReact, FaNodeJs, FaDatabase, FaCloud } from "react-icons/fa";

function About() {
  const { profile } = useAuth();

  return (
    <div className="container mx-auto my-12 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">
            About Me
          </h1>
          <p className="text-gray-600 text-lg">
            Get to know{" "}
            <strong className="text-purple-600 hover:scale-105 transition-transform duration-300">
              {profile?.user?.name}
            </strong>
          </p>
        </div>

        {/* Introduction */}
        <div className="space-y-4 text-gray-700">
          <p>
            {profile?.user?.name} is a proficient full-stack developer with
            expertise in building dynamic, responsive, and user-friendly web
            applications. Passionate about crafting seamless digital
            experiences.
          </p>

          {/* Technical Expertise */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">
              Technical Expertise
            </h2>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <FaReact className="text-blue-500" />
                <span>Front-End: React.js, Angular, Vue.js, HTML5, CSS3</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaNodeJs className="text-green-600" />
                <span>Back-End: Node.js, Express.js, Django</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaDatabase className="text-yellow-600" />
                <span>Databases: MySQL, PostgreSQL, MongoDB</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaCloud className="text-purple-600" />
                <span>Cloud & DevOps: AWS, Azure, Docker, Kubernetes</span>
              </li>
            </ul>
          </div>

          {/* Professional Highlights */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">
              Professional Highlights
            </h2>
            <p>
              Successfully developed and deployed numerous full-stack
              applications. Collaborated with cross-functional teams to deliver
              high-quality software solutions. Continuously learning and adapting
              to emerging technologies to stay ahead in the tech landscape.
            </p>
          </div>

          {/* Personal Interests */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">
              Personal Interests & Inspiration
            </h2>
            <p>
              Beyond work, {profile?.user?.name} loves cricket and admires{" "}
              <strong>King Kohli</strong>. His biggest inspiration is his twin
              brother <strong>Ankush</strong>, whose support and friendly rivalry
              motivates him to strive for excellence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
