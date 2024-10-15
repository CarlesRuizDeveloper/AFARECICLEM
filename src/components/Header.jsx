import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserIcon, ChatBubbleBottomCenterIcon } from '@heroicons/react/24/solid'; 
import axios from 'axios';
import logo from '../assets/logo.jpg'; 

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const isLoggedIn = !!localStorage.getItem('authToken');  

  const handleUserIconClick = () => {
    if (isLoggedIn) {
      setMenuOpen(!menuOpen);
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setMenuOpen(false);
    navigate('/login');
  };

  // Fetch unread messages count
  useEffect(() => {
    if (isLoggedIn) {
      const fetchUnreadMessages = async () => {
        try {
          const token = localStorage.getItem('authToken');
          if (token) {
            const response = await axios.get('http://localhost:8000/api/chats/count', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setUnreadMessagesCount(response.data.count);
          }
        } catch (error) {
          console.error('Error al obtener los mensajes no leídos:', error.response ? error.response.data : error.message);
        }
      };

      fetchUnreadMessages();
    }
  }, [isLoggedIn]);

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
    <header className="w-full bg-darkRed text-black fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 mt-5">
          <div className="flex items-center text-lg sm:text-xl font-bold">
            <Link to="/">
              <img src={logo} alt="AFARECICLEM Logo" className="h-16 w-auto sm:h-16 mb-6 " />
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {/* Chat Icon - Only show if logged in */}
            {isLoggedIn && (
              <div className="relative">
                <button
                  onClick={() => navigate('/chats')}
                  className="flex items-center py-1 px-2 sm:py-2 sm:px-4 text-white text-sm sm:text-base"
                >
                  <ChatBubbleBottomCenterIcon className="h-8 w-8 text-white hover:text-black" />
                  {unreadMessagesCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                      {unreadMessagesCount > 9 ? '+9' : unreadMessagesCount}
                    </span>
                  )}
                </button>
              </div>
            )}
            
            {/* User Icon */}
            <div className="relative">
              <button
                onClick={handleUserIconClick}
                className="flex items-center py-1 px-2 sm:py-2 sm:px-4 text-white text-sm sm:text-base"
              >
                <UserIcon className="h-8 w-8 text-white hover:text-black" />
              </button>
              
              {menuOpen && isLoggedIn && (
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
      </div>
    </header>
  );
};

export default Header;
