import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed  z-20 top-0 left-0 w-full flex items-center justify-between p-4 py-6 px-6 sm:px-14 bg-transparent ">

      <div className="text-white text-2xl sm:text-3xl font-bold">
        <NavLink to="/dashboard">MuGen AI</NavLink>
      </div>


      <div className="hidden md:flex space-x-2 sm:space-x-6 sm:text-lg text-sm transition-none">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `text-md py-2 px-2 font-semibold transition-all duration-150 ${isActive ? "text-white border-b-4" : "text-white hover:border-b"
            }`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/generate"
          className={({ isActive }) =>
            `text-md py-2 px-2 font-semibold transition-all duration-150 ${isActive ? "text-white border-b-4" : "text-white hover:border-b"
            }`
          }
        >
          Generate Music
        </NavLink>
        <NavLink
          to="/mymusic"
          className={({ isActive }) =>
            `text-md py-2 px-2 font-semibold transition-all duration-150 ${isActive ? " text-white border-b-4" : " text-white border-b-2 border-transparent transition-all duration-300 ease-in-out hover:border-white"
            }`
          }
        >
          My Tracks
        </NavLink>
        
        <NavLink
          to="/pricing"
          className={({ isActive }) =>
            `text-md py-2 px-2 font-semibold transition-all duration-150 ${isActive ? " text-white border-b-4" : " text-white border-b-2 border-transparent transition-all duration-300 ease-in-out hover:border-white"
            }`
          }
        >
          Pricing
        </NavLink>

        <div className="relative inline-flex">
          <NavLink
            to=""
            className="text-md px-2 font-semibold transition-all duration-150"
          >
            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center font-bold shadow-lg">
              <span className="text-white">P</span>
            </div>
          </NavLink>

          <div
            className="flex  items-center cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                className={`w-6 h-6 text-white transition-transform ${isOpen ? "rotate-180" : "rotate-0"
                  }`}
                fill="currentColor"
              >
                <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
              </svg>
            </div>
          </div>
          {isOpen && (
            <div
              role="menu"
              className="absolute right-0 top-12 z-10 w-48 rounded border border-gray-300 bg-white shadow-md"
            >
              <NavLink
                to="/profile"
                className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                role="menuitem"
              >
                View Profile
              </NavLink>

              <NavLink
                to="/settings"
                className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                role="menuitem"
              >
                Settings
              </NavLink>
              <NavLink to="/">
                <button
                  type="button"
                  className="block w-full px-3 py-2 text-left text-sm font-medium text-red-700 hover:bg-red-50"
                >
                  Logout
                </button>

              </NavLink>

            </div>
          )}
        </div>


        {/* <div className="absolute right-0 mt-2 w-30 bg-gray-800 text-white rounded-md shadow-lg">
          <NavLink
            to="/profile"
            className="block px-4 py-2 hover:bg-gray-700 transition duration-150"
          >
            Profile
          </NavLink>
          <NavLink
            to="/logout"
            className="block px-4 py-2 hover:bg-red-600 transition duration-150"
          >
            Logout
          </NavLink>
        </div> */}

        {/* <NavLink to="/login">
          <button className="text-purple-900 bg-white rounded-full py-2 px-4 text-md font-semibold hover:bg-opacity-75 transition-all duration-150">
            Logout
          </button>
        </NavLink> */}
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
      <div className={`absolute top-full text-3xl w-full h-screen bg-gray-800 text-white flex flex-col justify-evenly items-center py-6 z-20 md:hidden transition-all duration-300 ${isMenuOpen ? "right-0" : "-right-full"}`}>
        <div className="flex flex-col w-full text-center">


          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `text-md py-12 w-full font-semibold transition-all duration-150 ${isActive ? "bg-slate-100 bg-opacity-30" : "text-white hover:bg-slate-100 hover:bg-opacity-20"
              }`
            }
            onClick={toggleMenu}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/generate"
            className={({ isActive }) =>
              `text-md py-12 w-full font-semibold transition-all duration-150 ${isActive ? "bg-slate-100 bg-opacity-30" : "text-white hover:bg-slate-100 hover:bg-opacity-20"
              }`
            }
            onClick={toggleMenu}
          >
            Generate Music
          </NavLink>
          <NavLink
            to="/mymusic"
            className={({ isActive }) =>
              `text-md py-12 w-full font-semibold transition-all duration-150 ${isActive ? "bg-slate-100 bg-opacity-30" : "text-white hover:bg-slate-100 hover:bg-opacity-20"
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
