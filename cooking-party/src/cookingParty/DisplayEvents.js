import React, { Component } from 'react';
import firebase from '../firebase/firebase';
import { Link } from "react-router-dom";
import swal from 'sweetalert';

class DisplayEvents extends Component {
  constructor() {
    super();
    this.state = ({
      listOfCookingParties: {}
    })
  }
  deleteEvent = (e) => {
    const firebaseKey = e.target.id;
    const partyRef = firebase.database().ref(`/${firebaseKey}`);
    const creator = e.target.getAttribute('data-creator');
    if (this.props.user.displayName === creator || creator === 'Guest') {
      partyRef.remove();
    } else {
      swal('You cannot delete this event.');
    }
  }
  render() {
    return (
      <div className="events">
        <h2 className="events__heading">Events</h2>
        {Object.entries(this.props.listOfCookingParties).map((party) => {
          return (
            <div key={party[1].key} className="event__container">
              <Link to={`/${party[1].key}`} className="event__link">
                <div className="event__info-container">
                  <h3 className="event__title">{party[1].name}</h3>
                  <p className="event__creator">Created by: {party[1].creator}</p>
                  <p className="event__date">Date: {party[1].date}</p>
                </div>
              </Link>
              <div className="event__delete">
                <button className="event__delete-btn" id={party[1].key} data-creator={party[1].creator}onClick={this.deleteEvent}>
                  <i className="fas fa-times" id={party[1].key} data-creator={party[1].creator}></i>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    )
  }
}

export default DisplayEvents;