import { React, Component } from 'react';
import { collection, query, doc, where, getDocs, addDoc } from "firebase/firestore";
import StudentFormQuestion from '../components/StudentFormQuestion';
import './StudentForm.css';

// A StudentForm is a component that renders a preference form for a class (based on the URL parameter classID) and receives responses, 
// which are uploaded to the backend upon submission

// The backend from which to retrieve the form data and to which to upload student responses can be specified via the db prop

class StudentForm extends Component {
    // Instantiates a student form and retrieves questions for URL-specified class from backend
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
    
    // Retrieves questions from backend and sets state with form data
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

    // Handles event of user changing their name in the form
    onChangeName(name) {
        this.setState({
            studentName: name
        });
    }

    // Handles event of user selecting an option for a question in the form
    handleOptionChange(questionNum, optionNum) {
        let newChoices = this.state.choices.slice();
        newChoices[questionNum] = this.state.questions[questionNum].data()['choices'][optionNum];
        this.setState({
            choices: newChoices
        });
    }

    // Handles submission of form (uploads responses to this.props.db backend)
    submit() {
        addDoc(collection(this.props.db, 'preferences'), {
            answers: this.state.choices,
            class: doc(this.props.db, 'classes', this.state.classID),
            studentName: this.state.studentName
        });
    }

    // Renders the preference form for the URL-specified class
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

export default StudentForm;