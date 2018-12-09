import React, { Component } from 'react';
import firebase from 'firebase';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import './App.scss';

import CreateEvent from './cookingParty/CreateEvent';
import EventDetails from './cookingParty/EventDetails';
import ShowDishDetailsInEvent from './cookingParty/ShowDishDetailsInEvent';
<<<<<<< HEAD

import SearchForRecipe from './recipes/SearchForRecipe';

import './App.scss';
=======
>>>>>>> 93ae758deba752afb409a0e7dcc3e65c737c57fc
import PrintSingleRecipe from './recipes/PrintSingleRecipe';


const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {}
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
          <header>
            <h1>Social Kitchen</h1>
            {
              this.state.user
              ?
              <button onClick={this.logOut}>Log Out</button>
              :
              <button onClick={this.logIn}>Log In</button>
            }
            <NavLink to="/">Home</NavLink>
            <h2>Hello {this.state.user.displayName}!</h2>
          </header>
          {
            this.state.user
            ?
            (
              <div>
                <Route exact path="/" component={CreateEvent} />
                <Route exact path={'/:party_id'} render={(props) => <EventDetails {...props} user={this.state.user} />} />
                <Route exact path={'/:party_id/dishes/:dish_id'} render={(props) => <ShowDishDetailsInEvent {...props} />} />
                <Route path={'/party/:party_id/:recipe_id'} render={(props) => <PrintSingleRecipe {...props} />} />
              </div>
              )
            :
            <p>You must be logged in.</p>
            }
        </div>
      </Router>
    );
  }
}

export default App;
