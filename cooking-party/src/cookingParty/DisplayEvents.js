import React, { Component } from 'react';
import firebase from '../firebase/firebase';
import { Link } from "react-router-dom";

class DisplayEvents extends Component {
  deleteParty = (e) => {
    const firebaseKey = e.target.id;
    const partyRef = firebase.database().ref(`/${firebaseKey}`);
    partyRef.remove();
  }
  render() {
    return (
      <div className="displayEvents">
        <h2>Events</h2>
        {Object.entries(this.props.listOfCookingParties).map((party) => {
          return (
            <div key={party[1].key} className="singleEvent clearfix">
              <div className="displayEvent">
                <Link to={`/${party[1].key}`} className="displayEventName">
                  {party[1].name}
                </Link>
              </div>
              <div className="eventDelete">
                <button className="btn--delete" id={party[1].key} onClick={this.deleteParty}><i className="fas fa-times" id={party[1].key}></i></button>
              </div>

            </div>

          );
        })}
      </div>
    )
  }
}

export default DisplayEvents;