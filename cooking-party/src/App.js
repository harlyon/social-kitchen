import React, { Component } from 'react';
import firebase from 'firebase';
import { BrowserRouter as Router, Route, NavLink }from "react-router-dom";

import './App.scss';
import CreateEvent from './cookingParty/CreateEvent';
import EventDetails from './cookingParty/EventDetails';
import ShowDishDetailsInEvent from './cookingParty/ShowDishDetailsInEvent';
import PrintSingleRecipe from './recipes/PrintSingleRecipe';
import Login from './Login';
import guestAvatar from './assets/guest.jpg';

const providerGoogle = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
    }
  }
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user: user
        })
      }
    });
  }
  loginGoogle = () => {
    auth.signInWithPopup(providerGoogle)
      .then((res) => {
        this.setState({
          user: res.user
        })
      })
  }
  logout = () => {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null,
        })
      })
  }
  loginGuest = () => {
    firebase.auth().signInAnonymously()
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
              <div className="header__container">
                <NavLink to="/" className="header__title-link">
                  <h1 className="header__title">Social Kitchen</h1>
                </NavLink>
                {
                  this.state.user &&
                  (
                    <div className="header__avatar-logout-container">
                      <img
                        src={this.state.user.photoURL ? this.state.user.photoURL : guestAvatar}
                        alt={this.state.user.displayName ? this.state.user.displayName : 'Guest'} className="header__avatar" />
                      <NavLink to="/" className="title-link">
                        <button onClick={this.logout} className="header__logout">Log Out</button>
                      </NavLink>
                    </div>
                  )
                }
              </div>
            </div>
          </header>
          {
            this.state.user &&
            (
              <main>
                <Route exact path="/" render={(props) => <CreateEvent {...props} user={this.state.user} />} />
                <Route exact path={'/:party_id'} render={(props) => <EventDetails {...props} user={this.state.user} />} />
                <Route exact path={'/:party_id/dishes/:dish_id'} render={(props) => <ShowDishDetailsInEvent {...props} />} />
                <Route exact path={'/party/:party_id/:recipe_id'} render={(props) => <PrintSingleRecipe {...props} />} />
              </main>
            )
          }
          {
            !this.state.user &&
            (
              <Login loginGoogle={this.loginGoogle} loginGuest={this.loginGuest} />
            )
          }
        </div>
      </Router>
    );
  }
}

export default App;