import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/register', {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation
      });

      navigate('/login');
    } catch (error) {
      // Almacenar todos los errores en un objeto
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: 'Error en el registre. Intenta de nou.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="mt-10 bg-gradient-to-b from-darkRed to-softRed text-white p-6 rounded-md shadow-md w-80">
        <h2 className="text-2xl mb-4">Registre</h2>

        {/* Mostrar errores generales */}
        {errors.general && (
          <div className="mb-4 text-black font-bold">
            {errors.general}
          </div>
        )}

        {/* Mostrar errores específicos por campo */}
        <div className="mt-8 mb-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 bg-mediumRed text-gray-300 placeholder-gray-300 focus:border-none rounded"
            placeholder="Nom d'usuari"
            required
          />
          {errors.name && (
            <p className="text-yellow-300 text-xs mt-1">{errors.name[0]}</p>
          )}
        </div>

        <div className="mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 bg-mediumRed text-gray-300 placeholder-gray-300 focus:border-none rounded"
            placeholder="Correu electrònic"
            required
          />
          {errors.email && (
            <p className="text-yellow-300 text-xs mt-1">{errors.email[0]}</p>
          )}
        </div>

        <div className="mb-4 relative">
          <input
            type={passwordVisible ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 bg-mediumRed text-gray-300 placeholder-gray-300 focus:border-none rounded pr-10"
            placeholder="Clau d'accés"
            required
          />
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute right-2 top-2 text-gray-200 focus:outline-none"
          >
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
          {errors.password && (
            <p className="text-yellow-300 text-xs mt-1">{errors.password[0]}</p>
          )}
        </div>

        <div className="mb-4 relative">
          <input
            type={confirmPasswordVisible ? 'text' : 'password'}
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            className="w-full p-2 bg-mediumRed text-gray-300 placeholder-gray-300 focus:border-none rounded pr-10"
            placeholder="Confirma la clau d'accés"
            required
          />
          <button
            type="button"
            onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            className="absolute right-2 top-2 text-gray-200 focus:outline-none"
          >
            {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
          </button>
          {errors.password_confirmation && (
            <p className="text-yellow-300 text-xs mt-1">{errors.password_confirmation[0]}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-white text-darkRed font-bold p-2 rounded hover:bg-gray-700 hover:text-white transition"
          disabled={isLoading}
        >
          {isLoading ? "Registrant..." : "Registra't"}
        </button>
      </form>
    </div>
  );
};

export default Register;
