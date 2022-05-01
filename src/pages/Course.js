import React from 'react';
import NavBar from '../components/NavBar';
import './Courses.css';
import Question from './Question';
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs, initializeFirestore, addDoc, doc, setDoc } from "firebase/firestore";
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

class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numQuestions: 1,
      numChoices: [2],
      questions: [""],
      choices: [["", ""]]
    };
  }

  handleAddQuestion() {
    if (this.state.numQuestions >= 10) {
      return;
    }
    let newNumQuestions = this.state.numQuestions + 1;
    let newNumChoices = this.state.numChoices.slice();
    let newQuestions = this.state.questions.slice();
    let newChoices = this.state.choices.slice();
    newNumChoices.push(2);
    newQuestions.push("");
    newChoices.push(["", ""]);
    this.setState({
      numQuestions: newNumQuestions,
      numChoices: newNumChoices,
      questions: newQuestions,
      choices: newChoices
    });
  }

  handleRemoveQuestion() {
    if (this.state.numQuestions <= 1) {
      return;
    }
    let newNumQuestions = this.state.numQuestions - 1;
    let newNumChoices = this.state.numChoices.slice();
    let newQuestions = this.state.questions.slice();
    let newChoices = this.state.choices.slice();
    newNumChoices.pop();
    newQuestions.pop();
    newChoices.pop();
    this.setState({
      numQuestions: newNumQuestions,
      numChoices: newNumChoices,
      questions: newQuestions,
      choices: newChoices
    });
  }

  handleAddChoice(i) {
    if (this.state.numChoices[i] >= 10) {
      return;
    }
    let newNumChoices = this.state.numChoices.slice();
    let newChoices = this.state.choices.slice();
    newNumChoices[i]++;
    newChoices[i].push("");
    this.setState({
      numChoices: newNumChoices,
      choices: newChoices
    });
  }

  handleRemoveChoice(i) {
    if (this.state.numChoices[i] <= 2) {
      return;
    }
    let newNumChoices = this.state.numChoices.slice();
    let newChoices = this.state.choices.slice();
    newNumChoices[i]--;
    newChoices[i].pop();
    this.setState({
      numChoices: newNumChoices,
      choices: newChoices
    });
  }

  handleChangeQuestion(i, value) {
    let newQuestions = this.state.questions.slice();
    newQuestions[i] = value;
    this.setState({
      questions: newQuestions
    });
  }

  handleChangeChoice(i, j, value) {
    let newChoices = this.state.choices.slice();
    newChoices[i][j] = value;
    this.setState({
      choices: newChoices
    });
  }

  submit() {
    for (let i = 0; i < this.state.questions.length; i++) {
      addDoc(collection(db, 'questions'), {
        question: this.state.questions[i],
        choices: this.state.choices[i],
        class: doc(db, 'classes', this.props.classID)
      });
    }
  }

  render() {
    let questions = []
    for (let i = 0; i < this.state.numQuestions; i++) {
      questions.push(<Question key={'q' + i}
                               numQuestions={i + 1} 
                               numChoices={this.state.numChoices[i]}
                               onAddChoice={() => this.handleAddChoice(i)}
                               onRemoveChoice={() => this.handleRemoveChoice(i)}
                               onChangeQuestion={(value) => this.handleChangeQuestion(i, value)}
                               onChangeChoice={(j, value) => this.handleChangeChoice(i, j, value)}/>);
    }
    return (
      <div>
          <NavBar/>
          {questions}
          <button className="addQuestion" onClick={() => this.handleAddQuestion()}>Add Question</button>
          <button className="removeQuestion" onClick={() => this.handleRemoveQuestion()}>Remove Question</button>
          <div><button className="submit" onClick={() => this.submit()}>Submit</button></div>
      </div>
    );
  }
}

export default Course