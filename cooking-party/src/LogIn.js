import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <main className="login">
        <div className="wrapper">
          <div className="login__container">
            <h2 className="login__title">Welcome!</h2>
            <h3 className="login__subtitle">Please log in to continue.</h3>
            <button onClick={this.props.loginGoogle} className="login__button">Log in with Google</button>
            <button onClick={this.props.loginGuest} className="login__button">Log in as Guest</button>
          </div>
        </div>
      </main>
    )
  }
}

export default Login;