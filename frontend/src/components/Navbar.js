import { useState, useEffect } from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );
    return () => {
      if (authListener && typeof authListener === "function") {
        authListener();
      }
    };
  }, []);

  const handleDashboard = () => {
    navigate("/dashboard");
    setDropdownOpen(false);
    setMenuOpen(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
    setDropdownOpen(false);
    setMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="sticky top-0 bg-white bg-opacity-90 px-8 py-3 flex justify-between items-center shadow-md z-50">
      {/* Logo */}
      <div className="flex space-x-8 ">
        <div className="flex items-center ">
        <Link to="/" className="flex items-center">
          <img
            src="/assets/logohealth.jpg"
            alt="Logo"
            className="h-10 w-10 rounded-full mr-2"
          />
          <span className="text-4xl font-bold  font-montserrat text-logocolor">QuickCare</span>
        </Link>
        </div>
      {/* Menu for larger screens */}
      <div className="hidden lg:flex items-center space-x-6">
        {["/Home", "/Bookappointment", "/Myappointment", "/medicalDiagnosis", "/getHealthRecommendation", "/contact"].map((path, idx) => (
          <NavLink
            key={idx}
            to={path}
            className={({ isActive }) =>
              `text-black font-lato items-center hover:text-logocolor font-medium text-lg duration-200 ${
                isActive ? "text-black " : "text-black"
              }`
            }
          >
            {path === "/"
              ? "Home"
              : path.slice(1).replace(/\b\w/g, (l) => l.toUpperCase())}
          </NavLink>
        ))}
      </div>
      </div>



      {/* Burger Menu Button for smaller screens */}
      <div className="lg:hidden flex items-center">
        <button onClick={toggleMenu} className="text-gray-300 text-2xl">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Combined Dropdown Menu for smaller screens */}
      {(menuOpen || dropdownOpen) && (
        <div className="absolute top-14 left-0 w-full bg-gray-700 bg-opacity-90 shadow-md lg:hidden">
          <ul className="flex flex-col items-center py-4">
            {["/", "/xyz", "/xyz", "/xyz", "/xyz", "/contact"].map((path, idx) => (
              <li key={idx} className="w-full text-center py-2">
                <NavLink
                  to={path}
                  onClick={() => {
                    setMenuOpen(false);
                    setDropdownOpen(false);
                  }}
                  className={({ isActive }) =>
                    `block text-gray-300 hover:text-white duration-200 ${
                      isActive ? "text-white font-bold" : ""
                    }`
                  }
                >
                  {path === "/"
                    ? "Home"
                    : path.slice(1).replace(/\b\w/g, (l) => l.toUpperCase())}
                </NavLink>
              </li>
            ))}
            {user && (
              <>
                <li
                  className="w-full text-center py-2 cursor-pointer text-gray-300 hover:text-white"
                  onClick={handleDashboard}
                >
                  Dashboard
                </li>
                <li
                  className="w-full text-center py-2 cursor-pointer text-gray-300 hover:text-white"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </>
            )}
          </ul>
        </div>
      )}

      {/* User Profile with Dropdown */}
      <div className="relative hidden lg:flex">
        {user ? (
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center">
              {user.email[0].toUpperCase()}
            </div>
          </div>
        ) : (
          <span className="text-gray-400">Loading...</span>
        )}

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            <ul className="text-gray-700">
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={handleDashboard}
              >
                Dashboard
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;