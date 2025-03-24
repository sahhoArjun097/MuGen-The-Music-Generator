import { motion } from "framer-motion";

export default function OverlappingDivs() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center ">
      <div className="relative w-72 h-72">
        {/* Bottom Left Div */}
        <motion.div
          initial={{ opacity: 0, x: -50, y: 50 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="absolute bottom-0 left-0 w-60 h-60 border-2 border-black bg-white"
        />

        {/* Top Middle Div */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="absolute top-0 left-12 w-60 h-60 border-2 border-black bg-white"
        />

        {/* Top Right Small Div */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="absolute top-0 right-0 w-60 h-60 border-2 border-black bg-white"
        />

        {/* Bottom Right Div */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute bottom-0 right-0 w-60 h-60 border-2 border-black bg-white"
        />
      </div>


      
    </div>
  );
}