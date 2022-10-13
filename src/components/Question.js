import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import '../css/Questions.css';

class Question extends React.Component {
  render() {
    const { category, question, answersArray, viewNextButton,
      btnActive, answerEventCorrect, answerEvent, nextEvent,
      counter } = this.props;
    return (
      <div>
        <Container className="questions">
          <h2 data-testid="question-category">{category}</h2>
          <p data-testid="question-text">{question}</p>
          <Container className="answers">
            <form data-testid="answer-options">
              {(answersArray.length > 0) && answersArray.map((answer) => {
                switch (answer.isCorrect) {
                case true:
                  return (

                    <Button
                      className="mb-5 me-5"
                      key={ answer.id }
                      variant="dark"
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
                    </Button>
                  );
                default:
                  return (
                    <Button
                      className="mb-5 me-5"
                      key={ answer.id }
                      variant="dark"
                      type="button"
                      data-testid={ `wrong-answer-${answer.id}` }
                      onClick={ answerEvent }
                      disabled={ counter === 0 }
                      style={ {
                        border: btnActive ? '3px solid red' : '',
                      } }
                    >
                      {answer.answer}
                    </Button>
                  );
                }
              })}
            </form>
          </Container>
          {viewNextButton && (
            <Button
              type="button"
              data-testid="btn-next"
              onClick={ nextEvent }
            >
              Próxima Pergunta
            </Button>
          )}
        </Container>
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
