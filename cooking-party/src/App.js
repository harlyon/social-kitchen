import React, { Component } from 'react';
import firebase from 'firebase';
import { BrowserRouter as Router, Route, NavLink }from "react-router-dom";

import './App.scss';
import CreateEvent from './cookingParty/CreateEvent';
import EventDetails from './cookingParty/EventDetails';
import ShowDishDetailsInEvent from './cookingParty/ShowDishDetailsInEvent';
import PrintSingleRecipe from './recipes/PrintSingleRecipe';

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
    }
  }

  componentDidMount() {
    // persisting user login
    // auth.onAuthStateChanged((user) => {
    //   if (user) {
    //     this.setState({
    //       user: user
    //     })
    //   }
    // });


    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
      .then(function () {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        return firebase.auth().GoogleAuthProvider();
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
      });

  }

  // function to login
  logIn = () => {
    auth.signInWithPopup(provider)
      .then((res) => {
        this.setState({
          user: res.user
        })
      })
  }

  // function to logout
  logOut = () => {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null,
        })
      })
  }

  anonymousLogIn = () => {
    firebase.auth().signInAnonymously().catch(function (error) {})
      .then((res) => {
        this.setState({
          user: res.user
        })
      });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header className="header">
            <div className="wrapper">
              <NavLink to="/" className="mainTitle-link">
                <h1 className="mainTitle">Social Kitchen</h1>
              </NavLink>
              <div>
                {
                  this.state.user
                  ?
                  (
                    <nav className="nav clearfix">
                      <h2 className="nav__greeting">Hello <span id="username">{this.state.user.displayName ? this.state.user.displayName : 'Anonymous User'}</span>!</h2>
                      <NavLink to="/" className="mainTitle-link">
                        <button onClick={this.logOut} className="nav__button">Log Out</button>
                      </NavLink>
                    </nav>
                  )
                  :
                  (
                    <nav className="nav clearfix">
                      <h2 className="nav__greeting">Please log in.</h2>
                      <button onClick={this.logIn} className="nav__button">Log In with Google</button>
                      <button onClick={this.anonymousLogIn} className="nav__button">Log In Anonymously</button>
                    </nav>
                  )
                }
              </div>
            </div>
          </header>
          {
            !this.state.user &&
            (
              <div className="notLoggedIn">
              </div>
            )
          }
          {
            this.state.user &&
            (
              <main>
                <Route exact path="/" render={(props) => <CreateEvent {...props} user={this.state.user} />} />
                <Route exact path={'/:party_id'} render={(props) => <EventDetails {...props} user={this.state.user} />} />
                <Route exact path={'/:party_id/dishes/:dish_id'} render={(props) => <ShowDishDetailsInEvent {...props} />} />
                <Route path={'/party/:party_id/:recipe_id'} render={(props) => <PrintSingleRecipe {...props} />} />
              </main>
            )
          }
        </div>
      </Router>
    );
  }
}

export default App;