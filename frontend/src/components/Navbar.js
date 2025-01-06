import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { supabase } from "../supabaseClient"; 

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false); 
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null); 
    });
    return () => {
      if (authListener && typeof authListener === 'function') {
        authListener(); 
      }
    };
  }, []);

  const handleDashboard = () => {
    navigate("/dashboard");
    setDropdownOpen(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut(); 
    navigate("/login"); 
  };

  return (
    <nav className="bg-white shadow-md px-4 py-2 flex justify-between items-center relative">
      
      <div className="text-xl font-semibold text-blue-600">HealthApp</div>

      {/* User Profile with Dropdown */}
      <div className="relative">
        {user ? (
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)} 
          >
            <span className="text-gray-700">{user.email}</span>
            <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center">
              {user.email[0].toUpperCase()}
            </div>
          </div>
        ) : (
          <span className="text-gray-500">Loading...</span>
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
