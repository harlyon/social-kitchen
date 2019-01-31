import React, {Component} from 'react';
import axios from 'axios';
import PrintRecipeList from'./PrintRecipeList';

class SearchForRecipe extends Component {
  constructor() {
    super();
    this.state = {
      recipeSearch: '',
      recipeList: [],
      removeSearchResults: false
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
      recipeSearch: '',
      removeSearchResults: false
    }, () => {
      this.searchForRecipes(recipe);
    })
  }
  toggleSearchAndSingle = () => {
    this.setState({
      removeSearchResults: !this.state.removeSearchResults
    })
  }
  render() {
    return (
      <section className="searchForRecipe">
        <h2 className="event-details-main__title">Search</h2>
        <form action="" onSubmit={this.handleSubmit} className="searchForm">
          <input type="text" id="recipeSearch" value={this.state.recipeSearch} onChange={this.handleChange} className="recipeSearch" placeholder="Search for recipes" />
          <label htmlFor="recipeSearch"></label>
          <input type="submit" id="submit" value="Search" className="BTN__submit--search" />
          <label htmlFor="submit"></label>
        </form>
        <button onClick={this.toggleSearchAndSingle} className="toggleSearch">{this.state.removeSearchResults === false ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}</button>
        <PrintRecipeList
          recipeList={this.state.recipeList}
          firebaseKey={this.props.firebaseKey}
          removeSearchResults={this.state.removeSearchResults} /> 
      </section>
    )
  }
}

export default SearchForRecipe;