import React from 'react';
import PropTypes from 'prop-types';

const DATA_TEST = [
  { name: 'Aeiou', score: 5 },
  { name: 'Abc', score: 15 },
  { name: 'Xyz', score: 10 },
];

class Ranking extends React.Component {
  goHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const rankingFake = DATA_TEST;
    return (
      <main>
        <h2 data-testid="ranking-title">Ranking</h2>
        <nav>
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ this.goHome }
          >
            Página Inicial
          </button>
        </nav>
        { rankingFake.map((line, index) => (
          <section key={ index }>
            <p data-testid={ `player-name-${index}` }>
              { line.name }
            </p>
            <p data-testid={ `player-score-${index}` }>
              { line.score }
            </p>
            armazenar em localStorage
          </section>
        )) }
      </main>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.string,
}.isRequired;

export default Ranking;
