import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; 
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth(); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true); 

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.token);
        navigate('/'); 
      } else {
        setError(data.errors?.email ? data.errors.email[0] : data.message || 'Error en les credencials');
      }
    } catch (error) {
      console.error('Error en el login:', error);
      setError('Error en el servidor. Torna-ho a intentar més tard.');
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl mb-4">Inicia sessió</h2>

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
        <div className="mb-4">
          <label className="block mb-2">Contrasenya</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white p-2 rounded" 
          disabled={isLoading} 
        >
          {isLoading ? 'Iniciant sessió...' : 'Inicia sessió'}
        </button>

        <div className="mt-4 flex justify-between">
          <Link to="/forgot-password" className="text-blue-500">He oblidat la contrasenya</Link>
          <Link to="/register" className="text-blue-500">Registra't</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
