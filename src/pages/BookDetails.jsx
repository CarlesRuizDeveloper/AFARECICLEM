import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookDetail = () => {
  const { id } = useParams();
  const [llibre, setLlibre] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLlibre = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/llibredetext/${id}`);
        setLlibre(response.data);
      } catch (error) {
        console.error('Error al obtener los detalles del libro:', error);
      }
    };

    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const userResponse = await axios.get('http://localhost:8000/api/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(userResponse.data);
        }
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
      }
    };

    fetchLlibre();
    fetchUser();
  }, [id]);

  const handleSolicitar = async () => {
    const token = localStorage.getItem('authToken');
    const userId = user?.id || null;  // ID del usuario autenticado
  
    if (!token || !userId) {
      navigate('/login');
      return;
    }
  
    try {
      const response = await axios.post(
        'http://localhost:8000/api/chat/create',
        {
          user_2_id: llibre.user.id,  // Usuario propietario del libro
          llibre_id: llibre.id        // ID del libro
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Si el chat se crea correctamente, redirigir al chat
      navigate('/chat', { state: { llibre, user, chat_id: response.data.id } });
    } catch (error) {
      console.error('Error al crear el chat:', error.response ? error.response.data : error.message);
    }
  };
  
  
  
  

  if (!llibre) {
    return <div>Carregant...</div>;
  }

  return (
    <div className="max-w-screen-xl mx-auto p-4 mt-56 flex flex-col items-center justify-center text-center">
      <h1 className="text-2xl font-bold mb-4">{llibre.titol}</h1>
      <p><strong>Categoria:</strong> {llibre.category.name}</p>
      <p><strong>Curs:</strong> {llibre.curs}</p>
      <p><strong>Editorial:</strong> {llibre.editorial}</p>
      <p><strong>Observacions:</strong> {llibre.observacions}</p>

      <button 
        onClick={handleSolicitar} 
        className="bg-darkRed text-white px-4 py-2 mt-4 rounded"
      >
        Sol·licitar
      </button>
    </div>
  );
};

export default BookDetail;