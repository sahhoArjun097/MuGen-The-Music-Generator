import React, { useState } from "react";
import { motion } from "framer-motion";

function MusicInstruction() {
    const [selected, setSelected] = useState(0);

    const musicResults = [
        { id: 1, img: "mood1.png", color: "bg-red-500", textColor: "text-white" },
        { id: 2, img: "mood2.png", color: "bg-purple-800", textColor: "text-yellow-300" },
        { id: 3, img: "mood3.png", color: "bg-amber-100", textColor: "text-gray-900" },
        { id: 4, img: "mood4.png", color: "bg-blue-500", textColor: "text-white" },
    ];
    
    return (
        <section className="lg:grid lg:h-screen lg:place-content-center">
            <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 md:grid md:grid-cols-2 md:items-center md:gap-4 lg:px-8 lg:py-32">

                {/* Text Section with Animation */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-prose text-left"
                >
                    <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl dark:text-white"><span className="text-blue-400">02.</span>
                        Choose Your Mood , Feel the <strong className="text-indigo-600">Rhythm!</strong>
                    </h1>

                    <p className="mt-4 text-base sm:text-lg text-gray-700 dark:text-gray-200 leading-relaxed">
                        Step into a world where creativity meets technology. Select your mode and let AI generate
                        captivating music that resonates with your emotions. Whether you seek soothing melodies,
                        energetic beats, or cinematic harmonies, your perfect track is just a click away!
                    </p>



                    {/* Buttons with Animation */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mt-4 flex gap-4 sm:mt-6"
                    >
                        <motion.a
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition hover:bg-indigo-700"
                            href="#"
                        >
                            Get Started
                        </motion.a>

                        <motion.a
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-block rounded border border-gray-200 px-5 py-3 font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 hover:text-gray-900 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-white"
                            href="#"
                        >
                            Learn More
                        </motion.a>
                    </motion.div>
                </motion.div>

                {/* Animated SVG Section */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                    className="mx-auto max-w-md md:block"
                >
                    <div className="grid grid-cols-2 gap-6">
                        {musicResults.map((music, index) => (
                            <div
                                key={music.id}
                                className={` rounded-xl shadow-lg ${music.color} cursor-pointer relative ${selected === index ? "ring-4 ring-gray-50" : ""
                                    }`}
                                onClick={() => setSelected(index)}
                            >
                               <img src={music.img} alt="" className="w-full h-full object-cover rounded-lg shadow-lg" />

                                
                            </div>
                        ))}
                    </div>

                </motion.div>
            </div>
        </section>
    );
}

export default MusicInstruction;
