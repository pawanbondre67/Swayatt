
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store/store'; // Adjust the import path as needed
import { logout } from '../../redux/slices/Auth/authSlice'; // Adjust the import path as needed
import React, { useState, useRef, useEffect } from 'react';


const Navbar: React.FC = () => {
  const { token, username } = useSelector((state: RootState) => state.auth.UserData);
  const dispatch = useDispatch();


  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Ref for the dropdown container
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    setIsDropdownOpen(false); 
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo/Brand Name */}
          <div className="flex items-center">
            <a href="/" className="text-xl font-bold text-gray-800">
              Swayatt
            </a>
          </div>

          {/* Navigation Links */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            <a href="/dashboard" className="text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
              Dashboard
            </a>
            <a href="/orders" className="text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
              Orders
            </a>
          </div>

          {/* User Profile or Login/Register Buttons */}
          <div className="flex items-center">
            {token ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center text-gray-800 hover:text-blue-500 focus:outline-none"
                >
                  <span className="mr-2">{username}</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </a>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-4">
                <a
                  href="/login"
                  className="text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Register
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;