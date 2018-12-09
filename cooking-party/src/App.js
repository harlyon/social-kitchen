import React, { Component } from 'react';
import firebase from 'firebase';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import './App.scss';

import CreateEvent from './cookingParty/CreateEvent';
import EventDetails from './cookingParty/EventDetails';
import ShowDishDetailsInEvent from './cookingParty/ShowDishDetailsInEvent';

import SearchForRecipe from './recipes/SearchForRecipe';
import PrintSingleRecipe from './recipes/PrintSingleRecipe';
import PrintRecipeList from './recipes/PrintRecipeList';

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

class App extends Component {
  constructor() {
    super();
    this.state = {
      
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
        console.log(res)
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
          {/* <SearchForRecipe /> */}
          {
            this.state.user
              ? <button onClick={this.logOut}>Log Out</button>
              : <button onClick={this.logIn}>Log In</button>
            }
          {
            this.state.user
            ?
            (
              <div>
                {/* <NavLink to="/">Home</NavLink> */}
                <header>
                  <NavLink to="/">Home</NavLink>
                  {/* <NavLink to="/party">Events</NavLink> */}
                  <h1>Hello {this.state.user.displayName}!</h1>
                </header>
                <Route exact path="/" component={CreateEvent} />
                <Route exact path={'/:party_id'} render={(props) => <EventDetails {...props} user={this.state.user} />} />
                {/* <Route exact path={'/:party_id/search'} render={(props) => <SearchForRecipe {...props} />} /> */}
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