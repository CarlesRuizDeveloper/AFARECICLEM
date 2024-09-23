import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBook } from 'react-icons/fa';

const Home = () => {
  const [llibres, setLlibres] = useState([]);

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

  const getColorByCourse = (curs) => {
    switch (curs) {
      case '1r ESO':
        return { bgColor: 'bg-red-100', textColor: 'text-red-800', iconColor: 'text-red-500' };
      case '2n ESO':
        return { bgColor: 'bg-green-100', textColor: 'text-green-800', iconColor: 'text-green-500' };
      case '3r ESO':
        return { bgColor: 'bg-yellow-100', textColor: 'text-yellow-800', iconColor: 'text-yellow-500' };
      case '4t ESO':
        return { bgColor: 'bg-blue-100', textColor: 'text-blue-800', iconColor: 'text-blue-500' };
      case '1r Primària':
        return { bgColor: 'bg-pink-100', textColor: 'text-pink-800', iconColor: 'text-pink-500' };
      case '2n Primària':
        return { bgColor: 'bg-violet-100', textColor: 'text-violet-800', iconColor: 'text-violet-500' };
      case '3r Primària':
        return { bgColor: 'bg-sky-100', textColor: 'text-sky-800', iconColor: 'text-sky-500' };
      case '4t Primària':
        return { bgColor: 'bg-teal-100', textColor: 'text-teal-800', iconColor: 'text-teal-500' };
      case '5è Primària':
        return { bgColor: 'bg-indigo-100', textColor: 'text-indigo-800', iconColor: 'text-indigo-500' };
      case '6è Primària':
        return { bgColor: 'bg-lime-100', textColor: 'text-lime-800', iconColor: 'text-lime-500' };
      case '1r Batxillerat':
        return { bgColor: 'bg-cyan-100', textColor: 'text-cyan-800', iconColor: 'text-cyan-500' };
      case '2n Batxillerat':
        return { bgColor: 'bg-rose-100', textColor: 'text-rose-800', iconColor: 'text-rose-500' };

      default:
        return { bgColor: 'bg-gray-100', textColor: 'text-gray-800', iconColor: 'text-gray-500' };
    }
  };

  return (
    <div className="p-4 mb-24">
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
  );
};

export default Home;
