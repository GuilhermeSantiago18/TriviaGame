import React, { Component } from 'react';
import { MD5 } from 'crypto-js';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import '../css/Header.css';

class Header extends Component {
  state = {
    redirect: false,
  };

  handleClick = () => {
    this.setState({
      redirect: true,
    });
  };

  getGravatar = () => {
    const { usuario } = this.props;
    const emailGravatar = MD5(usuario.email).toString();
    const url = `https://www.gravatar.com/avatar/${emailGravatar}`;
    return url;
  };

  render() {
    const { usuario, points } = this.props;
    const { redirect } = this.state;
    return (
      <Container className="header">
        <Container className="user">
          <img
            alt="img"
            src={ this.getGravatar() }
            data-testid="header-profile-picture"
          />
          <h3 data-testid="header-player-name">{usuario.name}</h3>
        </Container>

        <p data-testid="header-score" className="score">{`Score: ${points} pts`}</p>
        <Button
          variant="dark"
          data-testid="btn-go-home"
          type="button"
          onClick={ this.handleClick }
        >
          HOME PAGE
        </Button>
        {redirect && Redirect('/')}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  usuario: state.player.user,
  correctCount: state.player.countCorrect,
  points: state.player.score,
});

Header.propTypes = {
  usuario: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
}.isRequired;

export default connect(mapStateToProps)(Header);
