/*
import './StudentForm.css';
import { React } from 'react';
import { collection, query, doc, where, getDocs, addDoc } from "firebase/firestore";

class StudentForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    radioButtonSelected(question, choice, answers, setAnswers) {
        this.state.setAnswers({
            ...this.state.answers, ...{[question]: choice}
        });
    }
    
    submit(answers, inputFields) {
        let answers_arr = [];
        for(let i = 0; i < inputFields.length; i++) {
            answers_arr.push(answers[inputFields[i].question]);
        }
    
        let submitObj = {answers: answers_arr, class: doc(this.props.db, 'classes', class_id)}
    
        addDoc(collection(this.props.db, "preferences"), submitObj);
        console.log(submitObj);
        
    }
    
    async getQuestions(setInputFields) {
        const questions_query = query(collection(this.props.db, "questions"), where("class", "==", doc(this.props.db, 'classes', this.state.class_id)));
    
        const querySnapshot = await getDocs(questions_query);
        querySnapshot.forEach((doc) => {
            
        });
        setInputFields(inputFields);
    }

    render() {
        return (
            <div className="StudentForm">
            <header className="StudentForm-header">
            <div>{this.state.inputFields.map((item, idx) => <div className="arrange-vertically">{item.question}{item.choices.map(choice => <label className="arrange-vertically"><input type="radio" name={item.question + idx} value={choice} onChange={event => this.radioButtonSelected(item.question, choice, this.state.answers, this.state.setAnswers)} />{choice}</label>)}</div>)}</div>
                <button onClick={() => this.getQuestions(this.state.setInputFields)}>Fetch Data</button>
                <button onClick={() => this.submit(this.state.answers, this.state.inputFields)}>Submit</button>
            
                </header>
            </div>
        );
    }
}

export default StudentForm;
*/