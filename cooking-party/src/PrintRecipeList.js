import React, {Component} from 'react';

class PrintRecipeList extends Component {
  constructor() {
    super();
  }
  printRecipes = () => {
    this.props.recipeList.map((recipe) => {
      return (
        <div key={recipe.id}>
          <h2>recipe.recipeName</h2>
          <button value={recipe.id}>Click here to get recipe}</button>
        </div>
      )
    })
  }
  render() {
    return (
      <div>
        {
          this.props.recipeList
          ?
          this.props.recipeList.map((recipe) => {
            return (
              <div key={recipe.id}>
                <h2>{recipe.recipeName}</h2>
                <button value={recipe.id}>Click here to get recipe</button>
              </div>
            )
          })
          :
          null
        }
      </div>
    )
  }
}

export default PrintRecipeList;