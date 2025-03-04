import  { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full flex items-center  z-10 justify-between p-4 py-6 px-6 sm:px-14 bg-transparent z-10">
      {/* Logo */}
      <div className="text-white text-2xl sm:text-3xl font-bold">
        <NavLink to="/dashboard">MuGen AI</NavLink>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex space-x-2 sm:space-x-6 sm:text-lg text-sm transition-none">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `text-md py-2 px-2 font-semibold transition-all duration-150 ${
              isActive ? "text-white border-b-4" : "text-white hover:border-b"
            }`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/generate"
          className={({ isActive }) =>
            `text-md py-2 px-2 font-semibold transition-all duration-150 ${
              isActive ? "text-white border-b-4" : "text-white hover:border-b"
            }`
          }
        >
          Generate Music
        </NavLink>
        <NavLink
          to="/mymusic"
          className={({ isActive }) =>
            `text-md py-2 px-2 font-semibold transition-all duration-150 ${
              isActive ? "text-white border-b-4" : "text-white hover:border-b"
            }`
          }
        >
          My Tracks
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `text-md py-2 px-2 font-semibold transition-all duration-150 ${
              isActive ? "text-white border-b-4" : "text-white hover:border-b"
            }`
          }
        >
          Profile
        </NavLink>
        <NavLink to="/login">
          <button className="text-purple-900 bg-white rounded-full py-2 px-4 text-md font-semibold hover:bg-opacity-75 transition-all duration-150">
            Logout
          </button>
        </NavLink>
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="md:hidden flex items-center">
        <button
          onClick={toggleMenu}
          className="text-white text-2xl focus:outline-none"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <span className="text-4xl">
            {isMenuOpen ? "×" : "≡"}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
        <div className={`absolute top-full text-3xl w-full h-screen bg-gray-800 text-white flex flex-col justify-evenly items-center py-6 z-20 md:hidden transition-all duration-300 ${isMenuOpen?"right-0":"-right-full"}`}>
          <div className="flex flex-col w-full text-center">

          
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `text-md py-12 w-full font-semibold transition-all duration-150 ${
                isActive ? "bg-slate-100 bg-opacity-30" : "text-white hover:bg-slate-100 hover:bg-opacity-20"
              }`
            }
            onClick={toggleMenu}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/generate"
            className={({ isActive }) =>
              `text-md py-12 w-full font-semibold transition-all duration-150 ${
                isActive ? "bg-slate-100 bg-opacity-30" : "text-white hover:bg-slate-100 hover:bg-opacity-20"
              }`
            }
            onClick={toggleMenu}
          >
            Generate Music
          </NavLink>
          <NavLink
            to="/mymusic"
            className={({ isActive }) =>
              `text-md py-12 w-full font-semibold transition-all duration-150 ${
                isActive ? "bg-slate-100 bg-opacity-30" : "text-white hover:bg-slate-100 hover:bg-opacity-20"
              }`
            }
            onClick={toggleMenu}
          >
            My Tracks
          </NavLink>
          </div>
          <NavLink to="/login">
            <button
              onClick={toggleMenu}
              className="text-purple-900 bg-white rounded-full py-4 px-12 text-md font-semibold hover:bg-opacity-75 transition-all duration-150"
            >
              Logout
            </button>
          </NavLink>
        </div>
    </nav>
  );
};

export default Navbar;
