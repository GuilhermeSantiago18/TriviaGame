import React from 'react';
import PropTypes from 'prop-types';

class Question extends React.Component {
  render() {
    const { category, question, answersArray, viewNextButton,
      btnActive, answerEventCorrect, answerEvent, nextEvent,
      counter } = this.props;
    return (
      <div>
        <h2 data-testid="question-category">{category}</h2>
        <p data-testid="question-text">{question}</p>
        <form data-testid="answer-options">
          {(answersArray.length > 0) && answersArray.map((answer) => {
            switch (answer.isCorrect) {
            case true:
              return (
                <button
                  key={ answer.id }
                  type="button"
                  name="correct"
                  data-testid="correct-answer"
                  onClick={ answerEventCorrect }
                  disabled={ counter === 0 }
                  style={ {
                    border: btnActive ? '3px solid rgb(6, 240, 15)' : '',
                  } }
                >
                  {answer.answer}
                </button>
              );
            default:
              return (
                <button
                  key={ answer.id }
                  type="button"
                  data-testid={ `wrong-answer-${answer.id}` }
                  onClick={ answerEvent }
                  disabled={ counter === 0 }
                  style={ {
                    border: btnActive ? '3px solid red' : '',
                  } }
                >
                  {answer.answer}
                </button>
              );
            }
          })}
          {viewNextButton && (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ nextEvent }
            >
              Próxima Pergunta
            </button>
          )}
        </form>
      </div>
    );
  }
}

Question.propTypes = {
  category: PropTypes.string,
  question: PropTypes.string,
  answersArray: PropTypes.array,
  viewNextButton: PropTypes.bool,
  btnActive: PropTypes.bool,
  answerEventCorrect: PropTypes.func,
  answerEvent: PropTypes.func,
  nextEvent: PropTypes.func,
  counter: PropTypes.number,
}.isRequired;

export default Question;
