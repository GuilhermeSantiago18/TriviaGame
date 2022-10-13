import React from 'react';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  goHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
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
        <br />
        <table>
          <thead>
            <tr>
              <th>SCORE</th>
              <th>NAME</th>
            </tr>
          </thead>
          <tbody>
            { ranking.map((line, index) => (
              <tr key={ index }>
                <td data-testid={ `player-score-${index}` }>
                  { line.score }
                </td>
                <td data-testid={ `player-name-${index}` }>
                  { line.name }
                </td>
              </tr>
            )) }
          </tbody>
        </table>
      </main>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.string,
}.isRequired;

export default Ranking;
