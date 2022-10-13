import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Login.css';
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
    const { player: { api: { token } } } = tokenAPI;
    localStorage.setItem('token', token);
    history.push('/game');
  };

  render() {
    const { email, name, isBtnDisabled } = this.state;
    return (
      <div>
        <h1 className="title">{'LET\'S PLAY!'}</h1>
        <Form className="form">
          <Form.Group className="mb-3 forminput">
            <Form.Label htmlFor="email">
              Email:
              <Form.Control
                className="form-control"
                placeholder="e-mail"
                data-testid="input-gravatar-email"
                id="email"
                type="email"
                name="email"
                value={ email }
                onChange={ this.handleChange }
              />
            </Form.Label>
            <Form.Label htmlFor="name">
              Name:
              <Form.Control
                data-testid="input-player-name"
                placeholder="name"
                id="name"
                type="text"
                name="name"
                value={ name }
                onChange={ this.handleChange }
              />
            </Form.Label>
          </Form.Group>
          <Form.Group className="buttonsform">
            <Button
              data-testid="btn-play"
              variant="success"
              type="button"
              name="btn"
              disabled={ isBtnDisabled }
              onClick={ this.handleBtn }
            >
              Play
            </Button>
            <Button
              variant="info"
              syze=""
              type="button"
              data-testid="btn-settings"
              onClick={ this.handleBtnConfig }
            >
              Settings
            </Button>
          </Form.Group>
        </Form>
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
