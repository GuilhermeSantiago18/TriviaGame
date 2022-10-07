import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrency } from '../redux/actions';

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

  handleBtn = () => {
    const { apiDispatch } = this.props;
    apiDispatch();
    localStorage.setItem('token', JSON.stringify(apiDispatch));
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
const mapDispatchToProps = (dispatch) => ({
  apiDispatch: (state) => dispatch(fetchCurrency(state)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  apiDispatch: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
