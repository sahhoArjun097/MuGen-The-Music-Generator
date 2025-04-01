import React, { useState } from "react";
import api from "../api";
import MusicPlayer from "../components/MusicPlayer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const MoodselectionPage = () => {
    const [selectedOption, setSelectedOption] = useState("");
    const [tokens, setTokens] = useState(200);
    const [length, setLength] = useState(70);
    const moods = ["Cheerful", "Sorrow", "Up Lifting", "Dark"];
    const [show, setShow] = useState(!!localStorage.getItem("audioSrc")); // Show MusicPlayer if audio exists
    const userId = "1235";

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleGenerateMusic = async () => {
        if (!selectedOption) {
            alert("Please select a mood first");
            return;
        }


        try {
            setIsLoading(true);
            setError("");
            localStorage.removeItem("audioSrc");

            const response = await api.post(
                `/${userId}/generate-song`,
                { mood: selectedOption, song_number: 5 },
                { responseType: "blob", timeout: 500000 }
            );
            setIsLoading(false);
            const data = await response.data;
            console.log(data)
            const audioUrl = URL.createObjectURL(data);
            console.log(audioUrl)
            console.log("Generated audio URL:", audioUrl); 
            localStorage.setItem("audioSrc", audioUrl);
            setShow(true);

        } catch (error) {
            setIsLoading(false);
            console.error(error);
            setError("An error occurred while generating the song.");
            alert("An error occurred while generating the song.");
        }
    };

    return (
        <>
           {
            show? (<MusicPlayer setShow={setShow}/>):(    
           <div className="flex flex-col containerss items-center  min-h-screen bg-gradient-to-br  from-black to-gray-900 text-white  p-5 md:p-10">
                <div className="w-full h-full mt-6 flex flex-col justify-center items-center">
                    <h1 className="text-4xl font-extrabold tracking-wide text-center mt-10">AI Music Generator</h1>
                    <p className="text-gray-400 text-lg mt-2">Create unique music tracks with our AI-powered generator using tokens</p>
                </div>
                <div className="flex  w-full justify-center gap-12 mt-4 flex-wrap  md:p-6">
                    <motion.div
                        className=" p-8 rounded-xl shadow-2xl max-w-xl w-full bg-opacity-10 border-t-white border-s-white border border-gray-700"
                    >
                        <h2 className="text-3xl font-bold text-white">Music Generator</h2>
                        <p className="text-lg text-gray-50 mt-2">Configure your music parameters and generate unique tracks</p>

                        <div className="mt-4">
                            <label className="block text-lg font-medium text-white">Mood</label>
                            <select
                                value={selectedOption}
                                onChange={(e) => setSelectedOption(e.target.value)}
                                className="w-full p-4 border rounded-lg bg-gray-800 text-white text-lg"
                            >
                                <option value="">Choose your mood</option>
                                {moods.map((mood) => (
                                    <option key={mood} value={mood}>
                                        {mood}
                                    </option>
                                ))}
                            </select>
                            <p className="text-green-400 mt-4">Generating music for {selectedOption}...</p>
                        </div>
                        <div className="mt-6">
                            <label className="block text-lg font-medium text-white">Length (seconds)</label>
                            <input
                                type="range"
                                min="10"
                                max="180"
                                value={length}
                                onChange={(e) => setLength(e.target.value)}
                                className="w-full accent-yellow-500"
                            />
                            <p className="text-lg text-gray-300 mt-1">{length}s</p>
                        </div>
                        {/* Cost Display */}
                        <p className="text-lg text-gray-400 mt-3">Cost: {Math.ceil(length / 10)} tokens</p>
                        {/* Generate Button */}
                        <motion.button
                            onClick={handleGenerateMusic} className="mt-6 bg-yellow-500 text-black p-2 rounded-lg w-full font-bold text-lg hover:bg-yellow-600 transition-all"
                        >
                            Generate Music
                        </motion.button>
                    </motion.div>
                    {/* Side Boxes */}
                    <div className="flex flex-col  items-center justify-center  space-y-10">

                        <motion.div
                            className="bg-white p-10 rounded-xl shadow-lg md:w-96  w-64 text-center backdrop-blur-lg bg-opacity-10 border border-gray-700"
                        >
                            <h3 className="text-2xl font-semibold text-white">Your Tokens</h3>
                            <p className="text-5xl font-bold text-yellow-500">{tokens}</p>
                            <Link to="/pricing">
                                <motion.button
                                    className="mt-5 bg-gray-200 p-4 rounded-lg w-full text-black font-bold hover:bg-gray-300 transition-all"
                                    whileTap={{ scale: 0.95 }}
                                >
                                    + Add Tokens
                                </motion.button>
                            </Link>
                        </motion.div>
                        {/* History Box */}
                        <motion.div
                            className="bg-white p-10 rounded-xl shadow-lg md:w-96 w-64 text-center backdrop-blur-lg bg-opacity-10 border border-gray-700"
                        >
                            <h3 className="text-2xl font-semibold text-white">History</h3>
                            <p className="text-gray-400 text-lg mt-2">No tracks generated yet</p>
                        </motion.div>
                    </div>
                </div>
            </div>
             )


            }
             

        </>
    );
};

export default MoodselectionPage;


























// <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
//   <h1 className="sm:text-6xl md:text-6xl lg:text-7xl text-5xl font-bold mb-8">
//     Generate Music
//   </h1>
//   <p className="text-lg mb-9">Choose a mood to create your track.</p>

//   <div className="w-full max-w-md">
//     <label className="block text-lg mb-2">Select mood</label>
//     <select
//       value={selectedOption}
//       onChange={(e) => setSelectedOption(e.target.value)}
//       className="w-full px-4 py-2 mb-4 bg-gray-800 text-white border border-gray-700 rounded-lg cursor-pointer"
//     >
//       <option value="" disabled>
//         Choose a mood
//       </option>
//       {moods.map((mood) => (
//         <option key={mood} value={mood}>
//           {mood}
//         </option>
//       ))}
//     </select>

//     <button
//       onClick={handleGenerate}
//       disabled={isLoading}
//       className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
//     >
//       {isLoading ? "Generating..." : "Generate"}
//     </button>

//     {/* Loading Spinner */}
//     {!isShow && isLoading && (
//       <div className="flex flex-col gap-4 mt-4 w-full items-center justify-center">
//         <div className="w-20 h-20 border-4 border-transparent animate-spin border-t-blue-500 rounded-full">
//           <div className="w-16 h-16 border-4 border-transparent animate-spin border-t-purple-500 rounded-full"></div>
//         </div>
//       </div>
//     )}
//   </div>

//   {/* Show Music Player if audio is generated */}
//   {isShow && <MusicPlayer />}
// </div>