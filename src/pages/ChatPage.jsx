import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

const ChatPage = () => {
    const location = useLocation();
    const { llibre, user } = location.state || {};

    const messagesEndRef = useRef(null);

    const initialMessages = [
        { user: 'Propietari', text: 'Hola! Vols informació sobre el llibre?' },
        { user: 'Tú', text: 'Sí, m’interessa saber més del curs.' }
    ];

    const [chatMessages, setChatMessages] = useState(initialMessages);
    const [message, setMessage] = useState('');

    const handleSendMessage = () => {
        if (message.trim() !== '') {
            setChatMessages([...chatMessages, { user: 'Tú', text: message }]);
            setMessage('');
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatMessages]);

    if (!llibre || !user) {
        return <div>No s'han trobat les dades del llibre o usuari.</div>;
    }

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="fixed top-[64px] left-0 w-full z-10 flex justify-center">
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
            <div className="flex flex-col flex-1 max-w-2xl mx-auto w-full overflow-y-auto p-4 mb-36 pt-[200px]">
                {chatMessages.map((msg, index) => (
                    <div key={index} className={`chat ${msg.user === 'Tú' ? 'chat-end' : 'chat-start'}`}>
                        <div
                            className={`chat-bubble ${msg.user === 'Tú' ? 'bg-green-700 text-white' : 'bg-darkRed text-white'}`}
                        >
                            {msg.text}
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
