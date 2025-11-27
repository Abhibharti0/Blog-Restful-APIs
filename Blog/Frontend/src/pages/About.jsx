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
                <FaReact className="text-orange-500" />
                <span>Front-End: HTML, CSS, JavaScript, React.js</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaNodeJs className="text-green-600" />
                <span>Back-End: Node.js, Express.js</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaDatabase className="text-yellow-600" />
                <span>Databases: MongoDB, SQL Server</span>
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
         

          {/* Credits */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border-l-4 border-blue-600">
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">
              Credits
            </h2>
            <p className="text-gray-700">
              This blog platform was created with the guidance and support of{" "}
              <strong className="text-blue-600 text-lg">Satyam Dubey</strong>.
              His mentorship and expertise have been invaluable in shaping this
              project.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
