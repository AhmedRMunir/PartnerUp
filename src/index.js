import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Course1 from './pages/Course1';
import Course2 from './pages/Course2';
import Course3 from './pages/Course3';
import InstructorHome from './pages/InstructorHome';
import LaunchPage from './pages/LaunchPage';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import StudentForm from './pages/StudentForm';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LaunchPage />} />
        <Route path='/instructor-home' element={<InstructorHome />} />
        <Route path='/course1' element={<Course1 />} />
        <Route path='/course2' element={<Course2 />} />
        <Route path='/course3' element={<Course3 />} />
        <Route path='/student-form' element={<StudentForm />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);