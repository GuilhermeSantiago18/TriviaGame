import React, { Component } from 'react';
import { MD5 } from 'crypto-js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  getGravatar = () => {
    const { usuario } = this.props;
    const emailGravatar = MD5(usuario.email).toString();
    const url = `https://www.gravatar.com/avatar/${emailGravatar}`;
    return url;
  };

  render() {
    const { usuario, points } = this.props;
    return (
      <div>
        <img
          alt="img"
          src={ this.getGravatar() }
          data-testid="header-profile-picture"
        />
        <h3 data-testid="header-player-name">{usuario.name}</h3>
        <p data-testid="header-score">{points}</p>
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ this.handleClick }
        >
          Go home
        </button>
      </div>
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
