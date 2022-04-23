import logo from './logo.svg';
import './App.css';
import React from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs, initializeFirestore } from "firebase/firestore";

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

function App() {
  getPreferences();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

async function getPreferences() {
  const q = query(collection(db, "preferences"));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
}

export default App;
