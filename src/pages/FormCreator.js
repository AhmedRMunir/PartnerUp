import { React, Component } from 'react';
import NavBar from '../components/NavBar';
import './Courses.css';
import NewQuestionTemplate from '../components/NewQuestionTemplate';
import { collection, addDoc, doc, query, where, getDocs } from "firebase/firestore";

class FormCreator extends Component {
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
      addDoc(collection(this.props.db, 'questions'), {
        index: i,
        question: this.state.questions[i],
        choices: this.state.choices[i],
        class: doc(this.props.db, 'classes', this.state.classID)
      });
    }
    let baseURL = window.location.origin;
    let formURL = baseURL + "/student-form?classID=" + this.state.classID;
    this.setState({
      link: formURL
    });
  }

  async runAlgorithm() {
    let questionsQuery = query(collection(this.props.db, "preferences"), where("class", "==", doc(this.props.db, 'classes', this.state.classID)));
    const querySnapshot = await getDocs(questionsQuery);
    console.log(querySnapshot.docs);
    console.log(querySnapshot.docs);
    let prefs = [];
    querySnapshot.forEach(doc => {
      prefs.push(doc);
    });
    prefs.sort((q1, q2) => {
      return q1.data()['studentName'] < q2.data()['studentName'] ? -1 : 1;
    });
    let pairings = []
    for (let i = 0; i < prefs.length - 1; i += 2) {
      pairings.push(prefs[i].data()['studentName'] + ' and ' + prefs[i + 1].data()['studentName'])
    }
    if (prefs.length % 2 !== 0) {
      pairings.push("On their own: " + prefs[prefs.length - 1].data()['studentName']);
    }
    this.setState({
        pairings: pairings
    });
  }

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
          <div><button className="runAlgo" onClick={() => this.runAlgorithm()}>Run Algorithm</button></div>
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