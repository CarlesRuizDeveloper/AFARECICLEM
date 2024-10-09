import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setIsLoading(true);

    try {
      await axios.post('http://localhost:8000/api/forgot-password', { email });
      setMessage('Enllaç de restabliment de contrasenya enviat al teu correu electrònic.');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      setError(error.response?.data?.errors?.email ? error.response.data.errors.email[0] : error.response?.data?.message || 'Error en el procés.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl mb-4">Recupera la teva contrasenya</h2>

        {message && (
          <div className="mb-4 text-green-500">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 text-red-500">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block mb-2">Correu electrònic</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white p-2 rounded" 
          disabled={isLoading}
        >
          {isLoading ? 'Enviant...' : 'Envia enllaç de restabliment'}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
