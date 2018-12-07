import React, {Component} from 'react';
import firebase from 'firebase';

class PrintSingleRecipe extends Component {
  constructor() {
    super();
    this.state = {
      selectedRecipe: {}
    }
  }
  handleClick = (props) => {
    const selectedRecipe = {
      name: this.props.recipeName,
      servings: this.props.numberOfServings,
      source: this.props.source,
      ingredients: Array.from(new Set(this.props.ingredients))
    }
    const recipeRef = firebase.database().ref(`/${this.props.firebaseKey}/dishes`)
    recipeRef.push(selectedRecipe);
  }
  printRecipe = () => {
    const filteredIngredientList = new Set(this.props.ingredients);
    const newIngredients = Array.from(filteredIngredientList)
    return (
      <div>
        <h2>{this.props.recipeName}</h2>
        <p>Servings: {this.props.numberOfServings}</p>
        <a href={this.props.source} target="_blank" rel="noopener noreferrer">Directions</a>
        <p>Ingredients:</p>
        <ul>
          {newIngredients.map((ingredient) => {
            return (
              <li>
                {ingredient}
              </li>
            )
          })}
        </ul>
        <button onClick={this.handleClick}>Add to Party</button>
      </div>
    )
  }
  render() {
    return (
      <section className="selected-recipe">
        {this.props.recipeid
          ?
          this.printRecipe()
          :
          null}
      </section>
    )
  }
}

export default PrintSingleRecipe;