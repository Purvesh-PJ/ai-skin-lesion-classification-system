import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { BackendStatusProvider } from './features/system-health';
import AppRoutes from './routes';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <BackendStatusProvider>
          <AppRoutes />
        </BackendStatusProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
