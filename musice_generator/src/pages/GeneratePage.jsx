import {useState}from 'react'

const GeneratePage = () => {
    const [selectedOption, setSelectedOption] = useState("");
    const [prompt, setPrompt] = useState("");
    const moods = ["Cheerful", "Sorrow", "Up Lifiting", "Rock"];
  
    const handleGenerate = () => {
        if(selectedOption == "")
            alert("Please select a mood first")
        else
            alert(`Generating music for mood: ${selectedOption}`);
    };
  
    return (
      
      <div className=" min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <h1 className="sm:text-6xl md:text-6xl lg:text-7xl text-5xl font-bold mb-8">Generate Music</h1>
        <p className="text-lg mb-9">Choose a mood to create your track.</p>
        <div className="w-full max-w-md">
          <label className="block text-lg mb-2">Select mood</label>
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="w-full px-4 py-2 mb-4 bg-gray-800 text-white border border-gray-700 rounded-lg cursor-pointer"
          >
            <option value="" disabled>
              Choose a mood
            </option>
            {moods.map((mood) => (
              <option key={mood} value={mood}>
                {mood}
              </option>
            ))}
          </select>
          
          <button
            onClick={handleGenerate}
            className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
          >
            Generate
          </button>
        </div>
      </div>
    
    );
  };

export default GeneratePage
