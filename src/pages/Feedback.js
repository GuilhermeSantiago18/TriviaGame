import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  rankingClick = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { answers } = this.props;
    const maxAnswer = 3;
    console.log(answers);
    return (
      <main>
        <Header />
        {answers >= maxAnswer ? (
          <p data-testid="feedback-text">Well Done!</p>
        ) : (
          <p data-testid="feedback-text">Could be better...</p>
        )}
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.handleClick }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.rankingClick }
        >
          Ranking
        </button>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  answers: state.Playgame.countCorrect,
});

Feedback.propTypes = {
  answer: PropTypes.number,
}.idRequired;

export default connect(mapStateToProps)(Feedback);
