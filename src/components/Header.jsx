import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import { UserIcon } from '@heroicons/react/24/solid'; 
import logo from '../assets/logo.jpg'; 

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth(); 
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const handleUserIconClick = () => {
    if (user) {
      setMenuOpen(!menuOpen);
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header className="w-full bg-white text-black fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 mt-5">
          <div className="flex items-center text-lg sm:text-xl font-bold">
            <Link to="/">
              <img src={logo} alt="AFARECICLEM Logo" className="h-16 w-auto sm:h-20 " />
            </Link>
          </div>
          <div className="relative">
            <button onClick={handleUserIconClick}
            className="flex items-center py-1 px-2 sm:py-2 sm:px-4 text-white text-sm sm:text-base"
            >
              <UserIcon className="h-8 w-8 text-darkRed hover:text-softRed" />
              
            </button>
            
            {menuOpen && (
              <div
                ref={menuRef} 
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20"
              >
                <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  El meu perfil
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Tancar sessió
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
