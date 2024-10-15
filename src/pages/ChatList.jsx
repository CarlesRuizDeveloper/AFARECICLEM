// ChatList.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ChatList = () => {
  const [conversations, setConversations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const response = await axios.get('http://localhost:8000/api/chats', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setConversations(response.data);
        }
      } catch (error) {
        console.error('Error al obtener las conversaciones:', error.response ? error.response.data : error.message);
      }
    };

    fetchConversations();
  }, []);

  const handleChatClick = (conversation) => {
    const chatData = {
      chat_id: conversation.id,
      llibre: conversation.llibre,
      user1: conversation.user1,  // Usuario autenticado
      user2: conversation.user2,  // Otro usuario del chat
    };

    // Navegar a la página del chat con toda la información necesaria
    navigate('/chat', { state: chatData });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="w-full max-w-7xl bg-white p-6 border border-gray-200 shadow-lg sm:w-2/3 lg:w-1/2">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Converses</h2>
        {conversations.length === 0 ? (
          <p className="text-gray-500 text-center">No hi ha converses disponibles.</p>
        ) : (
          <ul className="space-y-4">
            {conversations.map((conversation) => (
              <li
                key={conversation.id}
                onClick={() => handleChatClick(conversation)}
                className="bg-gray-100 p-4 rounded-lg shadow-sm hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg text-gray-700">
                    Amb {conversation.user_1_id === conversation.user2.id ? conversation.user1.name : conversation.user2.name} - Llibre: {conversation.llibre.titol} ({conversation.llibre.curs})
                  </h3>
                  <span className="text-xs text-gray-500">
                    {conversation.messages && conversation.messages.length > 0
                      ? new Date(conversation.messages[conversation.messages.length - 1].created_at).toLocaleDateString()
                      : 'Sense missatges'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 truncate">
                  {conversation.messages && conversation.messages.length > 0
                    ? conversation.messages[conversation.messages.length - 1].message
                    : 'Cap missatge encara'}
                </p>
                <span className="text-xs text-gray-400">
                  Creat el: {new Date(conversation.created_at).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ChatList;
