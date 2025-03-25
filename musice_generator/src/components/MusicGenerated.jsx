
import { motion } from "framer-motion";

const MusicGenerated = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center px-6 sm:px-8 md:px-12 py-12 gap-8 md:gap-16 relative">
      {/* 3D Image Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full sm:w-[350px] md:w-[400px] lg:w-[500px] h-auto flex justify-center items-center"
      >
        <motion.img
          transition={{ duration: 0.3 }}
          className="w-full h-full object-cover  hover:shadow-blue-500/50"
          src="/3denjoy.png"
          alt="3D Enjoy"
        />
      </motion.div>

      {/* Description Section */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        className="w-full max-w-lg text-center md:text-left"
      >
        <div className="max-w-prose">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-50"><span className="text-blue-400">01.</span>
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
    </div>
  );
};

export default MusicGenerated;
