import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { config } from './config/env';
import { initPlausible } from './services/analytics';

import './custom.scss';

// Initialize theme on app load
const initializeTheme = () => {
  const savedTheme = localStorage.getItem('aess-theme');
  const themeName = savedTheme || config.theme.defaultTheme || 'default';
  
  // Apply theme class to body immediately to prevent flash
  document.body.className = document.body.className
    .replace(/theme-\w+/g, '')
    .trim();
  document.body.classList.add(`theme-${themeName}`);
};

// Initialize theme before rendering
initializeTheme();

// Initialize analytics
initPlausible();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
