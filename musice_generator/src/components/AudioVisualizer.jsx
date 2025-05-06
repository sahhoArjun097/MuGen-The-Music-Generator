import { useRef, useEffect } from 'react';

const AudioVisualizer = ({ analyser, isPlaying }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!analyser || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform before scaling
      canvas.width = canvas.clientWidth * window.devicePixelRatio;
      canvas.height = canvas.clientHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      animationRef.current = requestAnimationFrame(render);

      analyser.getByteFrequencyData(dataArray);
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;

      ctx.clearRect(0, 0, width, height);
      const barWidth = (width / bufferLength) * 2.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] * 0.8;
        const gradient = ctx.createLinearGradient(0, height, 0, height - barHeight);
        gradient.addColorStop(0, `rgb(${barHeight + 100}, 50, 200)`);
        gradient.addColorStop(0.5, `rgb(150, ${barHeight / 2}, ${barHeight + 100})`);
        gradient.addColorStop(1, `rgb(200, 100, ${barHeight + 50})`);

        ctx.fillStyle = gradient;

        const radius = Math.min(barWidth / 2, 4);
        ctx.beginPath();
        ctx.moveTo(x + radius, height);
        ctx.lineTo(x + barWidth - radius, height);
        ctx.quadraticCurveTo(x + barWidth, height, x + barWidth, height - radius);
        ctx.lineTo(x + barWidth, height - barHeight + radius);
        ctx.quadraticCurveTo(x + barWidth, height - barHeight, x + barWidth - radius, height - barHeight);
        ctx.lineTo(x + radius, height - barHeight);
        ctx.quadraticCurveTo(x, height - barHeight, x, height - barHeight + radius);
        ctx.lineTo(x, height - radius);
        ctx.quadraticCurveTo(x, height, x + radius, height);
        ctx.fill();
        ctx.closePath();

        x += barWidth + 1;
      }
    };

    if (isPlaying) render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [analyser, isPlaying]);

  return (
    <div className="w-full aspect-[16/6] bg-gray-900/50 rounded-lg overflow-hidden relative">
      <canvas ref={canvasRef} className="w-full h-full block" />
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-400 text-sm">Play to visualize audio</p>
        </div>
      )}
    </div>
  );
};

export default AudioVisualizer;
