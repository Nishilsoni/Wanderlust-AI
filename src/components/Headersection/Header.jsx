import React from 'react';
import { auth } from '../../Firebase/firebase'; // Ensure the path to your Firebase setup is correct
import { signOut } from 'firebase/auth'; 
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  // Handle Logout Functionality
  const handleLogout = async () => {
    try {
      await signOut(auth);  // Sign out the user
      navigate('/');        // Redirect to login or homepage after logging out
    } catch (error) {
      console.error('Error logging out:', error); // Handle potential errors
    }
  };

  return (
    <header className="bg-gray-800 text-white flex justify-between items-center p-4">
      {/* Left section with logo and Wanderlust AI */}
      <div className="flex items-center">
        {/* Logo (Replace 'src' with your logo path when you have it) */}
        <img src="/path-to-your-logo.png" alt="Logo" className="w-10 h-10 mr-2" />

        {/* Wanderlust AI text */}
        <h1 className="text-2xl font-bold">Wanderlust AI</h1>

        {/* Sidebar button (future functionality) */}
        <div className="ml-6 mt-2">
          <button className="bg-gray-700 p-2 rounded-lg hover:bg-gray-600">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Right section with Logout button */}
      <div>
        <button
          onClick={handleLogout}  // Attach the logout function here
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
