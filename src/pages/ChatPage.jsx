import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom'; 
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'; 

const ChatPage = () => {
  const location = useLocation();
  const { llibre, user } = location.state || {};
  
  // Referencia al contenedor de mensajes
  const messagesEndRef = useRef(null);

  // Mensajes de prueba iniciales
  const initialMessages = [
    { user: 'Propietari', text: 'Hola! Vols informació sobre el llibre?' },
    { user: 'Tú', text: 'Sí, m’interessa saber més del curs.' }
  ];

  // Estado para los mensajes
  const [chatMessages, setChatMessages] = useState(initialMessages);
  const [message, setMessage] = useState('');

  // Función para enviar el mensaje
  const handleSendMessage = () => {
    if (message.trim() !== '') {
      setChatMessages([...chatMessages, { user: 'Tú', text: message }]);
      setMessage('');
    }
  };

  // Función para hacer scroll hasta el final del chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Efecto para hacer scroll cuando se añaden nuevos mensajes
  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  if (!llibre || !user) {
    return <div>No s'han trobat les dades del llibre o usuari.</div>;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Encabezado fijo limitado en ancho */}
      <div className="fixed top-[64px] left-0 w-full z-10 flex justify-center"> {/* Ajuste con top para header */}
        <div className=" bg-darkRed text-white shadow-lg max-w-2xl w-full p-7 rounded-b-lg flex flex-col items-center">
          <p className="text-center">
            <strong>{llibre.titol} </strong> <br />
            <strong>{llibre.curs}</strong> 
          </p>
          <div className="flex justify-between w-full mt-2">
            <p className="self-start">{llibre.user.name}</p>
            <p className="self-end">{user?.name}</p>
          </div>
        </div>
      </div>

      {/* Contenedor de mensajes ajustado */}
      <div className="flex flex-col flex-1 max-w-2xl mx-auto w-full overflow-y-auto p-4 mb-36 pt-[200px]"> {/* pt-[200px] para ajustar el margen superior */}
  {chatMessages.map((msg, index) => (
    <div key={index} className={`chat ${msg.user === 'Tú' ? 'chat-end' : 'chat-start'}`}>
      <div
        className={`chat-bubble ${msg.user === 'Tú' ? 'bg-green-700 text-white' : 'bg-darkRed text-white'}`}  // Cambiar colores según el remitente
      >
        {msg.text}
      </div>
    </div>
  ))}
        <div ref={messagesEndRef} /> {/* Referencia para el auto-scroll */}
      </div>

      {/* Input fijo */}
      <div className="fixed bottom-16 left-0 w-full bg-white shadow-lg p-4"> {/* Asegurar que no se solape con el footer */}
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
