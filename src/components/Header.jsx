import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserIcon } from '@heroicons/react/24/solid'; 
import logo from '../assets/logo.jpg'; 

const Header = () => {
    const navigate = useNavigate(); 

    const handleUserIconClick = () => {
        const token = localStorage.getItem('authToken');  
        if (!token) {
            navigate('/login');
        } else {
            console.log("Usuario autenticado");
        }
    };

    return (
        <header className="w-full bg-white text-black fixed top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="text-lg sm:text-xl font-bold">
                        <Link to="/">
                            <img src={logo} alt="AFARECICLEM Logo" className="h-10 sm:h-12" />
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={handleUserIconClick} 
                            className="flex items-center py-1 px-2 sm:py-2 sm:px-4 bg-blue-500 hover:bg-blue-700 rounded transition text-white text-sm sm:text-base"
                        >
                            <UserIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
