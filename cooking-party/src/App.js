import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAS1abiWo5s9dkd3nYV2OFNh8m9Q4dpj2Y",
  authDomain: "cooking-party.firebaseapp.com",
  databaseURL: "https://cooking-party.firebaseio.com",
  projectId: "cooking-party",
  storageBucket: "",
  messagingSenderId: "409593497714"
};
firebase.initializeApp(config);

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

const apiKey = '0597bff901b9ddc58daad4093dbda18a'
const apiId = '0acc9a47'
const searchRecipesUrl = 'http://api.yummly.com/v1/api/recipes'
const getRecipeUrl = 'http://api.yummly.com/v1/api/recipe/'

class App extends Component {
  constructor() {
    super();
    this.state={
      input:'',
      recipes: [],
      user: null,
      // images: [],
      newParty: '',
      cookingParties: {}
    }
  }

// captures value of user input
handleChange = (e) => {
  this.setState({
    [e.target.name]: e.target.value
  })
}

// calls axios to search recipes with what user inputs
handleSubmit = (e) => {
  e.preventDefault();
  axios({
    method: 'GET',
    url: searchRecipesUrl,
    dataResponse: 'json',
    params: {
      _app_id: apiId,
      _app_key: apiKey,
      q: this.state.input,
    }
  }).then((res) => {
    res = res.data.matches
    console.log(res);
    this.setState({
      recipes: res,
    })
  })
}

// captures value of recipeid the user clicked on and gets the recipe info for that specific recipeid
handleClick = (e) => {
  this.setState ({
    [e.target.name]: [e.target.value]
  })
  let recipeid = [e.target.value]
  axios({
    method: 'GET',
    url: getRecipeUrl + recipeid,
    dataResponse: 'json',
    params: {
      _app_id: apiId,
      _app_key: apiKey,
    }
  }).then((res)=>{
    res = res.data.images[0].imageUrlsBySize[360]
    // res1 = res.data.ingredientLines
    console.log(res);
    // console.log(res1);
  })
}

// function to login
logIn = () => {
  auth.signInWithPopup(provider)
  .then((res) => {
    this.setState({
      user:res.user
    })
  })
}

// function to logout
logOut = () => {
  auth.signOut()
  .then(() => {
    this.setState({
      user:null,
    })
  })
}

  render() {
    return (
      <div className="App">
        <header>
          <h1>Cooking Party</h1>
          {/* LOGIN BUTTONS */}
          {
            this.state.user
            ? <button onClick={this.logOut}>Log Out</button>
            : <button onClick={this.logIn}>Log In</button>
          }
        </header>

        {/* {
          this.state.user
          ?  // if the user is logged in, display their cooking parties
          : // if this user is not logged in don't display it
        } */}

        {/* FORM - THIS SHOULD GO INTO TERNERARY OPERATOR*/}
        <form action="" onSubmit={this.handleSubmit}>
          <label htmlFor="input"></label> 
          <input type="text" name="input" id="userInput" onChange={this.handleChange} value={this.state.input}/>
          <label htmlFor="submit"></label>
          <input type="submit" id="submit" value="See Recipes" />
        </form>


        {/* DISPLAY RECIPES */}
        {this.state.recipes.map(recipe => {
          return(
            <div>
              <h2>{recipe.recipeName}</h2>
              <button onClick={this.handleClick} name="recipeid" value={recipe.id}>Look at recipes</button>
            </div>
          )
        })}

      </div>
    );
  }
}

export default App;