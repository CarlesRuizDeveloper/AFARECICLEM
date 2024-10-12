import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; 
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'; 

const ChatPage = () => {
  const location = useLocation();
  const { llibre, user } = location.state || {};
  
  // Mensajes de prueba iniciales
  const initialMessages = [
    { user: 'Propietari', text: 'Hola! Vols informació sobre el llibre?' },
    { user: 'Tú', text: 'Sí, m’interessa saber més del curs.' }
  ];

  // Estado para los mensajes
  const [chatMessages, setChatMessages] = useState(initialMessages);
  const [message, setMessage] = useState('');

  // Función per enviar el missatge
  const handleSendMessage = () => {
    if (message.trim() !== '') {
      setChatMessages([...chatMessages, { user: 'Tú', text: message }]);
      setMessage('');
    }
  };

  if (!llibre || !user) {
    return <div>No s'han trobat les dades del llibre o usuari.</div>;
  }

  return (
    <div className="flex flex-col justify-between h-screen bg-gray-100 mt-24">
      <div className="bg-white shadow-md rounded-md p-8 w-full max-w-2xl mx-auto">
        {/* Encabezado de la conversa */}
        <div className="bg-darkRed text-white p-4 rounded-md mb-8">
          <h1 className="text-2xl font-bold">Conversació</h1>
          <p>
            <strong>Propietari:</strong> {llibre.user.name} <br />
            <strong>Títol:</strong> {llibre.titol} <br />
            <strong>Curs:</strong> {llibre.curs}
          </p>
        </div>

        {/* Missatges del xat */}
        <div className="flex flex-col space-y-4 mb-8">
          {chatMessages.map((msg, index) => (
            <div key={index} className={`chat ${msg.user === 'Tú' ? 'chat-end' : 'chat-start'}`}>
              <div className="chat-bubble">{msg.text}</div>
            </div>
          ))}
        </div>

  
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escriu el teu missatge..."
            className="input input-bordered w-full"
          />
          <button
            onClick={handleSendMessage}
            className="btn btn-primary p-2 rounded-full flex items-center justify-center"
          >
            <PaperAirplaneIcon className="h-6 w-6 text-white transform rotate-90" /> 
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
