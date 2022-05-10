import React from 'react';

class NewQuestionTemplate extends React.Component {
    render() {
        let choices = [];
        for (let i = 0; i < this.props.numChoices; i++) {
            choices.push(<div key={'c' + i}>
                <label>
                    Choice #{i + 1}:
                    <input className="choiceLabel" type="text" onChange={e => this.props.onChangeChoice(i, e.target.value)} />
                </label>
            </div>);
        }
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