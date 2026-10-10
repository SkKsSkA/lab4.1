import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/style.css';
import DashboardPage from './pages/DashboardPage.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DashboardPage />
  </React.StrictMode>
);
