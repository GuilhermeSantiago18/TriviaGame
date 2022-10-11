import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Timer from '../components/Timer';
import { getQuestions } from '../redux/actions';

class Game extends React.Component {
  state = {
    questions: [],
    loading: true,
    viewNextButton: false,
    numberOfQuestion: 0,
  };

  async componentDidMount() {
    const { history } = this.props;
    const questions = await getQuestions();
    if (questions.response_code !== 0) {
      history.push('/');
      localStorage.removeItem('token');
    }
    this.setState({ questions, loading: false });
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
    return {
      answersArray: answersArrayRdn,
      question,
      category,
    };
  };

  Aaa = () => {
    this.setState({ viewNextButton: true });
  };

  Bbb = () => {
    const { numberOfQuestion } = this.state;
    this.setState({
      viewNextButton: false,
      numberOfQuestion: (numberOfQuestion + 1),
    });
  };

  render() {
    const { loading, viewNextButton } = this.state;
    if (loading) {
      return <h1>Loading...</h1>;
    }
    const asking = this.createQuestions();
    const { answersArray, question, category } = asking;
    return (
      <div>
        <Timer />
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
                  onClick={ this.Aaa }
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
                  onClick={ this.Aaa }
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
                onClick={ this.Bbb }
              >
                Próxima Pergunta
              </button>
            )
          }
        </form>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.string,
}.isRequired;

export default Game;
