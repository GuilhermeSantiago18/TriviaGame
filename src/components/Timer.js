import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { timer } from '../redux/actions';

class Timer extends Component {
  state = {
    counter: 30,
    timer2: null,
  };

  componentDidMount() {
    const num = 1000;
    const timer2 = setInterval(this.downTimer, num);
    this.setState({ timer2 });
  }

  downTimer = () => {
    const { counter } = this.state;
    if (counter > 0) {
      this.setState((prevState) => ({
        counter: prevState.counter - 1,
      }));
    }
    if (counter === 0) {
      const { dispatch } = this.props;
      dispatch(timer(counter));
      const { timer2 } = this.state;
      clearInterval(timer2);
    }
  };

  render() {
    const { counter } = this.state;
    return (
      <div>
        TEMPO PARA RESPOSTA:
        <br />
        {counter}
      </div>
    );
  }
}

Timer.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Timer);
