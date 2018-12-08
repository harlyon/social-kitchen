import React, {Component} from 'react';
import axios from 'axios';
import PrintSingleRecipe from './PrintSingleRecipe';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

class PrintRecipeList extends Component {
  constructor() {
    super();
    this.state = {
      recipeid: '',
      recipeName: '',
      numberOfServings: 0,
      ingredients: [],
      source: '',
      firebaseKey: ''
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.firebaseKey !== prevProps.firebaseKey && this.props.firebaseKey !== null) {
      this.setState({
        firebaseKey: this.props.firebaseKey
      })
    }
  }
  handleClick = (e) => {
    console.log('i am being clicked');
    
    this.setState({
      recipeid: e.target.value
    }, () => {
      axios.get(`https://api.yummly.com/v1/api/recipe/${this.state.recipeid}?_app_id=df8e14a9&_app_key=a3cc287f6d68e263afd8945e586bea51`, {
      }).then((res) => {
        // console.log(res.data);
        const tempIngredientsArray = [];
        tempIngredientsArray.push(...res.data.ingredientLines);
        this.setState({
          recipeName: res.data.name,
          numberOfServings: res.data.numberOfServings,
          ingredients: tempIngredientsArray,
          source: res.data.source.sourceRecipeUrl
        })
      })
    })
  }
  printRecipes = () => {
    return(
      this.props.recipeList
      ?
      this.props.recipeList.map((recipe) => {
        return (
          <div key={recipe.id}>
            <h2>{recipe.recipeName}</h2>
            <button value={recipe.id} onClick={this.handleClick}>See recipe</button>
          </div>
        )
      })
      :
      null
    )
  }
  render() {
    return (
      <div className="recipe-container">
        <PrintSingleRecipe
          recipeid={this.state.recipeid}
          recipeName={this.state.recipeName}
          numberOfServings={this.state.numberOfServings}
          ingredients={this.state.ingredients}
          source={this.state.source}
          firebaseKey={this.props.firebaseKey} />
        <section className="recipe-list">
          {this.printRecipes()}
        </section>
      </div>

    )
  }
}

export default PrintRecipeList;