import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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

  verifyBtn = () => {
    const { email, name } = this.state;
    const minLength = 1;
    const verifyNameAndEmail = name.length && email.length >= minLength;
    this.setState({ isBtnDisabled: !verifyNameAndEmail });
  };

  handleBtnConfig = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  //   handleBtn = (e) => {
  //     e.preventDefault();
  //     const { dispatch, history } = this.props;
  //     const { email } = this.state;
  //     dispatch(getEmail(email));
  //     dispatch(fetchWithThunk());
  //     history.push('/carteira');
  //   };

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
            type="submit"
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

Login.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.func,
}.isRequired;

export default connect()(Login);
