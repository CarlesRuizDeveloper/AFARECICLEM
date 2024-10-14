import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login'); 
    } else {
      fetch('http://localhost:8000/api/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then((response) => response.json())
        .then((data) => setUser(data))
        .catch(() => {
          navigate('/login');
        });
    }
  }, [navigate]);

  return (
    <div>
      {user ? <h1>Bienvenido, {user.name}</h1> : <p>Cargando...</p>}
    </div>
  );
};

export default Dashboard;
