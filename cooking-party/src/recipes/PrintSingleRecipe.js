import React, {Component} from 'react';
import firebase from 'firebase';
import swal from 'sweetalert';

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
    swal( `${this.props.recipeName}`, 'has been added to your event');
  }
  
  printRecipe = () => {
    const filteredIngredientList = new Set(this.props.ingredients);
    const newIngredients = Array.from(filteredIngredientList)
    return (
      <div className="searchRecipe--card">
        <h2 class="searchRecipeHeading">{this.props.recipeName}</h2>
        <img className="searchRecipeImg" src={this.props.image} alt={this.props.recipeName}/>
        <div className="searchRecipeInfo">
          <p className="sub__heading--recipe"><span className="sub__text--headingSearch">Servings:</span> {this.props.numberOfServings}</p>
          <p className="sub__heading--recipe"><span className="sub__text--headingSearch">Ingredients:</span></p>
          <ul>
            {newIngredients.map((ingredient) => {
              return (
                <li>
                  {ingredient}
                </li>
              )
            })}
          </ul>
          <div className="container--searchRecipeLink">
            <a href={this.props.source} target="_blank" rel="noopener noreferrer" class="searchRecipeLink">Directions</a>
          </div>
          <button onClick={this.handleClick} class="btn__add--searchRecipe">Add Dish</button>
        </div>
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