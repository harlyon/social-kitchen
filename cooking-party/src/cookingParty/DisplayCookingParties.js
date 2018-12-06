import React, { Component } from 'react';
import firebase from '../firebase/firebase';
import PartyDetails from './PartyDetails';
import { Route, Link, NavLink } from "react-router-dom";

class DisplayCookingParties extends Component {
  constructor() {
    super();
    this.state = {

    }
  }
  componentDidMount() {
    
  }
  deleteParty = (e) => {
    //delete the party from firebase
    console.log("deleteParty")
    const firebaseKey = e.target.id;
    console.log(e.target.id);
    const partyRef = firebase.database().ref(`/${firebaseKey}`);
    console.log(partyRef);
    partyRef.remove();
  };
  render() {
    return (
      <div>
        <h1>I am the display cooking parties</h1>
        {Object.entries(this.props.listOfCookingParties).map((party) => {
          console.log(party)
          return (
            <div>
              <Link to={`/party/${party[0]}`}>
                <div key={party[0]} >
                  <h2>{party[1].name}</h2>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    )
  }
}

export default DisplayCookingParties;