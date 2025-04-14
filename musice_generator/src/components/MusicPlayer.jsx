
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { removeAudioUrl } from "../utils/authslice";
const MusicPlayer = ({ setShow , setLoading }) => {
    const canvasRef = useRef(null);
    const audioRef = useRef(new Audio());
    const [audioCtx, setAudioCtx] = useState(null);
    const [analyser, setAnalyser] = useState(null);
    const [source, setSource] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [progress, setProgress] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        const audioUrl = localStorage.getItem("audioSrc");
        if (!audioUrl) {
            console.warn("No audio URL found in localStorage");
            return;
        }
        audioRef.current.src = audioUrl;
        audioRef.current.volume = volume;
        audioRef.current.controls = false;
        audioRef.current.addEventListener("timeupdate", () => {
            setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
        });
        audioRef.current.addEventListener("ended", () => {
            setIsPlaying(false);
        });
    }, []);
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
    const handleBackClick = () => {
        alert("do you want to save the file")
        dispatch(removeAudioUrl());
        setShow(false);
        setLoading(true)
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
        <div className="w-full min-h-screen" style={{ textAlign: "center", background: "black", color: "white", padding: "20px" }}>
            <h1 className="mt-40">Audio Visualizer</h1>
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
                <button onClick={handleDownload} style={buttonStyle}>Download ⬇</button>
            </div>
            <button onClick={handleBackClick} style={buttonStyle}>
                Back to Generator
            </button>
            <canvas ref={canvasRef} style={{ display: "block", margin: "20px auto", background: "#222" }}></canvas>
        </div>
    );
};
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