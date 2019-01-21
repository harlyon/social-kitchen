import React, { Component } from 'react';

class LogIn extends Component {
  render() {
    return (
      <div>
        <button onClick={this.logIn} className="">Log in with Google</button>
        <button onClick={this.anonymousLogIn} className="">Log in as Guest</button>
      </div>
    )
  }
}

export default LogIn;