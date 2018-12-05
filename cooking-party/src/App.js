import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import PrintRecipeList from './recipes/PrintRecipeList';
import firebase from 'firebase';
import CreateCookingParty from './cookingParty/CreateCookingParty.js';

// Initialize Firebase
// var config = {
//   apiKey: "AIzaSyAS1abiWo5s9dkd3nYV2OFNh8m9Q4dpj2Y",
//   authDomain: "cooking-party.firebaseapp.com",
//   databaseURL: "https://cooking-party.firebaseio.com",
//   projectId: "cooking-party",
//   storageBucket: "",
//   messagingSenderId: "409593497714"
// };
// firebase.initializeApp(config);

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

class App extends Component {
  constructor() {
    super();
    this.state = {
      recipeSearch: '',
      recipeList: []
    }
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
  // search for recipes based on search query
  searchForRecipes = (searchterm) => {
    axios.get(`https://api.yummly.com/v1/api/recipes?_app_id=df8e14a9&_app_key=a3cc287f6d68e263afd8945e586bea51&`, {
      params: {
        q: searchterm
      }
    }).then((res) => {
      console.log(res.data.matches)
      this.setState({
        recipeList: res.data.matches
      })
    })
  }
  // saving search term to state
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  // submitting form to search for recipes
  handleSubmit = (e) => {
    e.preventDefault();
    const recipe = this.state.recipeSearch;
    this.setState({
      recipeSearch: ''
    }, () => {
      this.searchForRecipes(recipe);
    })
  }
  render() {
    return (
      <div className="App">
        {
          this.state.user
            ? <button onClick={this.logOut}>Log Out</button>
            : <button onClick={this.logIn}>Log In</button>
        }
        <CreateCookingParty />
        <form action="" onSubmit={this.handleSubmit}>
          <input type="text" id="recipeSearch" value={this.state.recipeSearch} onChange={this.handleChange} placeholder="Search for recipes"/>
          <label htmlFor="recipeSearch"></label>
          <input type="submit" id="submit" value="Search"/>
          <label htmlFor="submit"></label>
        </form>
        <PrintRecipeList recipeList={this.state.recipeList} />
      </div>
    );
  }
}

export default App;
