
import React from "react";
import { motion } from "framer-motion";

const FishLogo = ({ color, size = "medium" }) => {
  return (
    <div className={`text-${color} ${size === "small" ? "text-lg" : "text-3xl"}`}>🐟</div>
  );
};

export default function OverlappingDivs() {
  return (
    <section className="max-w-7xl  justify-between flex  gap-22 mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Left Column - Text Content */}

        <motion.div
          className="relative grid grid-cols-2 md:grid-cols-3 gap-4"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >

          <motion.div
            className="col-span-1 row-span-2 bg-gray-900 rounded-lg  flex flex-col justify-between h-80 transform translate-y-4"
            whileHover={{ scale: 1.05 }}
          > <img src="vibe.jpg" alt="Main" className="w-full h-full object-cover" />

          </motion.div>
          <motion.div
            className="col-span-1 bg-white rounded-lg shadow-md flex flex-col h-96 items-center"
            whileHover={{ scale: 1.05 }}
          >
            <img src="model.jpg" alt="Top Right" className="w-full h-full object-cover" />
          </motion.div>


          <motion.div
            className="col-span-1 bg-white rounded-lg  shadow-md flex flex-col h-96 items-center"
            whileHover={{ scale: 1.05 }}
          >
            <img src="energetic.jpg" alt="Top Right" className="w-full h-full object-cover" />
          </motion.div>


          <motion.div
            className="col-span-1 w-80 h-44 bg-white rounded-lg  shadow-md"
            whileHover={{ scale: 1.05 }}
          ><img src="musicplayer.jpg" alt="Middle Right" className="w-full h-full object-cover" />

          </motion.div>
        </motion.div>
        <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        className="w-full max-w-lg text-center md:text-left"
      >
        <div className="max-w-prose">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-50"><span className="text-blue-400">03.</span>
          AI-Powered Music and
            <strong className="text-indigo-600"> Moods </strong>
            Just for You!
          </h1>

          <p className="mt-4 text-base sm:text-lg text-gray-300 leading-relaxed">
          Experience the future of music creation! Our AI-powered system generates unique
            melodies, harmonies, and beats based on your mood and preferences.  
            Customize your track and download it instantly.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:shadow-blue-400 transition"
        >
              Generate More Music
        </motion.button>
      </motion.div>
      </motion.div>
    </section>
  );
}
