import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation: passwordConfirmation
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errors?.email ? data.errors.email[0] : data.message || 'Error en el registre');
      }

      navigate('/login');
    } catch (error) {
      setError(error.message || 'Error en el servidor. Torna-ho a intentar més tard.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
<div className="flex justify-center items-center h-screen">
<form onSubmit={handleSubmit} className=" mt-10 bg-gradient-to-b from-darkRed to-softRed text-white p-6 rounded-md shadow-md w-80">
        <h2 className="text-2xl mb-4">Registre</h2>

        {error && (
          <div className=" mb-4 text-black font-bold">
            {error}
          </div>
        )}

        <div className="mt-8 mb-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 bg-mediumRed text-gray-300 placeholder-gray-400 focus:border-none rounded"
            placeholder="Nom d'usuari"
            required
          />
        </div>

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
            className="w-full p-2 bg-mediumRed text-gray-300 placeholder-gray-400 focus:border-none rounded"
            placeholder="Clau d'accés"
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            className="w-full p-2 bg-mediumRed text-gray-300 placeholder-gray-400 focus:border-none rounded"
            placeholder="Confirma la clau d'accés"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-white text-darkRed font-bold p-2 rounded hover:bg-green-600 hover:text-white transition"
          disabled={isLoading}
        >
          {isLoading ? "Registrant..." : "Registra't"}
        </button>
      </form>
    </div>
  );
};

export default Register;
