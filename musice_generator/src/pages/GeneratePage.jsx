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


import React, { useState } from 'react'
import Selection from '../components/Selection'

function GeneratePage() {
  const [show, setShow] = useState(false)

  return (
    <div className=' w-full min-h-screen flex  justify-center items-center bg-black'>
      <div className='w-[99%]  flex justify-center items-center bg-white'>
        {
          show === "false" ?

            <button
              onClick={handleGenerate}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-400 to-pink-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
            >
              Continue →
            </button>
            : <div></div>

        }

      </div>
    </div>
  )
}

export default GeneratePage