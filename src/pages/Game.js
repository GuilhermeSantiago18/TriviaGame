import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Timer from '../components/Timer';
import Header from '../components/Header';
import { getQuestions } from '../redux/actions';

class Game extends React.Component {
  state = {
    questions: [],
    loading: true,
    btnActive: false,
    viewNextButton: false,
    numberOfQuestion: 0,
    asking: {
      answersArray: [],
      question: '',
      category: '',
    },
  };

  async componentDidMount() {
    const { history } = this.props;
    const questions = await getQuestions();
    if (questions.response_code !== 0) {
      history.push('/');
      localStorage.removeItem('token');
    }
    this.setState({
      questions,
      loading: false,
    }, () => this.createQuestions());
  }

  createQuestions = () => {
    const { questions, numberOfQuestion } = this.state;
    const { results } = questions;
    const correctAnswer = {
      answer: results[numberOfQuestion].correct_answer,
      isCorrect: true,
      id: null,
    };
    const incorrectAnswers = results[numberOfQuestion].incorrect_answers.map(
      (answer, index) => ({
        answer,
        isCorrect: false,
        id: index,
      }),
    );
    const { question } = results[numberOfQuestion];
    const { category } = results[numberOfQuestion];
    const answersArray = [correctAnswer, ...incorrectAnswers];

    const arrayRdn = [];
    const answersArrayRdn = [];
    for (let index1 = 0; index1 < answersArray.length; index1 += 1) {
      const aleatoryNumber = Math.random() * answersArray.length;
      const aleatoryNumbInt = Math.floor(aleatoryNumber);
      if (arrayRdn.every((item) => item !== aleatoryNumbInt)) {
        arrayRdn.push(aleatoryNumbInt);
        answersArrayRdn.push(answersArray[aleatoryNumbInt]);
      } else {
        index1 -= 1;
      }
    }
    const asking = {
      answersArray: answersArrayRdn,
      question,
      category,
    };
    this.setState({ asking });
  };

  answerEvent = () => {
    this.setState({
      viewNextButton: true,
      btnActive: true,
    });
  };

  nextEvent = () => {
    const { numberOfQuestion } = this.state;
    this.setState({
      viewNextButton: false,
      numberOfQuestion: (numberOfQuestion + 1),
    }, () => this.createQuestions());
  };

  render() {
    const { loading, viewNextButton, btnActive, asking } = this.state;
    const { contador } = this.props;
    const { answersArray, question, category } = asking;
    if (loading) { return <h1>Loading...</h1>; }
    return (
      <div>
        <Header />
        <h2 data-testid="question-category">{category}</h2>
        <p data-testid="question-text">{question}</p>
        <form data-testid="answer-options">
          {answersArray.map((answer) => {
            switch (answer.isCorrect) {
            case true:
              return (
                <button
                  key={ answer.id }
                  type="button"
                  data-testid="correct-answer"
                  onClick={ this.answerEvent }
                  disabled={ contador === 0 }
                  style={ {
                    border: btnActive ? '3px solid rgb(6, 240, 15)' : '' } }
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
                  onClick={ this.answerEvent }
                  disabled={ contador === 0 }
                  style={ {
                    border: btnActive ? '3px solid red' : '' } }
                >
                  {answer.answer}
                </button>
              );
            }
          })}
          {
            (viewNextButton) && (
              <button
                type="button"
                data-testid="btn-next"
                onClick={ this.nextEvent }
              >
                Próxima Pergunta
              </button>
            )
          }
        </form>
        <Timer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  contador: state.Playgame.counter,
});

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect(mapStateToProps)(Game);
