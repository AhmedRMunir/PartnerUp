import { React, Component } from 'react';
import { collection, query, doc, where, getDocs, addDoc } from "firebase/firestore";
import StudentFormQuestion from '../components/StudentFormQuestion';
import './StudentForm.css';

class QuestionTemplate extends Component {

    constructor(props) {
        super(props);
        const queryParams = new URLSearchParams(window.location.search);
        const classID = queryParams.get('classID');
        this.state = {
            studentName: '',
            classID: classID,
            questions: [],
            choices: []
        };
        this.getQuestions();
    }
    
    async getQuestions() {
        let questionsQuery = query(collection(this.props.db, "questions"), where("class", "==", doc(this.props.db, 'classes', this.state.classID)));
        const querySnapshot = await getDocs(questionsQuery);
        querySnapshot.docs.sort((q1, q2) => {
            return q1.index - q2.index;
        });
        let choices = []
        querySnapshot.docs.forEach(doc => {
            choices.push('');
        });
        this.setState({
            questions: querySnapshot.docs,
            choices: choices
        });
    }

    onChangeName(name) {
        this.setState({
            studentName: name
        });
    }

    handleOptionChange(questionNum, optionNum) {
        let newChoices = this.state.choices.slice();
        newChoices[questionNum] = this.state.questions[questionNum].data()['choices'][optionNum];
        this.setState({
            choices: newChoices
        });
    }

    submit() {
        addDoc(collection(this.props.db, 'preferences'), {
            answers: this.state.choices,
            class: doc(this.props.db, 'classes', this.state.classID),
            studentName: this.state.studentName
        });
    }

    render() {
        let questions = []
        for (let i = 0; i < this.state.questions.length; i++) {
            let doc = this.state.questions[i];
            questions.push(<StudentFormQuestion key={doc.id} question={doc} onOptionChange={optionNum => this.handleOptionChange(i, optionNum)} />);
        }
        return (
            <div className="PrefForm">
                <div>
                    <h3>Name:</h3>
                    <input className='nameField' type="text" name="name" onChange={e => this.onChangeName(e.target.value)} />
                </div>
                {questions}
                <div><button className="submit" onClick={() => this.submit()}>Submit</button></div>
            </div>
        );
    }
}

export default QuestionTemplate;