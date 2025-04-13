import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

function MyMusic() {
  const [songs, setSongs] = useState([]);
  const userData = useSelector((state) => state.authSlice.userData.user);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/${userData.email}/songs`);
        setSongs(res.data);
      } catch (err) {
        console.error("Failed to fetch songs", err);
      }
    };

    if (userData?.email) fetchSongs();
  }, [userData]);

  return (
    <div className=" p-6   mx-auto bg-black w-full min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-white mt-32">🎵 My Tracks</h2>

      {songs.length === 0 ? (
        <p className="text-center text-gray-400">No songs uploaded yet.</p>
      ) : (
        <div className="grid gap-6 p-16">
          {songs.map((song, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-r from-gray-800 to-gray-900 p-5 rounded-lg shadow-md flex flex-col sm:flex-row items-center justify-between"
            >
              <div className="flex-1 mb-4 sm:mb-0">
                <p className="text-white font-semibold text-lg mb-2 truncate">{`Track ${idx + 1}`}</p>
                <p className="text-sm text-blue-300">Mood: {song.file_mood || "Unknown"}</p>
              </div>


              <audio
                controls
                src={song.file_url}
                className="w-full sm:w-64 outline-none rounded-lg"
              >
                Your browser does not support the audio element.
              </audio>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyMusic;
