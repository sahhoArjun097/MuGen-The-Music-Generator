import React from "react";
import { motion } from "framer-motion";
import { Edit, Settings } from "lucide-react";

export default function Profile() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 p-6 overflow-hidden relative"
    >
      {/* Gradient Overlay */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-purple-600/20 to-pink-600/20" />

      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative">
        {/* Profile Image with Glow Effect */}
        <div className="relative">
          <div className="absolute -inset-1 bg-purple-500/20 rounded-full blur-sm" />
          <img
            src="https://via.placeholder.com/128"
            alt="Profile"
            className="rounded-full border-2 border-purple-500 object-cover w-32 h-32"
          />
        </div>

        {/* Profile Information */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">Dr. Alex Johnson</h1>
              <p className="text-gray-400 mt-1">
                Computational Neuroscience Researcher
              </p>
            </div>

            {/* Buttons Section */}
            <div className="flex gap-3">
              <button className="px-4 py-2 border border-purple-500 text-white rounded-lg hover:bg-purple-500/20 flex items-center">
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </button>
              <button className="p-2 border border-purple-500 text-white rounded-lg hover:bg-purple-500/20">
                <Settings className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Bio Section */}
          <p className="text-gray-300 mt-4 max-w-3xl">
            Exploring the intersection of artificial intelligence and
            neuroscience. Focused on developing computational models that help
            understand brain function and cognition. Published researcher with
            15+ papers in top journals.
          </p>

          {/* Badge Section */}
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge>AI</Badge>
            <Badge>Neuroscience</Badge>
            <Badge>Machine Learning</Badge>
            <Badge>Cognitive Science</Badge>
            <Badge>Data Visualization</Badge>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Badge Component
function Badge({ children }) {
  return (
    <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20">
      {children}
    </span>
  );
}
