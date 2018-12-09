import React, {Component} from 'react';
import firebase from 'firebase';
import { Link } from "react-router-dom";

class ShowDishDetailsInEvent extends Component {
  constructor() {
    super()
    this.state = {
      currentDish: {}
    }
  }
  componentDidMount() {
    const dishRef = firebase.database().ref(`/${this.props.match.params.party_id}/dishes/${this.props.match.params.dish_id}`)
    dishRef.on('value', (snapshot) => {
      this.setState({
        currentDish: snapshot.val()
      })
    })
  }
  render() {
    return (
      <div className="showDishDetailsInEvent wrapper">
        <h2>{this.state.currentDish.name}</h2>
        <img src={this.state.currentDish.image} alt={this.state.currentDish.name}/>
        <p>Number of servings: {this.state.currentDish.servings}</p>
        <p>Ingredients:</p>
        <ul>
          {this.state.currentDish.ingredients && 
          (
           this.state.currentDish.ingredients.map((ingredient) => {
             return (
               <li>{ingredient}</li>
             )
           }) 
          )}
        </ul>
        <a href={this.state.currentDish.source} target="_blank" rel="noopener noreferrer">Click here for instructions</a>
        <Link to={`/${this.props.match.params.party_id}`}>Go Back</Link>
      </div>
      
    )
  }
}

export default ShowDishDetailsInEvent;