import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import PrintRecipeList from './PrintRecipeList';

class App extends Component {
  constructor() {
    super();
    this.state = {
      recipeSearch: '',
      recipeList: []
    }
  }
  searchForRecipe = (searchterm) => {
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
  // printRecipes = () => {
  //   this.state.recipeList.map((recipe) => {
  //     return (
  //       <div key={recipe.id}>
  //         <h2>recipe.recipeName</h2>
  //         <button value={recipe.id}>Click here to get recipe}</button>
  //       </div>
  //     )
  //   })
  // }
  // apiCall = () => {
  //   axios.get('https://api.yummly.com/v1/api/recipe/Easy-Glazed-Honey-Balsamic-Chicken-2559757?_app_id=df8e14a9&_app_key=a3cc287f6d68e263afd8945e586bea51&q=chicken', {
  //   }).then((res) => {
  //     console.log(res)
  //   })
  // }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const recipe = this.state.recipeSearch;
    this.setState({
      recipeSearch: ''
    }, () => {
      this.searchForRecipe(recipe);
    })
  }
  render() {
    return (
      <div className="App">
        <form action="" onSubmit={this.handleSubmit}>
          <input type="text" id="recipeSearch" value={this.state.recipeSearch} onChange={this.handleChange}/>
          <label htmlFor="recipeSearch"></label>
          <input type="submit" id="submit"/>
          <label htmlFor="submit"></label>
        </form>
        <PrintRecipeList recipeList={this.state.recipeList} />
      </div>
    );
  }
}

export default App;
