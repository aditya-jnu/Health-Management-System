import { useState, useEffect } from "react";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { 
  Heart,
  Stethoscope, 
  Calendar, 
  ClipboardList,
  Activity,
  HeartPulse,
  MessageCircle
} from "lucide-react";
import { supabase } from "../supabaseClient";
const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  const navItems = [
    { path: "/Home", icon: Heart, label: "Home" },
    { path: "/Bookappointment", icon: Calendar, label: "Book Appointment" },
    { path: "/Myappointment", icon: ClipboardList, label: "My Appointments" },
    { path: "/medicalDiagnosis", icon: Stethoscope, label: "Medical Diagnosis" },
    { path: "/getHealthRecommendation", icon: HeartPulse, label: "Health Tips" },
    { path: "/contact", icon: MessageCircle, label: "Contact" }
  ];

  return (
    <nav className={`sticky top-0 transition-all duration-300 ${
      isScrolled 
        ? "bg-white shadow-lg py-2" 
        : "bg-white/90 backdrop-blur-sm py-3"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img
              src="/assets/QuickCare.png"
              alt="Logo"
              className="h-10 w-10 rounded-full mr-2 transition-transform group-hover:scale-110"
            />
            <span className="text-3xl font-bold font-montserrat bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              QuickCare
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map(({ path, icon: Icon, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  }`
                }
              >
                <Icon className="w-4 h-4 mr-1.5" />
                {label}
              </NavLink>
            ))}
          </div>

          {/* User Profile */}
          <div className="hidden lg:block">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center text-white font-medium">
                    {user.email[0].toUpperCase()}
                  </div>
                  <Activity className="w-4 h-4 text-gray-600" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                    <button
                      onClick={handleDashboard}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                    >
                      <ClipboardList className="w-4 h-4 mr-2" />
                      Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="animate-pulse">
                <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1.5">
              <span className={`block w-6 h-0.5 bg-gray-600 transform transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-gray-600 transform transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-96' : 'max-h-0'}`}>
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map(({ path, icon: Icon, label }) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  }`
                }
              >
                <Icon className="w-4 h-4 mr-1.5" />
                {label}
              </NavLink>
            ))}
            {user && (
              <>
                <button
                  onClick={handleDashboard}
                  className="w-full flex items-center px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg"
                >
                  <ClipboardList className="w-4 h-4 mr-1.5" />
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg"
                >
                  <Heart className="w-4 h-4 mr-1.5" />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;