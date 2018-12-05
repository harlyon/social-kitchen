import React, {Component} from 'react';
// import firebase

class PrintSingleRecipe extends Component {
  printRecipe = () => {
    return (
      <div>
        <h2>{this.props.recipeName}</h2>
        <p>Servings: {this.props.numberOfServings}</p>
        <a href={this.props.source} target="_blank" rel="noopener noreferrer">Directions</a>
        <p>Ingredients:</p>
        <ul>
          {this.props.ingredients.map((ingredient) => {
            return (
              <li>
                {ingredient}
              </li>
            )
          })}
        </ul>
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