import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { PlayIcon } from '@heroicons/react/24/solid';
import axios from 'axios';

const ChatPage = () => {
  const location = useLocation();
  const { llibre, user, chat_id } = location.state || {}; // Verificamos que se obtienen correctamente chat_id, llibre y user
  const messagesEndRef = useRef(null);

  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState('');

  // Obtener los mensajes del chat al cargar la página
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/chats/${chat_id}/messages`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        setChatMessages(response.data); // Guardamos los mensajes recibidos en el estado
      } catch (error) {
        console.error('Error al obtener los mensajes del chat:', error.response ? error.response.data : error.message);
      }
    };

    if (chat_id) {
      fetchMessages();
    }
  }, [chat_id]);

  // Manejar el envío de mensajes
  const handleSendMessage = async () => {
    if (message.trim() !== '') {
      try {
        const response = await axios.post(
          'http://localhost:8000/api/message/send-message',
          {
            chat_id: chat_id, // Usamos el chat_id correcto aquí
            sender_id: user.id,
            message: message,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
          }
        );

        setChatMessages([...chatMessages, response.data]); // Agregar el nuevo mensaje al estado
        setMessage(''); // Limpiar el campo de texto
        scrollToBottom(); // Hacer scroll al último mensaje
      } catch (error) {
        console.error('Error al enviar el mensaje:', error.response ? error.response.data : error.message);
      }
    }
  };

  // Hacer scroll al final del chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  if (!llibre || !user || !chat_id) {
    return <div>No s'han trobat les dades del llibre, usuari o chat.</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="fixed top-[64px] left-0 w-full z-10 flex justify-center">
        <div className="bg-darkRed text-white shadow-lg max-w-2xl w-full p-7 rounded-b-lg flex flex-col items-center">
          <p className="text-center">
            <strong> {llibre.titol} </strong><br />
            <strong> {llibre.curs}</strong>
          </p>
          <div className="flex justify-between w-full mt-2">
            <p className="self-start">{llibre.user.name}</p>
            <p className="self-end text-green-300">{user?.name}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 max-w-2xl mx-auto w-full overflow-y-auto p-4 mb-36" style={{ paddingTop: '200px' }}>
        {chatMessages.map((msg, index) => (
          <div key={index} className={`chat ${msg.sender_id === user.id ? 'chat-end' : 'chat-start'}`}>
            <div className={`chat-bubble ${msg.sender_id === user.id ? 'bg-green-300 text-black' : 'bg-gray-300 text-black'}`}>
              {msg.message}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="fixed bottom-16 left-0 w-full bg-white shadow-lg p-4">
        <div className="max-w-2xl mx-auto flex items-center space-x-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escriu el teu missatge..."
            className="input input-bordered w-full"
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
