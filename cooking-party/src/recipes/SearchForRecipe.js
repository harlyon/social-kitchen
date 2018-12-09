import React, {Component} from 'react';
import axios from 'axios';
import PrintRecipeList from'./PrintRecipeList';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

class SearchForRecipe extends Component {
  constructor() {
    super();
    this.state = {
      recipeSearch: '',
      recipeList: []
    }
  }
  // search for recipes based on search query
  searchForRecipes = (searchterm) => {
    axios.get(`https://api.yummly.com/v1/api/recipes?_app_id=df8e14a9&_app_key=a3cc287f6d68e263afd8945e586bea51&`, {
      params: {
        q: searchterm
      }
    }).then((res) => {
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
      <div>
        <form action="" onSubmit={this.handleSubmit}>
          <input type="text" id="recipeSearch" value={this.state.recipeSearch} onChange={this.handleChange} placeholder="Search for recipes" />
          <label htmlFor="recipeSearch"></label>
          <input type="submit" id="submit" value="Search" />
          <label htmlFor="submit"></label>
        </form>
        <PrintRecipeList recipeList={this.state.recipeList} firebaseKey={this.props.firebaseKey} /> 
      </div>
    )
  }
}

export default SearchForRecipe;