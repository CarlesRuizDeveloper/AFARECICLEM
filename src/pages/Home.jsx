import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBook } from 'react-icons/fa';
import { getColorByCourse } from '../utils/colors'; 

const Home = () => {
  const [llibres, setLlibres] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchLlibres = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/llibredetext');
        const data = await response.json();
        setLlibres(data);
      } catch (error) {
        console.error('Error al obtenir els llibres:', error);
      }
    };

    fetchLlibres();
  }, []);

  const handleBookClick = (id) => {
    const token = localStorage.getItem('authToken');  
    console.log('Token en localStorage:', token);  
  
    if (!token) {
      console.log('Usuario no logueado, redirigiendo al login');
      navigate('/login');
    } else {
      console.log('Usuario logueado, mostrando detalles del libro');
      navigate(`/llibre/${id}`);
    }
  };
  

  return (
    <div className="p-4 mb-24">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-2xl font-bold mt-40">AFARECICLEM</h1>
        <p className="mb-4">Llista de llibres de text:</p>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {llibres.map((llibre) => {
            const { bgColor, textColor, iconColor } = getColorByCourse(llibre.curs);
            return (
              <div
                onClick={() => handleBookClick(llibre.id)} 
                key={llibre.id}
                className="cursor-pointer border border-gray-300 p-4 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105 bg-white"
              >
                <div className={`flex items-center justify-center ${bgColor} ${textColor} text-center text-sm font-semibold rounded-full py-1 mb-3`}>
                  <FaBook className={`h-4 w-4 mr-2 ${iconColor}`} />
                  {llibre.curs}
                </div>

                <div className="flex items-center space-x-2 mb-2">
                  <h2 className="text-xl font-bold">{llibre.titol}</h2>
                </div>
                <p className="text-gray-700">
                  <strong>Editorial:</strong> {llibre.editorial}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
