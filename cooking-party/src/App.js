import React, { Component } from 'react';
import firebase from 'firebase';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
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
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user: user
        })
      }
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
  render() {
    return (
      <Router>
        <div className="App">
          <header className="header">
            <div className="wrapper">
              <h1 className="mainTitle">Social Kitchen</h1>
              {/* <nav className="nav">
                <div className="nav__mobile-button-container">
                  <NavLink to="/" className="nav__mobile-link">
                    <button className="nav__mobile-button">Home</button>
                  </NavLink>
                  <button onClick={this.logOut} className="nav__mobile-button">Log Out</button>
                </div>
              </nav> */}
              <div>
                {
                  this.state.user
                  ?
                  (
                    <nav className="nav clearfix">
                      <h2 className="nav__greeting">Hello <span>{this.state.user.displayName}</span>!</h2>
                      <div className="nav__button-container">
                        <NavLink to="/">
                          <button className="nav__button">Home</button>
                        </NavLink>
                        <button onClick={this.logOut} className="nav__button">Log Out</button>
                      </div>
                    </nav>
                  )
                  :
                  (
                    <nav className="nav clearfix">
                      <h2 className="nav__greeting">Please log in.</h2>
                      <div className="nav__button-container">
                        <button onClick={this.logIn} className="nav__button">Log In</button>
                      </div>
                    </nav>
                  )
                }
              </div>
            </div>
          </header>
          {
            this.state.user &&
            (
              <main>
                <Route exact path="/" component={CreateEvent} />
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
