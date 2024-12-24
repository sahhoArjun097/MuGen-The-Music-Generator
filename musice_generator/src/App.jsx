
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import LoginPage from "./pages/login";
import SignupPage from "./pages/Signup";
// import HomePage from "./pages/Home";
import Navbar from "./components/Navbar";
import DashboardPage from "./pages/Dashboard";
import MyMusicPage from "./pages/MyMusic";
import GeneratePage from "./pages/GeneratePage";
import Pattern from "./pages/Profile";

const App = () => {
  return (
    <Router>
      <ConditionalNavbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* <Route path="/" element={<DashboardPage />} /> */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/generate" element={<GeneratePage />} />
        <Route path="/mymusic" element={<MyMusicPage />} />
        <Route path="/profile" element={<Pattern/>} />
      </Routes>
    </Router>
  );
};

// A helper component to conditionally render the Navbar
const ConditionalNavbar = () => {
  const location = useLocation();

  // Hide Navbar on login and signup pages
  const hideNavbarPaths = ["/login", "/signup"];
  if (hideNavbarPaths.includes(location.pathname)) {
    return null;
  }

  return <Navbar />;
};

export default App;
