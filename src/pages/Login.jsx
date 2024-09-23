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
      <form onSubmit={handleSubmit} className="bg-gradient-to-b from-darkRed to-softRed text-white p-6 rounded-md shadow-md w-80">
        <h2 className="text-2xl mb-4">Inicia sessió</h2>

        {error && (
          <div className="mb-4 text-red-500">
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
          <Link to="/forgot-password" className="text-white ">He oblidat la contrasenya</Link>
        </div>
        <div className="mt-10">
          <span className="text-white font-bold">¿ Encara no tens usuari ? <br></br></span>
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
