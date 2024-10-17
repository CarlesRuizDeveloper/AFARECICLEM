import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PlayIcon, XMarkIcon } from '@heroicons/react/24/solid'; 
import { FaSpinner } from 'react-icons/fa'; 
import axios from 'axios';

const ChatPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { chat_id, llibre, user1, user2 } = location.state || {};
  const [authUser, setAuthUser] = useState(null);
  const [otherUser, setOtherUser] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const pollingInterval = useRef(null);
  const inactivityTimeout = useRef(null);

  const startPolling = () => {
    stopPolling(); 
    pollingInterval.current = setInterval(async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/chats/${chat_id}/messages`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        });
        setChatMessages(response.data);
        setLoading(false); 
        resetInactivityTimeout(); 
      } catch (error) {
        console.error('Error al obtener los mensajes del chat:', error.response ? error.response.data : error.message);
      }
    }, 5000); 
  };

  const stopPolling = () => {
    if (pollingInterval.current) {
      clearInterval(pollingInterval.current);
    }
  };

  const resetInactivityTimeout = () => {
    if (inactivityTimeout.current) {
      clearTimeout(inactivityTimeout.current);
    }
    inactivityTimeout.current = setTimeout(() => {
      console.log('Inactividad detectada, redirigiendo a la página principal');
      navigate('/'); 
    }, 120000); 
  };

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
      startPolling(); 
      resetInactivityTimeout(); 
    }

    return () => {
      stopPolling(); 
      clearTimeout(inactivityTimeout.current); 
    };
  }, [chat_id, user1, user2, llibre, navigate]);

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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

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
      <div className="fixed left-0 w-full z-10 flex justify-center top-[64px] lg:top-[100px]">
        <div className="bg-gray-700 text-white shadow-lg max-w-2xl w-full p-7 rounded-t-lg flex flex-col items-center relative">
          <button
            className="absolute right-4 top-4 flex items-center text-white hover:text-red-400 transition"
            onClick={() => navigate('/chats')}
          >
            <XMarkIcon className=" bg-red-700 rounded-md mt-4 h-5 w-5" />
          </button>
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
      <div className="bg-gray-300 flex flex-col max-w-2xl mx-auto w-full overflow-y-auto p-4 mt-[190px] lg:mt-[220px] mb-[140px] flex-grow">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <FaSpinner className="animate-spin h-8 w-8 text-red-700" />
          </div>
        ) : (
          chatMessages.map((msg, index) => (
            <div key={index} className={`chat ${msg.sender_id === authUser.id ? 'chat-end' : 'chat-start'}`}>
              <div
                className={`chat-bubble ${
                  msg.sender_id === authUser.id ? 'bg-green-700 text-white' : 'bg-gray-500 text-white'
                }`}
              >
                {msg.message}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="fixed bottom-16 left-0 w-full lg:bottom-[70px]">
        <div className="max-w-2xl mx-auto bg-gray-300 shadow-lg rounded-b-lg p-4 flex items-center space-x-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escriu el teu missatge..."
            className="input input-bordered w-full"
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
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
