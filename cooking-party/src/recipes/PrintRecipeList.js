import React, {Component} from 'react';
import axios from 'axios';
import PrintSingleRecipe from './PrintSingleRecipe';

class PrintRecipeList extends Component {
  constructor() {
    super();
    this.state = {
      recipeid: '',
      recipeName: '',
      numberOfServings: 0,
      ingredients: [],
      source: '',
      firebaseKey: '',
      image: ''
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
    this.setState({
      recipeid: e.target.value
    }, () => {
      axios.get(`https://api.yummly.com/v1/api/recipe/${this.state.recipeid}?_app_id=df8e14a9&_app_key=a3cc287f6d68e263afd8945e586bea51`, {
      }).then((res) => {
        const tempIngredientsArray = [];
        tempIngredientsArray.push(...res.data.ingredientLines);
        this.setState({
          recipeName: res.data.name,
          numberOfServings: res.data.numberOfServings,
          ingredients: tempIngredientsArray,
          source: res.data.source.sourceRecipeUrl,
          image: res.data.images[0].hostedLargeUrl
        })
      })
    })
  }
  printRecipes = () => {
    return(
      this.props.recipeList && 
      this.props.recipeList.map((recipe) => {
        return (
          <li key={recipe.id} className="print-recipe-list__item">
            <button
              className="print-recipe-list__button"
              value={recipe.id}
              onClick={this.handleClick}>
                {recipe.recipeName}
            </button>
          </li>
        )
      })
    )
  }
  render() {
    return (
      <div className="print-recipe">
        <PrintSingleRecipe
          recipeid={this.state.recipeid}
          recipeName={this.state.recipeName}
          numberOfServings={this.state.numberOfServings}
          ingredients={this.state.ingredients}
          source={this.state.source}
          firebaseKey={this.props.firebaseKey}
          image={this.state.image} /> 
        <ul className="print-recipe-list">
          {this.printRecipes()}
        </ul>
      </div>
    )
  }
}

export default PrintRecipeList;