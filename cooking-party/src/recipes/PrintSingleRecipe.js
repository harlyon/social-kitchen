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
    const newIngredients = Array.from(filteredIngredientList);
    return (
      <React.Fragment>
        <div className="print-recipe-single">
          <h2 className="print-recipe-single__title">{this.props.recipeName}</h2>
          <img className="print-recipe-single__image" src={this.props.image} alt={this.props.recipeName}/>
          <div className="print-recipe-single__info">
            <p className="print-recipe-single__servings"><span>Servings:</span> {this.props.numberOfServings}</p>
            <p className="print-recipe-single__ingredients"><span>Ingredients:</span></p>
            <ul>
              {newIngredients.map((ingredient) => {
                return (
                  <li key={ingredient}>
                    {ingredient}
                  </li>
                )
              })}
            </ul>
            <a href={this.props.source} target="_blank" rel="noopener noreferrer" className="print-recipe-single__directions">Directions</a>
            <button onClick={this.handleClick} className="print-recipe-single__add-dish">Add Dish</button>
          </div>
        </div>
      </React.Fragment>
    )
  }
  render() {
    return (
      this.props.recipeid && this.printRecipe()
    )
  }
}

export default PrintSingleRecipe;