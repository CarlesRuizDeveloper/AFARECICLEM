import React from 'react';
import { Link } from 'react-router-dom';
import { UserIcon } from '@heroicons/react/24/solid';  // Cambiamos la ruta para Heroicons v2
import logo from '../assets/logo.jpg';  // Asegúrate de que la imagen esté correctamente guardada

const Header = () => {
    return (
        <header className="w-full bg-white text-black fixed top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo alineado a la izquierda */}
                    <div className="text-lg sm:text-xl font-bold">
                        <Link to="/">
                            <img src={logo} alt="AFARECICLEM Logo" className="h-20 mt-16 sm:h-30" />
                        </Link>
                    </div>
                    <div>
                        <Link
                            to="/login"
                            className="flex items-center py-1 px-2 sm:py-2 sm:px-4 bg-white rounded transition text-blue-700 text-sm sm:text-base"
                        >
                            <UserIcon className="h-8 w-8 mt-16 sm:h-10 sm:w-10 " />
                            
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
