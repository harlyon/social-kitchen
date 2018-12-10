import React, {Component} from 'react';
import firebase from 'firebase';

class PrintSingleRecipe extends Component {
  constructor() {
    super();
    this.state = {
      selectedRecipe: {}
    }
  }
  handleClick = () => {
    const selectedRecipe = {
      name: this.props.recipeName,
      servings: this.props.numberOfServings,
      source: this.props.source,
      ingredients: Array.from(new Set(this.props.ingredients)),
      image: this.props.image
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
        <img src={this.props.image} alt={this.props.recipeName}/>
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
      <div className="printSingleRecipe">
        {this.props.recipeid
          ?
          this.printRecipe()
          :
          null}
      </div>
    )
  }
}

export default PrintSingleRecipe;