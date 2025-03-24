// import { useState } from "react";
// import "./pages.css";
// import MusicGenerated from "../components/MusicGenerated.js";

// const HomePage = () => {
//   const [selectedOption, setSelectedOption] = useState("");
//   const [prompt, setPrompt] = useState("");
//   const options = ["Pop", "Rock", "Jazz", "Classical", "Hip-Hop", "Electronic"];

//   const handleGenerate = () => {
//     alert(`Generating music for genre: ${selectedOption}, with prompt: ${prompt}`);
//   };

//   return (
//     <div className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center homeBackgroundImage">
//       {/* Music Generation Form */}
//       <div className="bg-opacity-0 backdrop-blur-xl p-8 rounded-lg shadow-lg sm:w-full max-w-md w-[95%]">
//         <h1 className="text-4xl font-bold text-center text-purple-300 mb-6">
//           AI Music Generator
//         </h1>
//         <p className="text-center text-purple-400 text-md pb-4">
//           Create music effortlessly with AI. Select a genre, provide a prompt, and generate unique tracks.
//         </p>
//         <form>
//           {/* Genre Selection */}
//           <div className="mb-6">
//             <label htmlFor="genre" className="block text-purple-300 text-md pb-2 font-semibold mb-1">
//               Select Genre
//             </label>
//             <select
//               id="genre"
//               value={selectedOption}
//               onChange={(e) => setSelectedOption(e.target.value)}
//               className="w-full py-3 px-4 cursor-pointer text-white border-b-2 border-gray-200 border-opacity-40 backdrop-blur-2xl bg-transparent focus:outline-none focus:border-purple-400 transition-all"
//             >
//               <option value="" disabled className="bg-purple-800 text-gray-300">
//                 Choose a genre
//               </option>
//               {options.map((option) => (
//                 <option key={option} value={option} className="bg-purple-800 text-white">
//                   {option}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Generate Button */}
//           <button
//             type="button"
//             onClick={handleGenerate}
//             className="w-full py-3 mt-4 text-white font-semibold rounded-lg bg-purple-600 hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-200"
//           >
//             Generate Music
//           </button>
//         </form>
//       </div>

//       {/* Music Generated Section */}
//       <div className="w-full flex justify-center mt-12">
//         <MusicGenerated />
//       </div>
//     </div>
//   );
// };

// export default HomePage;
