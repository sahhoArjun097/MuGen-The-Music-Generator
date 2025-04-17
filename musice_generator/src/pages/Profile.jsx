import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.authSlice.userData.user);

  return (
  
    <div className="min-h-screen container-profile py-10 px-4">
      <div className="max-w-4xl mt-16 mx-auto bg-white rounded-xl shadow-md p-6">
        {/* Profile Header */}
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-indigo-500 shadow-md">
            {user.profile_picture ? (
              <img
              src={user.profile_picture}
                alt="Profile"
                className="w-full h-full object-cover"
                />
            ) : (
              <div className="w-full h-full bg-indigo-500 text-white flex items-center justify-center text-2xl font-bold">
                {user.email?.[0]?.toUpperCase()}
              </div>
            )}
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
            <p className="text-gray-500">{user.email}</p>
            <div className="flex gap-2 mt-2">
              <span className="bg-indigo-100 text-indigo-700 text-sm px-3 py-1 rounded-full">
                Tokens: {user.token}
              </span>
              <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
                Songs: {user.songs?.length || 0}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 text-center">
          <div>
            <p className="text-xl font-semibold text-gray-700">{user.songs?.length || 0}</p>
            <p className="text-sm text-gray-500">Tracks Created</p>
          </div>
          <div>
            <p className="text-xl font-semibold text-gray-700">128h</p>
            <p className="text-sm text-gray-500">Listening Time</p>
          </div>
          <div>
            <p className="text-xl font-semibold text-gray-700">23</p>
            <p className="text-sm text-gray-500">Favorites</p>
          </div>
          <div>
            <p className="text-xl font-semibold text-gray-700">156</p>
            <p className="text-sm text-gray-500">Downloads</p>
          </div>
        </div>

        {/* Tabs Placeholder */}
        <div className="mt-10">
          <div className="flex space-x-4 border-b pb-2 mb-4">
            <button className="text-sm font-medium text-indigo-600 border-b-2 border-indigo-600 pb-1">
              Preferences
            </button>
            <button className="text-sm text-gray-500">Recent</button>
            <button className="text-sm text-gray-500">Favorites</button>
            <button className="text-sm text-gray-500">Playlists</button>
          </div>

          {/* Preferences Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Music Generation Preferences</h2>
            <p className="text-sm text-gray-500 mb-4">Your default settings when creating new music</p>
            <p className="text-sm font-medium text-gray-700">Preferred Genres</p>
            <div className="flex gap-2 mt-2">
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">Electronic</span>
              <span className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm">Lo-Fi</span>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">Ambient</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};








  
  

export default Profile;
