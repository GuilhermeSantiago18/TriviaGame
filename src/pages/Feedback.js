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
    const { answers, points } = this.props;
    const maxAnswer = 3;
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
        <p data-testid="feedback-total-question">{answers}</p>
        <p data-testid="feedback-total-score">{points}</p>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  answers: state.player.assertions,
  points: state.player.score,
});

Feedback.propTypes = {
  answer: PropTypes.number,
}.idRequired;

export default connect(mapStateToProps)(Feedback);
