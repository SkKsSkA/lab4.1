import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/style.css';
import AuthPage from './pages/AuthPage.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthPage />
  </React.StrictMode>
);
