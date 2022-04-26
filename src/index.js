import React from 'react';
import ReactDOM from 'react-dom/client';
import NavBar from './components/NavBar';
import LaunchPage from './pages/LaunchPage';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NavBar />
  </React.StrictMode>
);