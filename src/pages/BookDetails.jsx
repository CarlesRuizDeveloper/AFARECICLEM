import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const BookDetail = () => {
  const { id } = useParams(); 
  const [llibre, setLlibre] = useState(null);

  useEffect(() => {
    const fetchLlibre = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/llibredetext/${id}`);
        const data = await response.json();
        setLlibre(data);
      } catch (error) {
        console.error('Error al obtenir els detalls del llibre:', error);
      }
    };

    fetchLlibre();
  }, [id]);

  if (!llibre) {
    return <div>Carregant...</div>;
  }

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{llibre.titol}</h1>
      <p><strong>Categoria:</strong> {llibre.category.name}</p>
      <p><strong>Curs:</strong> {llibre.curs}</p>
      <p><strong>Editorial:</strong> {llibre.editorial}</p>
      
      <p><strong>Observacions:</strong> {llibre.observacions}</p>
      <button 
        onClick={() => alert(`Contactar amb l'usuari: ${llibre.user.name}`)} 
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
      >
        Sol·licitar
      </button>
    </div>
  );
};

export default BookDetail;
