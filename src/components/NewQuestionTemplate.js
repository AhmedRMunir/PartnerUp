import React from 'react';

// A NewQuestionTemplate is a component that can render and receive input data for a new preference question and its choices
// You can pass onChangeQuestion, onChangeChoice, onAddChoice, and onRemoveChoice handlers to its props on instantiation

class NewQuestionTemplate extends React.Component {
    render() {
        // Make array of choice input components
        let choices = [];
        for (let i = 0; i < this.props.numChoices; i++) {
            choices.push(<div key={'c' + i}>
                <label>
                    Choice #{i + 1}:
                    <input className="choiceLabel" type="text" onChange={e => this.props.onChangeChoice(i, e.target.value)} />
                </label>
            </div>);
        }
        // Design interface for with one question input field and multiple choice input fields
        return (
            <div>
                <h1 className='question'>Question #{this.props.numQuestions}</h1>
                <form>
                    <div>
                        <label>
                            Question:
                            <input className='questionLabel' type="text" name="q1" onChange={e => this.props.onChangeQuestion(e.target.value)} />
                        </label>
                    </div>
                    {choices}
                </form>
                <button className='addChoice' onClick={() => this.props.onAddChoice()}>Add Choice</button>
                <button className='removeChoice' onClick={() => this.props.onRemoveChoice()}>Remove Choice</button>
            </div>
        )
    }
}

export default NewQuestionTemplate