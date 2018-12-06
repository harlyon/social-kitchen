import React, {Component} from 'react';
import { Route, Link, NavLink } from "react-router-dom";
import firebase from '../firebase/firebase.js';

// `/${this.props.match.params.party_id}`
// const dbRef = firebase.database().ref();
// console.log(dbRef);


class PartyDetails extends Component {
  constructor() {
    super();
    this.state = {
      partyDetails: {}
    }
  }
  componentDidUpdate(prevProps) {
    const dbRef = firebase.database().ref(`/${this.props.match.params.party_id}`);
    if (this.props.match.params.party_id !== prevProps.match.params.party_id) {
      dbRef.on('value', (snapshot) => {
        this.setState({
          partyDetails: snapshot.val() || {}
        })
      })
    }
  }
  render() {
    return (
      <div>
        <h1>This is the party details page for {this.props.match.params.party_id}</h1>
        <p>{this.state.partyDetails.name}</p>

      </div>
    )
  }
}

export default PartyDetails;