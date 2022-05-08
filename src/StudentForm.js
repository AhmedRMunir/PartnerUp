import logo from './logo.svg';
import './App.css';
import {useLocation} from "react-router-dom";
import React from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { collection, query, doc, where, getDocs, addDoc, initializeFirestore, database } from "firebase/firestore";
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

let class_id;

function StudentForm() {
  
  const [inputFields, setInputFields] = useState([])
  const [answers, setAnswers] = useState([]);
  const search = useLocation().search;
  class_id = new URLSearchParams(search).get('class_id');
  console.log(class_id);
  
  return (
    <div className="StudentForm">
      <header className="StudentForm-header">
        <div>{inputFields.map((item, idx) => <div className="arrange-vertically">{item.question}{item.choices.map(choice => <label className="arrange-vertically"><input type="radio" name={item.question + idx} value={choice} onChange={event => radioButtonSelected(item.question, choice, answers, setAnswers)} />{choice}</label>)}</div>)}</div>
        <button onClick={() => getQuestions(setInputFields)}>Fetch Data</button>
        <button onClick={() => submit(answers, inputFields)}>Submit</button>
        
      </header>
    </div>
  );
}

function radioButtonSelected(question, choice, answers, setAnswers) {
    setAnswers({
        ...answers, ...{[question]: choice}
    });
}

async function submit(answers, inputFields) {
    let answers_arr = [];
    for(let i = 0; i < inputFields.length; i++) {
        answers_arr.push(answers[inputFields[i].question]);
    }

    let submitObj = {answers: answers_arr, class: doc(db, 'classes', class_id)}

    await addDoc(collection(db, "preferences"), submitObj);
    console.log(submitObj);
    
}

async function getQuestions(setInputFields) {
  const q = query(collection(db, "questions"), where("class", "==", doc(db, 'classes', class_id)));

  const querySnapshot = await getDocs(q);
  let inputFields = [];
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
    const question = doc.data().question;
    const choices = doc.data().choices;
    inputFields.push({question: question, choices: choices})
  });
  console.log(inputFields);
  setInputFields(inputFields);
}

export default StudentForm;
