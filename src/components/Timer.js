import React, { Component } from 'react';

class Timer extends Component {
  state = {
    counter: 30,
  };

  componentDidMount() {
    const num = 1000;
    setInterval(() => this.downTimer(), num);
  }

  downTimer = () => {
    const { counter } = this.state;
    if (counter > 0) {
      this.setState((prevState) => ({
        counter: prevState.counter - 1,
      }));
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
export default Timer;
