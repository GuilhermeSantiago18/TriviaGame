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
    const { usuario, correctCount } = this.props;
    console.log(correctCount);
    return (
      <div>
        <img alt="img" src={ this.getGravatar() } data-testid="header-profile-picture" />
        <h3 data-testid="header-player-name">
          {usuario.name}
        </h3>
        <p data-testid="header-score">{correctCount}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  usuario: state.Playgame.user,
  correctCount: state.Playgame.countCorrect,
});

Header.propTypes = {
  usuario: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
}.isRequired;

export default connect(mapStateToProps)(Header);
