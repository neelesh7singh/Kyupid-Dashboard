import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppDataProvider from './context/AppData';

ReactDOM.render(
  <AppDataProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AppDataProvider>,
  document.getElementById('root')
);
