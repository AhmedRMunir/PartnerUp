import { React, Component } from 'react';
import NavBar from '../components/NavBar';
import './Courses.css';
import NewQuestionTemplate from '../components/NewQuestionTemplate';
import { collection, addDoc, doc, query, where, getDocs } from "firebase/firestore";
var Utils = require('./Utils');

// A FormCreator is a component that allows a user to input a series of questions and to configure options for those questions
// Once the user is done making the form, the data is uploaded to our app's backend so that students can answer the questions later

// Once responses have been submitted by students, the instructor can use a button on the page to run a matching algorithm and output
// its results on the page

// Can pass a database object as a prop in order to specify the location to upload the submitted form data and retrieve student responses

class FormCreator extends Component {
  // Instantiates a FormCreator with a random classID, 1 blank question, and 2 blank choices
  constructor(props) {
    super(props);
    let classID = Math.random().toString().substring(2,8);
    this.state = {
      classID: classID,
      numQuestions: 1,
      numChoices: [2],
      questions: [""],
      choices: [["", ""]],
      link: '',
      pairings: []
    };
  }

  // Handles the event of adding a question to the form
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

  // Handles the event of removing a question from the form
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

  // Handles the event of adding a choices to a question in the form
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

  // Handles the event of removing a choice from a question in the form
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

  // Handles the event of modifying a question in the form
  handleChangeQuestion(i, value) {
    let newQuestions = this.state.questions.slice();
    newQuestions[i] = value;
    this.setState({
      questions: newQuestions
    });
  }

  // Handles the event of modifying a choice for a question in the form
  handleChangeChoice(i, j, value) {
    let newChoices = this.state.choices.slice();
    newChoices[i][j] = value;
    this.setState({
      choices: newChoices
    });
  }

  // Handles the event of submitting the form and uploading its data to the backend (this.props.db)
  submit() {
    for (let i = 0; i < this.state.questions.length; i++) {
      addDoc(collection(this.props.db, 'questions'), {
        index: i,
        question: this.state.questions[i],
        choices: this.state.choices[i],
        class: doc(this.props.db, 'classes', this.state.classID)
      });
    }
    // let baseURL = window.location.origin;
    // let formURL = baseURL + "/student-form?classID=" + this.state.classID;
    // this.setState({
    //   link: formURL
    // });

    let formURL = Utils.generateFormURL(window.location.origin, this.state.classID);

    this.setState({
      link: formURL
    });
  }

  // Fetches the students' submitted preference data from the backend
  async fetchAndCleanStudents() {
    let querySnapshot = await getDocs(query(collection(this.props.db, "preferences"), where("class", "==", doc(this.props.db, 'classes', this.state.classID))));
    let prefs = [];
    querySnapshot.forEach(doc => {
      prefs.push(doc.data());
    });
    return prefs;
  }

  // Renders the question and choice templates, as well as the submit and run algorithm buttons
  render() {
    let questions = []
    for (let i = 0; i < this.state.numQuestions; i++) {
      questions.push(<NewQuestionTemplate key={'q' + i}
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
          <div><label>{this.state.link}</label></div>
          <div><button className="runAlgo" onClick={async () => {
            let pairings = Utils.runAlgorithm(await this.fetchAndCleanStudents());
            this.setState({pairings: pairings})
          }}>Run Algorithm</button></div>
          <div>
            {this.state.pairings.map(item =>
              <div key={'p' + item.index}><label>{item}</label></div>
            )}
          </div>
      </div>
    );
  }
}

export default FormCreator