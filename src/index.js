import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Course from './pages/Course';
import InstructorHome from './pages/InstructorHome';
import LaunchPage from './pages/LaunchPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LaunchPage />} />
        <Route path='/instructor-home' element={<InstructorHome />} />
        <Route path='/course1' element={<Course classID={'NVLtMSE99jAXbooSTP6n'} />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);