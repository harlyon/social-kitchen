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
      <div className="showDishDetailsInEvent">
        <div className="wrapper">
          <div className="dish inner-wrapper">
            <h2 className="dish__title">{this.state.currentDish.name}</h2>
          </div>
        </div>
        <div className="image-container">
          <div className="dish inner-wrapper">
            <img src={this.state.currentDish.image} alt={this.state.currentDish.name} className="dish__image"/>
          </div>
        </div>
        <div className="wrapper">
          <div className="dish inner-wrapper clearfix">
            <p className="dish__servings">Number of servings: <span>{this.state.currentDish.servings}</span></p>
            <p className="dish__ingredients-title">Ingredients:</p>
            <ul className="dish__ingredients-list">
              {this.state.currentDish.ingredients && 
              (
              this.state.currentDish.ingredients.map((ingredient) => {
                return (
                  <li className="dish__ingredients-item">{ingredient}</li>
                )
              }) 
              )}
            </ul>
            <a href={this.state.currentDish.source} target="_blank" rel="noopener noreferrer" className="dish__directions">Directions</a>
            <Link to={`/${this.props.match.params.party_id}`} className="dish__back"><i className="fas fa-arrow-left"></i></Link>
          </div>
        </div>
      </div>
    )
  }
}

export default ShowDishDetailsInEvent;