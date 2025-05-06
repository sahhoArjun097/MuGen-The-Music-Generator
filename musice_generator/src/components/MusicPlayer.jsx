
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { removeAudioUrl } from "../utils/authslice";
import { Play, Pause, Download, ArrowLeft } from 'lucide-react';
import AudioVisualizer from "./AudioVisualizer";
const MusicPlayer = ({ setShow , loading, setLoading }) => {
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
        setLoading(false)
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
        <div className="w-full min-h-screen flex flex-col items-center justify-center py-8 px-4">
      <div className="w-full max-w-3xl bg-black/60 backdrop-blur-xl rounded-2xl shadow-2xl p-6 text-white">
        <div className="flex items-center mb-8">
          <button 
            onClick={handleBackClick} 
            className="p-2 rounded-full hover:bg-gray-800 transition"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold mx-auto">Audio Visualizer</h1>
        </div>
        
        <AudioVisualizer analyser={analyser} isPlaying={isPlaying} />
        
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            {/* <span className="text-sm text-gray-400">{formatTime(currentTime)}</span> */}
            {/* <span className="text-sm text-gray-400">{formatTime(duration)}</span>            */}
          </div>
          
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgressChange}
            className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
          
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePlayPause}
                className="p-3 bg-purple-600 hover:bg-purple-700 rounded-full transition-colors"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              
              <div className="flex items-center space-x-2 ml-4">
                <span className="text-xs sm:text-sm text-gray-400">Volume</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 sm:w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
              </div>
            </div>
            
            <button
              onClick={handleDownload}
              className="flex items-center px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors text-sm"
            >
              <Download size={16} className="mr-1" /> Download
            </button>
          </div>
        </div>
      </div>
      
      <audio ref={audioRef} className="hidden" />
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