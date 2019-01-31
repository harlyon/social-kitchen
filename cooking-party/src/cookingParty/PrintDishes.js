import React, { Component } from 'react';
import firebase from '../firebase/firebase.js';
import { BrowserRouter as Router, Route, NavLink, Link } from "react-router-dom";

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
          <div className="eventDishList clearfix" key={dish[0]}>
            <div className="dishLink">
              <Link
                to={`/${this.props.firebaseKey}/${dish[0]}`}
                className="eventDishName">
                  {dish[1].name}
              </Link>
            </div>
            <div className="dishDelete">
              <button onClick={this.handleClick} id={dish[0]} className="btn--delete"><i className="fas fa-times" id={dish[0]}></i></button>
            </div>
          </div>
        )
      })
    )
  }
  render() {
    return (
      <div>
        <h2 className="event-details-main__title">Dishes</h2>
        {
          this.props.partyDetails.dishes
          ?
          this.printDishes()
          :
          (<p>There aren't any dishes yet! Let's add some!</p>)
        }
      </div>
    )
  }
}

export default PrintDishes;