import React, { useState } from "react";
import './pages.css';
import Navbar from "../components/Navbar";

const HomePage = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [prompt, setPrompt] = useState("");
  const options = ["Pop", "Rock", "Jazz", "Classical", "Hip-Hop", "Electronic"];

  const handleGenerate = () => {
    alert(`Generating music for genre: ${selectedOption}, with prompt: ${prompt}`);
  };

  return (
    <>
      <Navbar/>
    <div
      className="min-h-screen w-[100vw] flex items-center justify-center bg-cover bg-center homeBackgroundImage"
    >
      <div className="bg-opacity-0 backdrop-blur-xl p-8 rounded-lg shadow-lg sm:w-full max-w-md w-[95%]">
        <h1 className="text-4xl font-bold text-center text-purple-300 mb-6">AI Music Generator</h1>
        <p className="text-center text-purple-400 text-md pb-4">
          Create music effortlessly with AI. Select a genre, provide a prompt, and generate unique tracks.
        </p>
        <form>
          <div className="mb-6">
            <label htmlFor="genre" className="block text-purple-300 text-md pb-2 font-semibold mb-1">
              Select Genre
            </label>
            <select
              id="genre"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="w-[90%] ml-4 py-3 cursor-pointer text-white border-b-2 border-gray-100 border-opacity-30 backdrop-blur-2xl bg-transparent focus:outline-none focus:border-opacity-100 bg-opacity-10"
            >
              <option value="" disabled className="bg-purple-800">
                Choose a genre
              </option>
              {options.map((option) => (
                <option key={option} value={option} className="bg-purple-800 hover:bg-purple-600"> 
                  {option}
                </option>
              ))}
            </select>
          </div>
         
          <button
            type="button"
            onClick={handleGenerate}
            className="w-full py-2 text-white font-semibold rounded-lg hover:bg-violet-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200"
          >
            Generate Music
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default HomePage;
