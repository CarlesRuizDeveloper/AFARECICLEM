// ChatPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PlayIcon } from '@heroicons/react/24/solid';
import axios from 'axios';

const ChatPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { chat_id, llibre, user1, user2 } = location.state || {};
  const [authUser, setAuthUser] = useState(null);
  const [otherUser, setOtherUser] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);
  const pollingInterval = useRef(null);
  const inactivityTimeout = useRef(null);

  // Función para iniciar el polling
  const startPolling = () => {
    stopPolling(); // Limpiar cualquier intervalo de polling existente antes de crear uno nuevo
    pollingInterval.current = setInterval(async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/chats/${chat_id}/messages`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        setChatMessages(response.data);
        resetInactivityTimeout(); // Reiniciar el tiempo de inactividad al recibir nuevos mensajes
      } catch (error) {
        console.error('Error al obtener los mensajes del chat:', error.response ? error.response.data : error.message);
      }
    }, 5000); // Polling cada 5 segundos
  };

  // Función para detener el polling
  const stopPolling = () => {
    if (pollingInterval.current) {
      clearInterval(pollingInterval.current);
    }
  };

  // Configuración del timeout para detectar inactividad
  const resetInactivityTimeout = () => {
    if (inactivityTimeout.current) {
      clearTimeout(inactivityTimeout.current);
    }
    inactivityTimeout.current = setTimeout(() => {
      console.log('Inactividad detectada, redirigiendo a la página principal');
      navigate('/'); // Redirigir a la página principal después de 2 minutos sin actividad
    }, 120000); // 120000 ms = 2 minutos
  };

  // Cargar el usuario autenticado y determinar el otro usuario en el chat
  useEffect(() => {
    const fetchAuthUser = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:8000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAuthUser(response.data);

        // Determinar quién es el otro usuario en el chat
        if (response.data.id === user1.id) {
          setOtherUser(user2);
        } else {
          setOtherUser(user1);
        }
      } catch (error) {
        console.error('Error al obtener el usuario autenticado:', error);
      }
    };

    if (!chat_id || !user1 || !user2 || !llibre) {
      console.error('Faltan datos esenciales para mostrar el chat');
      navigate('/chats');
    } else {
      fetchAuthUser();
      startPolling(); // Empezar el polling al cargar el chat
      resetInactivityTimeout(); // Configurar la detección de inactividad
    }

    return () => {
      stopPolling(); // Detener el polling al salir de la página
      clearTimeout(inactivityTimeout.current); // Limpiar el timeout de inactividad
    };
  }, [chat_id, user1, user2, llibre, navigate]);

  // Manejar el envío de mensajes
  const handleSendMessage = async () => {
    if (message.trim() !== '' && authUser) {
      try {
        const response = await axios.post(
          'http://localhost:8000/api/message/send-message',
          {
            chat_id: chat_id,
            sender_id: authUser.id,
            message: message,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
          }
        );

        setChatMessages([...chatMessages, response.data]);
        setMessage('');
        scrollToBottom();
      } catch (error) {
        console.error('Error al enviar el mensaje:', error.response ? error.response.data : error.message);
      }
    }
  };

  // Manejar el evento de presionar Enter para enviar un mensaje
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Hacer scroll al final del chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  if (!llibre || !authUser || !otherUser) {
    return <div>No s'han trobat les dades del llibre, usuari o chat.</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Encabezado del chat: sin margen en pantallas pequeñas y un poco de margen en pantallas grandes */}
      <div className="fixed left-0 w-full z-10 flex justify-center top-[64px] lg:top-[100px]">
        <div className="bg-gray-700 text-white shadow-lg max-w-2xl w-full p-7 rounded-t-lg flex flex-col items-center">
          <p className="text-center">
            <strong> {llibre.titol} </strong><br />
            <strong> {llibre.curs}</strong>
          </p>
          <div className="flex justify-between w-full mt-2">
            <p className="self-start">{otherUser.name}</p>
            <p className="self-end text-green-300">{authUser.name}</p>
          </div>
        </div>
      </div>

      {/* Mensajes del chat usando DaisyUI para las burbujas */}
      <div className="bg-gray-300 flex flex-col max-w-2xl mx-auto w-full overflow-y-auto p-4 mt-[150px] lg:mt-[180px] mb-[140px] flex-grow">
        {chatMessages.map((msg, index) => (
          <div key={index} className={`chat ${msg.sender_id === authUser.id ? 'chat-end' : 'chat-start'}`}>
            <div
              className={`chat-bubble ${
                msg.sender_id === authUser.id ? 'bg-green-700 text-white' : 'bg-gray-500 text-white'
              }`}
            >
              {msg.message}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input para enviar mensajes, pegado al final del contenedor */}
      <div className="fixed bottom-16 left-0 w-full lg:bottom-[70px]">
        <div className="max-w-2xl mx-auto bg-gray-300 shadow-lg rounded-b-lg p-4 flex items-center space-x-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escriu el teu missatge..."
            className="input input-bordered w-full"
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} // Enviar mensaje con Enter
          />
          <button
            onClick={handleSendMessage}
            className="btn bg-green-500 hover:bg-green-600 text-white p-1 rounded-full flex items-center justify-center w-12 h-12"
          >
            <PlayIcon className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
