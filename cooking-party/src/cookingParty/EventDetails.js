import React, {Component} from 'react';
import firebase from '../firebase/firebase.js';
import SearchForRecipe from '../recipes/SearchForRecipe';
import { Link } from "react-router-dom";
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
    const dishFirebaseKey = e.target.id;
    const dishRef = firebase.database().ref(`/${this.state.firebaseKey}/dishes/${dishFirebaseKey}`);
    dishRef.remove();
  }
  printDishes = () => {
    return (
      Object.entries(this.state.partyDetails.dishes).map((dish) => {
        return (
          <div className="eventDishList clearfix" key={dish[0]}>
            <div className="dishLink">
              <Link to={`/${this.state.firebaseKey}/dishes/${dish[0]}`} className="eventDishName">{dish[1].name}</Link>
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
      <div className="eventDetails">
        <div className="wrapper clearfix">
            <aside className="eventDetailsSection">
              <div className="eventDetailsSection-wrapper">
                <h2 className="eventDetails--title">{this.state.partyDetails.name}</h2>
                <p><span className="sub__text--eventDetails">Created by:</span> {this.state.partyDetails.creator}</p>
                <p><span className="sub__text--eventDetails">Date:</span> {this.state.partyDetails.date}</p>
                {
                  this.state.partyDetails.email && (
                    <div>
                    <p className="sub__text"><span className="sub__text--eventDetails">Invited:</span></p>
                      <ul>
                        {this.state.partyDetails.email.map((person) => {
                          return (
                            <li className="detail__text detail__text--invited" key={person}>{person}</li>
                            )
                          })}
                      </ul>
                    </div>
                  )
                }
              </div>
            </aside>
            <div className="event__main clearfix"> 
              <SearchForRecipe firebaseKey={this.state.firebaseKey} />
              <h2>Dishes</h2>
              {!this.state.partyDetails.dishes && (<p>There aren't any dishes yet! Let's add some!</p>)}
              {this.state.partyDetails.dishes && this.printDishes()}
              {<EventCommentSection firebaseKey={this.state.firebaseKey} user={this.props.user}/>}
            </div>
        </div>
      </div>
    )
  }
}

export default EventDetails;