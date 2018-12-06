import React, { Component } from 'react';
import firebase from 'firebase';

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
            <div key={party[0]} >
              <h2>{party[1].name}</h2>
              <p>Date:{party[1].date}</p>
              <button id={party[0]} onClick={this.deleteParty}>Delete This Party</button>
            </div>
          );
        })}
      </div>
    )
  }
}

export default DisplayCookingParties;