import React from 'react';
import Header from '../components/Header';
import { getQuestions } from '../redux/actions';

class Game extends React.Component {
  state = {
    questions: [],
    loading: true,
  };

  async componentDidMount() {
    const questions = await getQuestions();
    this.setState({ questions, loading: false });
  }

  createQuestions = () => {
    const { questions } = this.state;
    const { results } = questions;
    const correctAnswer = {
      answer: results[0].correct_answer,
      isCorrect: true,
      id: null,
    };
    const incorrectAnswers = (results[0].incorrect_answers).map((answer, index) => (
      {
        answer,
        isCorrect: false,
        id: index,
      }
    ));
    const { question } = results[0];
    const { category } = results[0];
    const answersArray = [correctAnswer, ...incorrectAnswers];

    const arrayRdn = [];
    const answersArrayRdn = [];
    for (let index1 = 0; index1 < answersArray.length; index1 += 1) {
      const abc = Math.random() * (answersArray.length);
      const abcd = Math.floor(abc);
      if (arrayRdn.every((item) => (item !== abcd))) {
        arrayRdn.push(abcd);
        answersArrayRdn.push(answersArray[abcd]);
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

  render() {
    const { loading } = this.state;
    if (loading) { return <h1>Loading...</h1>; }
    const asking = this.createQuestions();
    const { answersArray, question, category } = asking;
    // Acessar o jogo com um token inválido leva a um logout
    // excluindo o token do localStorage e redirecionando a página para a tela de login
    return (
      <div>
        <Header />
        <h2 data-testid="question-category">
          { category }
        </h2>
        <p data-testid="question-text">
          { question }
        </p>

        <form data-testid="answer-options">
          { answersArray.map((answer) => {
            switch (answer.isCorrect) {
            case (true):
              return (
                <button
                  key={ answer.id }
                  type="button"
                  data-testid="correct-answer"
                >
                  { answer.answer }
                </button>
              );
            default:
              return (
                <button
                  key={ answer.id }
                  type="button"
                  data-testid={ `wrong-answer-${answer.id}` }
                >
                  { answer.answer }
                </button>
              );
            }
          }) }
        </form>
      </div>
    );
  }
}

export default Game;
