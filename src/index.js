import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LaunchPage from './pages/LaunchPage';
import InstructorHome from './pages/InstructorHome';
import FormCreator from './pages/FormCreator';
import StudentForm from './pages/StudentForm';

import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCN1E0yCkUbk2v8kQH3PGPpvAqICZkrHOc",
  authDomain: "partnerup-8fb5c.firebaseapp.com",
  projectId: "partnerup-8fb5c",
  storageBucket: "partnerup-8fb5c.appspot.com",
  messagingSenderId: "757257283487",
  appId: "1:757257283487:web:0c6e02b206ade0c9033faa"
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseapp);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LaunchPage db={db} />} />
        <Route path='/instructor-home' element={<InstructorHome db={db} />} />
        <Route path='/course1' element={<FormCreator classID={'NVLtMSE99jAXbooSTP6n'} db={db} />} />
        <Route path='/student-form' element={<StudentForm db={db} />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);