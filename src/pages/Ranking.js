import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import '../css/Rankings.css';
import Table from 'react-bootstrap/Table';

class Ranking extends React.Component {
  goHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    return (
      <main>
        <Container className="inicial">
          <nav>
            <Button
              variant="dark"
              type="button"
              data-testid="btn-go-home"
              onClick={ this.goHome }
            >
              HOME PAGE
            </Button>
          </nav>
        </Container>
        <h2 data-testid="ranking-title" className="titulo">Ranking</h2>
        <br />
        <Table striped bordered hover size="sm" variant="dark" className="tabela">
          <thead>
            <tr>
              <th>NAME</th>
              <th>SCORE</th>
            </tr>
          </thead>
          <tbody>
            { ranking.map((line, index) => (
              <tr key={ index }>
                <td data-testid={ `player-name-${index}` }>
                  { line.name }
                </td>
                <td data-testid={ `player-score-${index}` }>
                  { line.score }
                </td>
              </tr>
            )) }
          </tbody>
        </Table>
      </main>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.string,
}.isRequired;

export default Ranking;
