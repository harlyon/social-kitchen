import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';
import CreateCookingParty from './cookingParty/CreateCookingParty';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import SearchForRecipe from './recipes/SearchForRecipe';
import PartyDetails from './cookingParty/PartyDetails';

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
          <SearchForRecipe />
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
                <NavLink to="/">Home</NavLink>
                <h1>Hello {this.state.user.displayName}!</h1>
                <Route path="/" component={CreateCookingParty} />
                <Route exact path={'/party/:party_id'} render={(props) => <PartyDetails {...props} />} />
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