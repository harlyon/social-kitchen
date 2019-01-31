import React, { Component } from 'react';
import firebase from '../firebase/firebase.js';
import { Link } from "react-router-dom";

class PrintDishes extends Component {
  handleClick = (e) => {
    const dishFirebaseKey = e.target.id;
    const dishRef = firebase.database().ref(`/${this.props.firebaseKey}/dishes/${dishFirebaseKey}`);
    dishRef.remove();
  }
  printDishes = () => {
    return (
      Object.entries(this.props.partyDetails.dishes).map((dish) => {
        return (
          <div className="dish-list__dish" key={dish[0]}>
            <Link
              to={`/${this.props.firebaseKey}/${dish[0]}`}
              className="dish-list__link">
                {dish[1].name}
            </Link>
            <button onClick={this.handleClick} id={dish[0]} className="dish-list__delete-button"><i className="fas fa-times dish-list__delete__icon" id={dish[0]}></i></button>
          </div>
        )
      })
    )
  }
  render() {
    return (
      <section className="dish-list">
        <h2 className="event-details-main__title">Dishes</h2>
        {
          this.props.partyDetails.dishes
          ?
          this.printDishes()
          :
          (<p>There aren't any dishes yet! Let's add some!</p>)
        }
      </section>
    )
  }
}

export default PrintDishes;