import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getQuestions, correctAnswerAct, getPoints } from '../redux/actions';

class Game extends React.Component {
  state = {
    counter: 30,
    stopTimer: false,
    totalPoints: 0,
    questions: [],
    id: 0,
    loading: true,
    btnActive: false,
    viewNextButton: false,
    numberOfQuestion: 0,
    countCorrect: 0,
    asking: {
      answersArray: [],
      question: '',
      category: '',
      difficulty: '',
    },
  };

  async componentDidMount() {
    const { history } = this.props;
    const questions = await getQuestions();
    if (questions.response_code !== 0) {
      history.push('/');
      localStorage.removeItem('token');
    }
    this.setState(
      {
        questions,
        loading: false,
      },
      () => this.downTimer(),
    );
  }

  downTimer = () => {
    this.createQuestions();
    const num = 1000;
    const interval = setInterval(() => {
      this.setState(
        (prevState) => ({
          counter: prevState.counter - 1,
        }),
        () => {
          const { counter, stopTimer } = this.state;
          if (counter === 0 || stopTimer) {
            clearInterval(interval);
          }
        },
      );
    }, num);
  };

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

  answerEventCorrect = ({ target }) => {
    const { name } = target;
    const { dispatch } = this.props;
    const { countCorrect, id } = this.state;
    const ten = 10;
    const three = 3;
    let pontos = 0;
    this.setState(
      {
        viewNextButton: true,
        btnActive: true,
        countCorrect: countCorrect + 1,
        id: id + 1,
        stopTimer: true,
      },
      this.dispatchFunc,
    );
    if (name === 'correct') {
      const { questions, counter } = this.state;
      if (questions.results[id].difficulty === 'easy') pontos += ten + counter * 1;
      if (questions.results[id].difficulty === 'medium') pontos += ten + counter * 2;
      if (questions.results[id].difficulty === 'hard') pontos += ten + counter * three;
    } else {
      pontos += 0;
    }
    this.setState(
      (prevState) => ({
        totalPoints: prevState.totalPoints + pontos,
      }),
      () => {
        const { totalPoints } = this.state;
        dispatch(getPoints(totalPoints));
      },
    );
  };

  dispatchFunc = () => {
    const { countCorrect } = this.state;
    const { dispatch } = this.props;
    dispatch(correctAnswerAct(countCorrect));
  };

  answerEvent = () => {
    this.setState({
      viewNextButton: true,
      btnActive: true,
      stopTimer: true,
    });
  };

  nextEvent = () => {
    const { numberOfQuestion } = this.state;
    const { history } = this.props;
    const numberOfQuestionMax = 4;
    if (numberOfQuestion < numberOfQuestionMax) {
      this.setState(
        {
          viewNextButton: false,
          numberOfQuestion: numberOfQuestion + 1,
          counter: 30,
          stopTimer: false,
        },
        () => this.createQuestions(),
      );
      this.downTimer();
    } else {
      history.push('/feedback');
    }
  };

  render() {
    const { loading, viewNextButton, btnActive, asking,
      counter, totalPoints } = this.state;
    const { answersArray, question, category } = asking;
    if (loading) {
      return <h1>Loading...</h1>;
    }
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
                  name="correct"
                  data-testid="correct-answer"
                  onClick={ this.answerEventCorrect }
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
                  onClick={ this.answerEvent }
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
              onClick={ this.nextEvent }
            >
              Próxima Pergunta
            </button>
          )}
        </form>
        {counter}
        <p>{totalPoints}</p>
      </div>
    );
  }
}

Game.propTypes = { history: PropTypes.string }.isRequired;

const mapStateToProps = (state) => ({ contador: state.player.counter });

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect(mapStateToProps)(Game);
