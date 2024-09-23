import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="w-full bg-darkRed text-white fixed bottom-0 left-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-center items-center">
                <div className="text-sm flex items-center space-x-2">
                    <span>© Desenvolupat per Carles Ruiz Montejo 2024</span>
                    <Link
                        to="https://www.linkedin.com/in/carles-ruiz-montejo/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-blue-500 transition">
                        <div className="bg-white">
                            <FaLinkedin className="h-6 w-6 text-blue-500" />
                        </div>
                    </Link>
                </div>
            </div>
        </footer>


    );
};

export default Footer;
