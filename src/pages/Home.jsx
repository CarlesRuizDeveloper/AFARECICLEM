import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBook } from 'react-icons/fa';
import { getColorByCourse } from '../utils/colors';
import axios from 'axios';

const Home = () => {
  const [llibres, setLlibres] = useState([]);

  useEffect(() => {
    const fetchLlibres = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/llibredetext');
        setLlibres(response.data);
      } catch (error) {
        console.error('Error al obtenir els llibres:', error);
      }
    };

    fetchLlibres();
  }, []);

  return (
    <div className="p-4 mb-24">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-2xl font-bold mt-40">AFARECICLEM</h1>
        <p className="mb-4">Llista de llibres de text:</p>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {llibres.map((llibre) => {
            const { bgColor, textColor, iconColor } = getColorByCourse(llibre.curs);
            return (
              <Link
                to={`/llibre/${llibre.id}`}
                key={llibre.id}
                className="border border-gray-300 p-4 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105 bg-white"
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
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
