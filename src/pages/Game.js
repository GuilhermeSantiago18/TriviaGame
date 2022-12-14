import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import Header from '../components/Header';
import { getQuestions, correctAnswerAct, getPoints, getClear } from '../redux/actions';
import Question from '../components/Question';
import '../css/Game.css';

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

  // limpa score no estado global
  async componentDidMount() {
    const { history, dispatch } = this.props;
    dispatch(getClear());
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
    const { history, usuario, points } = this.props;
    const numberOfQuestionMax = 4;
    if (numberOfQuestion < numberOfQuestionMax) {
      this.setState(
        {
          viewNextButton: false,
          numberOfQuestion: numberOfQuestion + 1,
          counter: 30,
          stopTimer: false,
          btnActive: false,
        },
        () => this.createQuestions(),
      );
      this.downTimer();
    } else {
      const newData = {
        name: usuario.name,
        score: points,
      };
      const localRanking = JSON.parse(localStorage.getItem('ranking'));
      const rankingData = (localRanking !== null) ? localRanking : [];
      rankingData.push(newData);
      // rankingData.sort((a, b) => (a.name - b.name));
      rankingData.sort((a, b) => (Number(b.score) - Number(a.score)));
      localStorage.setItem('ranking', JSON.stringify(rankingData));
      history.push('/feedback');
    }
  };

  render() {
    const { loading, viewNextButton, btnActive, asking,
      counter } = this.state;
    const { answersArray, question, category } = asking;
    if (loading) {
      return <h1>Loading...</h1>;
    }
    return (
      <div>
        <Header />
        <Container className="tempo">{`TIMER: ${counter}`}</Container>

        <Question
          category={ category }
          question={ question }
          answersArray={ answersArray }
          viewNextButton={ viewNextButton }
          btnActive={ btnActive }
          answerEventCorrect={ this.answerEventCorrect }
          answerEvent={ this.answerEvent }
          nextEvent={ this.nextEvent }
          counter={ counter }
        />

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  contador: state.player.counter,
  usuario: state.player.user,
  points: state.player.score,
});

Game.propTypes = {
  history: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Game);
