import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  
import { FaBook, FaSpinner } from 'react-icons/fa';
import { AdjustmentsVerticalIcon } from '@heroicons/react/24/solid'; 
import { getColorByCourse } from '../utils/colors';

const Home = () => {
  const [llibres, setLlibres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('tot');
  const [selectedCourse, setSelectedCourse] = useState('tots');
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

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    setSelectedCourse('tots'); 
  };

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  const handleBookClick = (id) => {
    console.log('Navegando a los detalles del libro');
    navigate(`/llibre/${id}`);
  };

  const cursos = [
    'tots',
    '1r Prim',
    '2n Prim',
    '3r Prim',
    '4t Prim',
    '5è Prim',
    '6è Prim',
    '1r ESO',
    '2n ESO',
    '3r ESO',
    '4t ESO',
    '1r Batx',
    '2n Batx'
  ];

  const courseMapping = {
    'tots': 'tots',
    '1r Prim': '1r Primària',
    '2n Prim': '2n Primària',
    '3r Prim': '3r Primària',
    '4t Prim': '4t Primària',
    '5è Prim': '5è Primària',
    '6è Prim': '6è Primària',
    '1r ESO': '1r ESO',
    '2n ESO': '2n ESO',
    '3r ESO': '3r ESO',
    '4t ESO': '4t ESO',
    '1r Batx': '1r Batxillerat',
    '2n Batx': '2n Batxillerat'
  };

  const categoryMapping = {
    'llibres': 1,
    'lectura': 2,
    'roba': 3
  };

  return (
    <div className="p-4 mb-24">
      <div className="max-w-screen-xl mx-auto">
        <div className="bg-gray-700 p-2 flex items-center space-x-2 sm:space-x-4 mt-20 mb-0">
          <AdjustmentsVerticalIcon className="h-6 w-6 text-white" />
          <button
            onClick={() => handleFilterClick('tot')}
            className={`px-3 sm:px-4 py-1 sm:py-2 rounded-lg font-semibold transition text-sm sm:text-base ${
              selectedFilter === 'tot' ? 'bg-darkRed text-white' : 'bg-gray-700 text-gray-200'
            }`}
          >
            Tot
          </button>
          <button
            onClick={() => handleFilterClick('llibres')}
            className={`px-3 sm:px-4 py-1 sm:py-2 rounded-lg font-semibold transition text-sm sm:text-base ${
              selectedFilter === 'llibres' ? 'bg-darkRed text-white' : 'bg-gray-700 text-gray-200'
            }`}
          >
            Llibres de text
          </button>
          <button
            onClick={() => handleFilterClick('roba')}
            className={`px-3 sm:px-4 py-1 sm:py-2 rounded-lg font-semibold transition text-sm sm:text-base ${
              selectedFilter === 'roba' ? 'bg-darkRed text-white' : 'bg-gray-700 text-gray-200'
            }`}
          >
            Roba
          </button>
          <button
            onClick={() => handleFilterClick('lectura')}
            className={`px-3 sm:px-4 py-1 sm:py-2 rounded-lg font-semibold transition text-sm sm:text-base ${
              selectedFilter === 'lectura' ? 'bg-darkRed text-white' : 'bg-gray-700 text-gray-200'
            }`}
          >
            Llibres de lectura
          </button>
        </div>

        {selectedFilter === 'llibres' && (
          <div className="flex flex-wrap items-center justify-center space-x-2 mb-6 bg-gray-700 p-4 ">
            {cursos.map((course) => (
              <button
                key={course}
                onClick={() => handleCourseClick(course)}
                className={`px-3 sm:px-4 py-1 rounded-lg font-semibold transition text-sm sm:text-base ${
                  selectedCourse === course ? 'bg-darkRed text-white' : 'bg-gray-700 text-white'
                }`}
              >
                {course}
              </button>
            ))}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <FaSpinner className="animate-spin text-darkRed h-10 w-10" />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {llibres
              .filter((llibre) => {
                if (selectedFilter === 'tot') {
                  return true;
                }
                const categoryId = categoryMapping[selectedFilter];
                if (llibre.category_id !== categoryId) return false;
                if (selectedCourse !== 'tots') {
                  return llibre.curs === courseMapping[selectedCourse];
                }

                return true;
              })
              .map((llibre) => {
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
