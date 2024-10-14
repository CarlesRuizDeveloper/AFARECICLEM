import React, { useEffect, useState } from 'react';

const ChatList = () => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const mockData = [
      {
        id: 1,
        title: 'Chat con Juan',
        lastMessage: 'Nos vemos mañana a las 9am',
        createdAt: '2024-10-01T12:00:00Z',
        lastMessageAt: '2024-10-07T15:00:00Z',
      },
      {
        id: 2,
        title: 'Chat con María',
        lastMessage: 'Estoy revisando el proyecto.',
        createdAt: '2024-09-25T09:00:00Z',
        lastMessageAt: '2024-10-07T14:00:00Z',
      },
      {
        id: 3,
        title: 'Chat con Juan',
        lastMessage: 'Nos vemos mañana a las 9am',
        createdAt: '2024-10-01T12:00:00Z',
        lastMessageAt: '2024-10-07T15:00:00Z',
      },
      {
        id: 4,
        title: 'Chat con María',
        lastMessage: 'Estoy revisando el proyecto.',
        createdAt: '2024-09-25T09:00:00Z',
        lastMessageAt: '2024-10-07T14:00:00Z',
      },
      
    ];

    setConversations(mockData);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="w-full max-w-7xl bg-white p-6 border border-gray-200 shadow-lg sm:w-2/3 lg:w-1/2">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Conversaciones</h2>
        {conversations.length === 0 ? (
          <p className="text-gray-500 text-center">No hay conversaciones disponibles.</p>
        ) : (
          <ul className="space-y-4">
            {conversations.map((conversation) => (
              <li key={conversation.id} className="bg-gray-100 p-4 rounded-lg shadow-sm hover:bg-gray-200 transition-colors duration-200 cursor-pointer">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg text-gray-700">{conversation.title}</h3>
                  <span className="text-xs text-gray-500">
                    {new Date(conversation.lastMessageAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                <span className="text-xs text-gray-400">
                  Creado el: {new Date(conversation.createdAt).toLocaleDateString()}
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
