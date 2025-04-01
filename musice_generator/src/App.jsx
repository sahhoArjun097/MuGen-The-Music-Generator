import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DashboardPage from "./pages/Dashboard";
import MyMusicPage from "./pages/MyMusic";
import GeneratePage from "./pages/GeneratePage";
import ProfilePage from "./pages/Profile"; // Renamed 'Pattern' to 'ProfilePage' for clarity
import Pricing from "./pages/Pricing";
import MoodselectionPage from "./pages/MoodselectionPage";


const App = () => {
  return (
    <Router>
      <ConditionalNavbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/generate" element={<MoodselectionPage/>} />
        {/* <Route path="/generate" element={<GeneratePage />} /> */}
        <Route path="/mymusic" element={<MyMusicPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>
      <Footer />
    </Router>
  );
};

// Component to conditionally render Navbar
const ConditionalNavbar = () => {
  const location = useLocation();
  const hideNavbarPaths = ["/", "/signup"];

  return hideNavbarPaths.includes(location.pathname) ? null : <Navbar />;
};

export default App;
