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
        <div className="dish wrapper clearfix">
          <aside className="dish__aside">
            <div className="dish__aside-wrapper">
              <h2 className="dish__title">{this.state.currentDish.name}</h2>
              <img src={this.state.currentDish.image} alt={this.state.currentDish.name} className="dish__image" />
              <p className="dish__servings">Number of servings: <span>{this.state.currentDish.servings}</span></p>
              <div className="dish__buttons-container">
                <Link to={`/${this.props.match.params.party_id}`} className="dish__back-btn"><i className="fas fa-arrow-left"></i></Link>
                <a href={this.state.currentDish.source} target="_blank" rel="noopener noreferrer" className="dish__directions-btn">Directions</a>
              </div>
            </div>
          </aside>
          <main className="dish__main">
            <h2 className="dish__ingredients-title">Ingredients:</h2>
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
          </main>
        </div>
      </div>
    )
  }
}

export default ShowDishDetailsInEvent;