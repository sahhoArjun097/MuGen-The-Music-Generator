import { useState } from "react";
import api from "../api";
import MusicPlayer from "../components/MusicPlayer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addAudioSrc, deductToken } from "../utils/authslice";

const MoodselectionPage = () => {
    const [selectedOption, setSelectedOption] = useState("");
    const userData = useSelector((state) => state.authSlice.userData.user)
    const [length, setLength] = useState(5);
    const dispatch = useDispatch();
    const moods = ["Cheerful", "Sorrow", "Up Lifting", "Dark"];
    const [show, setShow] = useState(!!localStorage.getItem("audioSrc")); // Show MusicPlayer if audio exists
    const userId = userData.id || userData._id?.$oid;
    console.log(userId)
    console.log(userData)
    const [loading, setLoading] = useState(false);


    const handleGenerateMusic = async () => {
        if (!selectedOption) {
            alert("Please select a mood first");
            return;
        }
        if (loading) return; // just in case

        setLoading(true);
        try {
            if (userData.token == 0) {
                alert("not enough tokens")
                return
            }
            dispatch(deductToken(50));
            const response = await api.post(
                `/${userId}/generate-song`,
                { mood: selectedOption, song_number: 5, email: userData.email },
                { responseType: "blob", timeout: 500000 }
            );
            const data = await response.data;
            console.log(data)
            const audioUrl = URL.createObjectURL(data);
            console.log(audioUrl)
            console.log("Generated audio URL:", audioUrl);
            dispatch(addAudioSrc(audioUrl))
            setShow(true);
        } catch (error) {
            console.error(error);
            alert("An error occurred while generating the song.");
        }
    };

    return (
        <>
            {
                show ? (<MusicPlayer setShow={setShow} setLoadingk = {setLoading} />) : (
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
                                    <label className="block text-lg font-medium text-white">Tempature (number)</label>
                                    <input
                                        type="range"
                                        min="1"
                                        max="15"
                                        value={length}
                                        onChange={(e) => setLength(e.target.value)}
                                        className="w-full accent-yellow-500"
                                    />
                                    <p className="text-lg text-gray-300 mt-1">{length}</p>
                                </div>
                                <p className="text-lg text-gray-400 mt-3">No: {Math.ceil(length / 10)} Midies</p>
                                <motion.button
                                    onClick={handleGenerateMusic}
                                    disabled={loading}
                                    className={`mt-6 p-2 rounded-lg w-full font-bold text-lg transition-all
                                    ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-yellow-500 text-black hover:bg-yellow-600"}`}
                                >
                                    {loading ? "Generating..." : "Generate Music"}
                                </motion.button>

                            </motion.div>
                            <div className="flex flex-col  items-center justify-center  space-y-10">

                                <motion.div
                                    className="bg-white p-10 rounded-xl shadow-lg md:w-96  w-64 text-center backdrop-blur-lg bg-opacity-10 border border-gray-700"
                                >
                                    <h3 className="text-2xl font-semibold text-white">Your Tokens</h3>
                                    <p className="text-5xl font-bold text-yellow-500">{userData.token}</p>
                                    <Link to="/pricing">
                                        <motion.button
                                            className="mt-5 bg-gray-200 p-4 rounded-lg w-full text-black font-bold hover:bg-gray-300 transition-all"
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            + Add Tokens
                                        </motion.button>
                                    </Link>
                                </motion.div>
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























