import React, {Component} from 'react';
import firebase from '../firebase/firebase.js';
import SearchForRecipe from '../recipes/SearchForRecipe';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import EventCommentSection from './EventCommentSection';

class EventDetails extends Component {
  constructor() {
    super();
    this.state = {
      partyDetails: {},
      firebaseKey: ''
    }
  }
  componentDidMount() {
    const dbRef = firebase.database().ref(`/${this.props.match.params.party_id}`);
    dbRef.on('value', (snapshot) => {
      this.setState({
        partyDetails: snapshot.val() || {},
        firebaseKey: this.props.match.params.party_id
      })
    })
  }
  componentDidUpdate(prevProps) {
    const dbRef = firebase.database().ref(`/${this.props.match.params.party_id}`);
    if (this.props.match.params.party_id !== prevProps.match.params.party_id) {
      dbRef.on('value', (snapshot) => {
        this.setState({
          partyDetails: snapshot.val() || {},
          firebaseKey: this.props.match.params.party_id
        })
      })
    }
  }
  handleClick = (e) => {
    // delete dish from firebase
    const dishFirebaseKey = e.target.id;
    const dishRef = firebase.database().ref(`/${this.state.firebaseKey}/dishes/${dishFirebaseKey}`);
    dishRef.remove();
  }
  printDishes = () => {
    return (
      Object.entries(this.state.partyDetails.dishes).map((dish) => {
        // console.log(dish);
        return (
          <div>
            <Link to={`/${this.state.firebaseKey}/dishes/${dish[0]}`}>{dish[1].name}</Link>
            <button onClick={this.handleClick} id={dish[0]}>DELETE</button>
          </div>
        )
      })
    )
  }
  render() {
    return (
      <div className="eventDetails">
        <h2>{this.state.partyDetails.name}</h2>
        <p>Date: {this.state.partyDetails.date}</p>
        {
          this.state.partyDetails.email && (
            <div>
              <p>Invitees:</p>
              <ul>
                {this.state.partyDetails.email.map((person) => {
                  return (
                    <li>{person}</li>
                  )
                })}
              </ul>
            </div>
          )
        }
        {this.state.partyDetails.dishes ? this.printDishes() : null}
        {<SearchForRecipe firebaseKey={this.state.firebaseKey}/>}
        {<EventCommentSection firebaseKey={this.state.firebaseKey} user={this.props.user}/>}
      </div>
    )
  }
}

export default EventDetails;