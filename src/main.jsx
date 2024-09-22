import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Asegúrate de que Tailwind está siendo importado
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
