import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchCurrency,
  getUser,
} from '../redux/actions';

class Login extends Component {
  state = {
    email: '',
    name: '',
    isBtnDisabled: true,
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState(
      {
        [name]: value,
      },
      () => this.verifyBtn(),
    );
  };

  verifyBtn = async () => {
    const { email, name } = this.state;
    const minLength = 1;
    const verifyNameAndEmail = name.length && email.length >= minLength;
    this.setState({ isBtnDisabled: !verifyNameAndEmail });
  };

  handleBtnConfig = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  handleBtn = async () => {
    const { history, dispatch } = this.props;
    const { name, email } = this.state;
    await dispatch(getUser({ name, email }));
    await dispatch(fetchCurrency());
    const { tokenAPI } = this.props;
    const { Playgame: { api: { token } } } = tokenAPI;
    localStorage.setItem('token', token);
    history.push('/game');
  };

  render() {
    const { email, name, isBtnDisabled } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="email">
            Email:
            <input
              data-testid="input-gravatar-email"
              id="email"
              type="email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="name">
            Name:
            <input
              data-testid="input-player-name"
              id="name"
              type="text"
              name="name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="btn-play"
            type="button"
            name="btn"
            disabled={ isBtnDisabled }
            onClick={ this.handleBtn }
          >
            Play
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.handleBtnConfig }
          >
            Configurações
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tokenAPI: state,
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  tokenAPI: PropTypes.shape({
    token: PropTypes.string,
  }),
}.isRequired;

export default connect(mapStateToProps)(Login);
