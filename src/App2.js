import './App2.css';
import React from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs, initializeFirestore } from "firebase/firestore";
import { useState } from "react";

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

function App2() {
  
  const [firebaseData, updateData] = useState([]);
  //getPreferences(updateData);
  return (
    <div className="App">
      <header className="App-header">
        <div>{firebaseData.map(item => <div> {item} </div>)}</div>

        <button onClick={() => getPreferences(updateData)}>Fetch Data</button>
        
      </header>
    </div>
  );
}

async function getPreferences(updateData) {
  const q = query(collection(db, "preferences"));

  const querySnapshot = await getDocs(q);
  let data = [];
  querySnapshot.forEach((doc) => {
    data.push(JSON.stringify(doc.data()));
  });
  updateData(data);
}

export default App2;
