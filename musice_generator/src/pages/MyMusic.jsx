import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {
  FaHeart,
  FaDownload,
  FaShareAlt,
  FaPlay,
  FaPause,
  FaHeadphones,
} from 'react-icons/fa';

const TABS = ['Recent', 'Favorites', 'Playlists', 'Preferences'];

function MyMusic() {
  const [activeTab, setActiveTab] = useState('Recent');
  const [songs, setSongs] = useState([]);
  const [isPlayingIndex, setIsPlayingIndex] = useState(null);
  const audioRef = useRef(null);
  const userData = useSelector((state) => state.authSlice.userData.user);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/${userData.email}/songs`);
        setSongs(res.data);

        console.log(res.data)
      } catch (err) {
        console.error("Failed to fetch songs", err);
      }
    };

    if (userData?.email) fetchSongs();
  }, [userData]);

  const togglePlay = (index, url) => {
    if (isPlayingIndex === index) {
      audioRef.current.pause();
      setIsPlayingIndex(null);
    } else {
      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.play();
        setIsPlayingIndex(index);
      }
    }
  };

  const renderSongs = () => {
    let filtered = songs;

    if (activeTab === 'Favorites') {
      filtered = songs.filter((song) => song.isFavorite);
    } else if (activeTab === 'Playlists') {
      filtered = songs.filter((song) => song.playlistName);
    }

    if (filtered.length === 0) {
      return <p className="text-center text-gray-400">No songs in this category yet.</p>;
    }

    return (
      <div className="grid gap-6 p-4">
        {filtered.map((song, index) => (
          <div key={index} className="bg-gradient-to-r from-purple-200 via-violet-300 to-indigo-300 rounded-xl shadow-md p-6 flex flex-col gap-4 hover:shadow-lg transition">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{`Gen-Track ${index + 1}`}</h2>
                <p className="text-sm text-gray-500">
                  {song.file_mood || "Unknown"} • {song.duration || "2:00"} • Created {song.createdAt || "recently"}
                </p>
              </div>
              <div className="flex gap-3 text-gray-600 text-lg">
                <FaHeart className="cursor-pointer hover:text-red-500" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => togglePlay(index, song.file_url)}
                className="w-10 h-10 bg-gradient-to-r from-teal-400 via-indigo-300 to-blue-500 flex items-center justify-center rounded-full hover:bg-gray-200"
              >
                {isPlayingIndex === index ? <FaPause className="text-gray-700" /> : <FaPlay className="text-gray-700" />}
              </button>
              <div className="flex-1  h-12 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500  rounded-md flex items-center justify-center overflow-hidden">

               
                <div className="loader">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
                

              </div>
            </div>

            <div className="flex gap-6 text-gray-500 text-sm items-center">
              <div className="flex items-center gap-1">

              </div>
              <div className="flex items-center gap-1">

              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 mx-auto bg-black w-full min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-white mt-20">🎵 My Tracks</h2>

      {/* Hidden global audio element */}
      <audio
        ref={audioRef}
        onEnded={() => setIsPlayingIndex(null)}
      />

      {/* Tab Navigation */}
      <div className="flex justify-center space-x-2 mb-8">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-md border font-semibold ${activeTab === tab
              ? 'bg-white text-black border-gray-300'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {renderSongs()}
    </div>
  );
}

export default MyMusic;
