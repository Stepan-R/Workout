import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter as Router } from 'react-router-dom';
import { WorkoutsContextProvider } from './context/WokroutContext';
import { AuthContextProvider } from './context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <Router>
      <WorkoutsContextProvider>
        <App />
      </WorkoutsContextProvider>
    </Router>
  </AuthContextProvider>
);
