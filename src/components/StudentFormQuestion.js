import { React, Component } from 'react';

class StudentFormQuestion extends Component {
    render() {
        let choices = [];
        for (let i = 0; i < this.props.question.data()['choices'].length; i++) {
            let choice = this.props.question.data()['choices'][i];
            choices.push(<div key={'c' + i}>
                <div>
                    <input type="radio" value={choice} name={this.props.question.id} onChange={e => this.props.onOptionChange(i)} /> {choice}
                </div>
            </div>);
        }
        return (
            <div>
                <h3 className='question'>Question: {this.props.question.data()['question']}</h3>
                {choices}
            </div>
        );
    }
}

export default StudentFormQuestion