import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBook, FaSpinner } from 'react-icons/fa'; 
import { getColorByCourse } from '../utils/colors';

const Home = () => {
  const [llibres, setLlibres] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLlibres = async () => {
      try {
        setIsLoading(true); 
        const response = await fetch('http://localhost:8000/api/llibredetext');
        const data = await response.json();
        setLlibres(data);
      } catch (error) {
        console.error('Error al obtenir els llibres:', error);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchLlibres();
  }, []);

  const handleBookClick = (id) => {
    console.log('Navegando a los detalles del libro');
    navigate(`/llibre/${id}`);
  };

  return (
    <div className="p-4 mb-24">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-2xl font-bold mt-40">AFARECICLEM</h1>
        <p className="mb-4">Llista de llibres de text:</p>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <FaSpinner className="animate-spin text-darkRed h-10 w-10" />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {llibres.map((llibre) => {
              const { bgColor, textColor, iconColor } = getColorByCourse(llibre.curs);
              return (
                <div
                  onClick={() => handleBookClick(llibre.id)}
                  key={llibre.id}
                  className="cursor-pointer border border-gray-300 p-4 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105 bg-white"
                >
                  <div
                    className={`flex items-center justify-center ${bgColor} ${textColor} text-center text-sm font-semibold rounded-full py-1 mb-3`}
                  >
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
        )}
      </div>
    </div>
  );
};

export default Home;
