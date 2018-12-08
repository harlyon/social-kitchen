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
      <div>
        <h1>Events</h1>
        {Object.entries(this.props.listOfCookingParties).map((party) => {
          console.log(party);
          
          return (
            <div key={party[1].key}>
              <Link to={`/${party[1].key}`}>
                <div key={party[1].key} >
                  <h2>{party[1].name}</h2>
                  <button id={party[1].key} onClick={this.deleteParty}>Delete this party</button>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    )
  }
}

export default DisplayEvents;