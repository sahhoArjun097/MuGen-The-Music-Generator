
// import { useEffect, useRef, useState } from 'react'
// export default function GenerationPage() {
//   const [selectedOption, setSelectedOption] = useState("");
//   const [show, setShow] = useState(false);

//   const canvasRef = useRef(null);
//   const audioRef = useRef(null);
//   const [audioCtx, setAudioCtx] = useState(null);
//   const [analyser, setAnalyser] = useState(null);
//   const [source, setSource] = useState(null);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     const audio = new Audio();
//     audio.src = URL.createObjectURL(file);
//     audio.controls = true;
//     audioRef.current = audio;
//     document.body.appendChild(audio);

//     const context = new (window.AudioContext || window.webkitAudioContext)();
//     const analyserNode = context.createAnalyser();
//     analyserNode.fftSize = 256;

//     const sourceNode = context.createMediaElementSource(audio);
//     sourceNode.connect(analyserNode);
//     analyserNode.connect(context.destination);

//     setAudioCtx(context);
//     setAnalyser(analyserNode);
//     setSource(sourceNode);
//   };

//   useEffect(() => {
//     if (audioCtx && analyser && source) {
//       visualize();
//     }
//   }, [audioCtx, analyser, source]);

//   const visualize = () => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     canvas.width = window.innerWidth * 0.9;
//     canvas.height = 300;

//     const bufferLength = analyser.frequencyBinCount;
//     const dataArray = new Uint8Array(bufferLength);

//     const draw = () => {
//       requestAnimationFrame(draw);
//       analyser.getByteFrequencyData(dataArray);

//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       const barWidth = (canvas.width / bufferLength) * 2.5;
//       let x = 0;

//       for (let i = 0; i < bufferLength; i++) {
//         const barHeight = dataArray[i] / 2;
//         ctx.fillStyle = `rgb(${barHeight + 100}, 50, 200)`;

//         ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
//         x += barWidth + 1;
//       }
//     };
//     draw();
//   };


//   const moods = ["Cheerful", "Sorrow", "Up Lifiting", "Rock"];

//   const handleGenerate = () => {

//     if (selectedOption == "")
//       alert("Please select a mood first")
//     else
//       setShow(true)
//   };
//   const handleback = () => {
//     setShow(false)
//   }
//   return (
//     <>
//       <div className="min-h-screen  flex flex-col bg-black text-gray-900">
//         {/* Progress Bar */}
//         <div className="w-full h-[1px]  bg-slate-500 flex items-center  mt-24">
//           <div className="w-1/4 h-[4px] bg-white "></div>
//         </div>

//         {/* Conditional Rendering */}
//         {show === false ? (
//           <div className="max-w-2xl justify-center items-center *: w-full px-6 mt-20">
//             <h2 className="text-5xl font-bold">
//               Pick your
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
//                 {" "}Mood
//               </span>
//             </h2>
//             <p className="text-gray-500 mt-2">
//               Choosing your music style will help us generate tunes that match emotions like sorrow, rock, or cheerful.
//             </p>

//             {/* Mood Selection Dropdown */}
//             <div className="mt-6">
//               <select
//                 value={selectedOption}
//                 onChange={(e) => setSelectedOption(e.target.value)}
//                 className="w-full px-4 py-2 mb-4 bg-gray-800 text-white border border-gray-700 rounded-lg cursor-pointer"
//               >
//                 <option value="" disabled>
//                   Choose a mood
//                 </option>
//                 {moods.map((mood) => (
//                   <option key={mood} value={mood}>
//                     {mood}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Continue Button */}
//             <button
//               onClick={handleGenerate}
//               className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-400 to-pink-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
//             >
//               Continue →
//             </button>
//           </div>
//         ) : (
//           <div className="min-h-screen flex flex-col bg-black text-gray-900">
//             {/* Back Button in the Top-Left Corner */}
//             <div className='w-full '>

//               <button onClick={handleback} className=" bg-gray-800  text-white p-2 rounded-full shadow-lg hover:bg-gray-700 transition">
//                 ←
//               </button>
//             </div>
//             <div
//       style={{
//         textAlign: "center",
//         background: "black",
//         color: "white",
//         padding: "20px",
//       }}
//     >

//       <input type="file" accept="audio/*" onChange={handleFileChange} />
//       <canvas
//         ref={canvasRef} className='bg-black'
//         style={{ display: "block", margin: "20px auto" }}
//       ></canvas>
//     </div>



//           </div>

//         )}


//       </div>

//       <hr />
//     </>
//   );
// }


import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const GenerationPage = () => {

  const [genre, setGenre] = useState("Electronic");
  const [mood, setMood] = useState("Upbeat");
  const [length, setLength] = useState(20);
  const [tokens, setTokens] = useState(200);
  const [show, setShow] = useState(false);
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const [audioCtx, setAudioCtx] = useState(null);
  const [analyser, setAnalyser] = useState(null);
  const [source, setSource] = useState(null);
  const [colorShift, setColorShift] = useState(0);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const audio = new Audio();
    audio.src = URL.createObjectURL(file);
    audio.controls = true;
    audioRef.current = audio;
    document.body.appendChild(audio);

    const context = new (window.AudioContext || window.webkitAudioContext)();
    const analyserNode = context.createAnalyser();
    analyserNode.fftSize = 256;

    const sourceNode = context.createMediaElementSource(audio);
    sourceNode.connect(analyserNode);
    analyserNode.connect(context.destination);

    setAudioCtx(context);
    setAnalyser(analyserNode);
    setSource(sourceNode);
  };

  useEffect(() => {
    if (audioCtx && analyser && source) {
      visualize();
    }
  }, [audioCtx, analyser, source]);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorShift((prev) => (prev + 30) % 360);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const visualize = () => {
    const canvas = canvasRef.current;
    // const barWidth = (canvas.width / bufferLength) * 2.5;
    // const barWidth = (canvas.width / bufferLength) * 5; // Increase width
    // x += barWidth; // Remove extra gap


    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth * 0.9;
    canvas.height = 300;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const barWidth = (canvas.width / bufferLength) * 2.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] / 2;

        // Create a dynamic gradient effect
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, `hsl(${(colorShift + barHeight) % 360}, 100%, 60%)`);
        gradient.addColorStop(1, `hsl(${(colorShift + barHeight + 60) % 360}, 100%, 40%)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
      }
    };
    draw();
  };
  const handleGenerateMusic = () => {
    setShow(true)

  }

  return (
    <>
      {
        !show ?
          <div className="flex flex-col containerss items-center  min-h-screen bg-gradient-to-br  from-black to-gray-900 text-white  p-5 md:p-10">
            <div className="w-full h-full mt-6 flex flex-col justify-center items-center">
              <h1 className="text-4xl font-extrabold tracking-wide text-center mt-10">AI Music Generator</h1>
              <p className="text-gray-400 text-lg mt-2">Create unique music tracks with our AI-powered generator using tokens</p>
            </div>

            <div className="flex  w-full justify-center gap-12 mt-12 flex-wrap  md:p-6">
              {/* Main Music Generator Box */}
              <motion.div
                className=" p-8 rounded-xl shadow-2xl max-w-xl w-full bg-opacity-10 border-t-white border-s-white border border-gray-700"
              >
                <h2 className="text-3xl font-bold text-white">Music Generator</h2>
                <p className="text-lg text-gray-50 mt-2">Configure your music parameters and generate unique tracks</p>
                {/* Mood Selector */}
                <div className="mt-6">
                  <label className="block text-lg font-medium text-white">Mood</label>
                  <select
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    className="w-full p-4 border rounded-lg bg-gray-800 text-white text-lg"
                  >
                    <option>Upbeat</option>
                    <option>Chill</option>
                    <option>Dark</option>
                  </select>
                </div>
                {/* Length Slider */}
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
          </div> :
          <div className="w-full min-h-screen  p-14  text-white">
            <div
              style={{
                textAlign: "center",
                background: "black",
                color: "white",
                padding: "20px",
              }}
            >
              <h1>Audio Visualizer</h1>
              <input type="file" accept="audio/*" onChange={handleFileChange} />
              <canvas
                ref={canvasRef}
                style={{ display: "block", margin: "20px auto", background: "#222" }}
              ></canvas>
            </div>

          </div>

      }
    </>

  );
};

export default GenerationPage;
