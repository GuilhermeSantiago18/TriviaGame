import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Header from '../components/Header';
import '../css/Feedback.css';

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
        <Container className="retorno">
          {answers >= maxAnswer ? (
            <p data-testid="feedback-text" className="mensagem">Well Done!</p>
          ) : (
            <p data-testid="feedback-text" className="mensagem">Could be better...</p>
          )}
          <Button
            className="me-2"
            variant="dark"
            type="button"
            data-testid="btn-play-again"
            onClick={ this.handleClick }
          >
            Play Again
          </Button>
          <Button
            variant="dark"
            type="button"
            data-testid="btn-ranking"
            onClick={ this.rankingClick }
          >
            Ranking
          </Button>
          <Container className="resultado">
            <p data-testid="feedback-total-question">{`Correct Answers: ${answers}`}</p>
            <p data-testid="feedback-total-score">{`Total Score: ${points}`}</p>
          </Container>
        </Container>
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
