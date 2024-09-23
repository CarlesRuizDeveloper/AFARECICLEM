import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const BookDetails = () => {
  const { id } = useParams(); // Obtener el ID del libro desde la URL
  const [llibre, setLlibre] = useState(null);

  useEffect(() => {
    // Función para obtener los detalles del libro desde la API
    const fetchLlibreDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/llibres/${id}`);
        const data = await response.json();
        setLlibre(data);
      } catch (error) {
        console.error('Error al obtener els detalls del llibre:', error);
      }
    };

    fetchLlibreDetails();
  }, [id]);

  if (!llibre) {
    return <p>Carregant...</p>; // Mostrar mientras se carga
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{llibre.titol}</h1>
      <p><strong>Curs:</strong> {llibre.curs}</p>
      <p><strong>Editorial:</strong> {llibre.editorial}</p>
      <p><strong>Observacions:</strong> {llibre.observacions || 'Cap observació disponible'}</p>
    </div>
  );
};

export default BookDetails;
