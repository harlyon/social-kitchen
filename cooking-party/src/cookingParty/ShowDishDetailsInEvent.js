import React, {Component} from 'react';
import firebase from 'firebase';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

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
      <div>
        <h1>{this.state.currentDish.name}</h1>
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
        <a href={this.state.currentDish.source} target="_blank">Click here for instructions</a>
        <Link to={`/${this.props.match.params.party_id}`}>Go Back</Link>
      </div>
      
    )
  }
}

export default ShowDishDetailsInEvent;