// import React, { useEffect, useRef, useState } from "react";

// const MusicPlayer = () => {
//   const canvasRef = useRef(null);
//   const audioRef = useRef(new Audio()); // Create an audio element
//   const [audioCtx, setAudioCtx] = useState(null);
//   const [analyser, setAnalyser] = useState(null);
//   const [source, setSource] = useState(null);

//   useEffect(() => {
//     const audioUrl = localStorage.getItem("audioSrc");
//     if (!audioUrl) {
//       console.warn("No audio URL found in localStorage");
//       return;
//     }

//     // Set up audio element with the stored URL
//     audioRef.current.src = audioUrl;
//     audioRef.current.controls = true;
//     document.body.appendChild(audioRef.current);

//     // Set up Web Audio API
//     const context = new (window.AudioContext || window.webkitAudioContext)();
//     const analyserNode = context.createAnalyser();
//     analyserNode.fftSize = 256;

//     const sourceNode = context.createMediaElementSource(audioRef.current);
//     sourceNode.connect(analyserNode);
//     analyserNode.connect(context.destination);

//     setAudioCtx(context);
//     setAnalyser(analyserNode);
//     setSource(sourceNode);
//   }, []);

//   useEffect(() => {
//     if (audioCtx && analyser && source) {
//       visualize();
//     }
//   }, [audioCtx, analyser, source]);

//   const visualize = () => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
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
//         ctx.fillStyle = "rgb(${barHeight + 100}, 50, 200)";
//         ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
//         x += barWidth + 1;
//       }
//     };
//     draw();
//   };

//   return (
//     <div
//       style={{
//         textAlign: "center",
//         background: "black",
//         color: "white",
//         padding: "20px",
//       }}
//     >
//       <h1>Audio Visualizer</h1>
//       <canvas
//         ref={canvasRef}
//         style={{ display: "block", margin: "20px auto", background: "#222" }}
//       ></canvas>
//     </div>
//   );
// };

// export default MusicPlayer;

import React, { useEffect, useRef, useState } from "react";
import api from "../api";

const MusicPlayer = ({ setShow }) => {
    const canvasRef = useRef(null);
    const audioRef = useRef(new Audio()); // Audio element reference
    const [audioCtx, setAudioCtx] = useState(null);
    const [analyser, setAnalyser] = useState(null);
    const [source, setSource] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const audioUrl = localStorage.getItem("audioSrc");
        if (!audioUrl) {
            console.warn("No audio URL found in localStorage");
            return;
        }

        audioRef.current.src = audioUrl;
        audioRef.current.volume = volume;
        audioRef.current.controls = false; // We will create custom controls

        // Update progress
        audioRef.current.addEventListener("timeupdate", () => {
            setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
        });

        audioRef.current.addEventListener("ended", () => {
            setIsPlaying(false);
        });
    }, []);
    const handleUploadToBackend = async () => {
        // setIsLoading(true);
    
        try {
            const audioUrl = localStorage.getItem("audioSrc");
            if (!audioUrl) {
                alert("No audio file found!");
                // setIsLoading(false);
                return;
            }
    
            const response = await fetch(audioUrl);
            const blob = await response.blob();
            const file = new File([blob], "generated-music.wav", { type: "audio/wav" });
    
            const formData = new FormData();
            formData.append("audio", file);
            formData.append("user_email", localStorage.getItem("user_email"));
    
            const uploadRes = await api.post("/upload-audio", {
                body: formData,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // Use JWT token if needed
                },
            });
    
            // 🛠 **Fix: Check if response has JSON content**
            const textResponse = await uploadRes.text();
            let uploadData;
            try {
                uploadData = JSON.parse(textResponse); // Parse only if it's valid JSON
            } catch (error) {
                console.warn("Response is not in JSON format:", textResponse);
                uploadData = { msg: textResponse }; // Fallback to raw text response
            }
    
            if (uploadRes.ok) {
                alert("Audio uploaded successfully! 🎶");
                console.log("File URL:", uploadData.file_url);
            } else {
                alert("Upload failed: " + (uploadData.msg || "Unknown error"));
            }
        } catch (error) {
            console.error("Error uploading audio:", error);
            alert("Something went wrong while uploading!");
        } finally {
            // setIsLoading(false);
        }
    };
    
    
    const handlePlayPause = () => {
        if (!audioCtx) {
            const context = new (window.AudioContext || window.webkitAudioContext)();
            const analyserNode = context.createAnalyser();
            analyserNode.fftSize = 256;
            console.log(localStorage.getItem("audioSrc"));


            const sourceNode = context.createMediaElementSource(audioRef.current);
            sourceNode.connect(analyserNode);
            analyserNode.connect(context.destination);

            setAudioCtx(context);
            setAnalyser(analyserNode);
            setSource(sourceNode);

            visualize(analyserNode);
        }

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const visualize = (analyser) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
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
                ctx.fillStyle = "rgb(${barHeight + 100}, 50, 200)";
                ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                x += barWidth + 1;
            }
        };
        draw();
    };

    const handleVolumeChange = (e) => {
        const newVolume = e.target.value;

        setVolume(newVolume);
        audioRef.current.volume = newVolume;
    };

    const handleDownload = () => {
        const audioUrl = localStorage.getItem("audioSrc");
        if (audioUrl) {
            const a = document.createElement("a");
            a.href = audioUrl;
            a.download = "generated-music.wav";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };

    const handleProgressChange = (e) => {
        const newTime = (e.target.value / 100) * audioRef.current.duration;
        audioRef.current.currentTime = newTime;
        setProgress(e.target.value);
    };

    return (
        <div style={{ textAlign: "center", background: "black", color: "white", padding: "20px" }}>
            <h1 className="mt-40">Audio Visualizer</h1>

            {/* Custom Audio Player UI */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                <button onClick={handlePlayPause} style={buttonStyle}>
                    {isPlaying ? "Pause ⏸" : "Play ▶"}
                </button>

                <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={handleProgressChange}
                    style={{ width: "200px" }}
                />

                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    style={{ width: "100px" }}
                />
                <button onClick={handleUploadToBackend} style={buttonStyle}>
    Upload to Backend ☁️
</button>


                <button onClick={handleDownload} style={buttonStyle}>Download ⬇</button>
            </div>  
            <button onClick={() => setShow(false)} style={buttonStyle}>Back to Generator</button>
            {/* Audio Visualizer Canvas */}
            <canvas ref={canvasRef} style={{ display: "block", margin: "20px auto", background: "#222" }}></canvas>
        </div>
    );
};

// Button styles
const buttonStyle = {
    padding: "10px 15px",
    fontSize: "16px",
    background: "#444",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
};

export default MusicPlayer;   