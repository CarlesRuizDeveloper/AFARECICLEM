import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    localStorage.removeItem('authToken');

    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password
      });

      if (response.status === 200) {
        localStorage.setItem('authToken', response.data.token);

        const redirectUrl = localStorage.getItem('redirectAfterLogin');
        if (redirectUrl) {
          localStorage.removeItem('redirectAfterLogin');
          navigate(redirectUrl);
        } else {
          navigate('/');
        }
      } else {
        setError('Credenciales incorrectas');
      }
    } catch (error) {
      setError('Error al iniciar sesión. Intenta nuevamente.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-gradient-to-b from-darkRed to-softRed text-white p-6 rounded-md shadow-md w-80">
        <h2 className="text-2xl mb-4">Inicia sessió</h2>

        {error && (
          <div className="mb-4 text-black">
            {error}
          </div>
        )}

        <div className="mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 bg-mediumRed text-gray-300 placeholder-gray-400 focus:border-none rounded"
            placeholder="Correu electrònic"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border bg-mediumRed border-gray-300 placeholder-gray-400 rounded"
            placeholder="Clau d'accés"
            required
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-white text-darkRed font-bold p-2 rounded hover:bg-green-600 hover:text-white transition" 
          disabled={isLoading}
        >
          {isLoading ? 'Iniciant sessió...' : 'Inicia sessió'}
        </button>

        <div className="mt-4 flex justify-between">
          <Link to="/forgot-password" className="text-white">He oblidat la contrasenya</Link>
        </div>
        <div className="mt-10">
          <span className="text-white font-bold">¿Encara no tens usuari? <br /></span>
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="w-full mt-4 bg-red-300 text-gray-200 p-2 rounded font-bold hover:bg-green-600 transition"
          >
            Registra't aquí!
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
