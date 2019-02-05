import React, {Component} from 'react';
import firebase from '../firebase/firebase.js';
import PrintDishes from './PrintDishes';
import SearchForRecipe from '../recipes/SearchForRecipe';
import Comments from './Comments';

class EventDetails extends Component {
  constructor() {
    super();
    this.state = {
      partyDetails: {},
      firebaseKey: '',
      view: 'dishes'
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
    this.setState({
      view: e.target.value
    })
  }
  render() {
    return (
      <div className="event-details">
        <div className="wrapper">
          <div className="event-details__container">
            <aside className="event-details-aside">
              <div className="wrapper">
                <h2 className="event-details-aside__title">{this.state.partyDetails.name}</h2>
                <p className="event-details-aside__creator"><span>Created by:</span> {this.state.partyDetails.creator}</p>
                <p className="event-details-aside__date"><span>Date:</span> {this.state.partyDetails.date}</p>
                <p className="event-details-aside__invitees"><span>Invited:</span></p>
                {
                  this.state.partyDetails.email && (
                    <ul className="event-details-aside__list">
                      {this.state.partyDetails.email.map((person) => {
                        return (
                          <li className="event-details-aside__item" key={person}>{person}</li>
                        )
                      })}
                    </ul>
                  )
                }
              </div>
            </aside>
            <main className="event-details-main"> 
              <nav className="event-details-main-nav">
                <ul className="event-details-main-nav__list">
                  <li className="event-details-main-nav__item">
                    <button
                      onClick={this.handleClick}
                      className="event-details-main-nav__button"
                      value="dishes">
                      Dishes
                    </button>
                  </li>
                  <li className="event-details-main-nav__item">
                    <button
                      onClick={this.handleClick}
                      className="event-details-main-nav__button"
                      value="search">
                      Recipes
                    </button>
                  </li>
                  <li className="event-details-main-nav__item">
                    <button
                      onClick={this.handleClick}
                      className="event-details-main-nav__button"
                      value="discussion">
                      Discussion
                    </button>
                  </li>
                </ul>
              </nav>
              {this.state.view === 'dishes' &&
                <PrintDishes
                  firebaseKey={this.state.firebaseKey}
                  partyDetails={this.state.partyDetails} />}
              {this.state.view === 'search' &&
                <SearchForRecipe
                  firebaseKey={this.state.firebaseKey} />}
              {this.state.view === 'discussion' &&
                <Comments
                  firebaseKey={this.state.firebaseKey}
                  user={this.props.user} />}
            </main>
          </div>
        </div>
      </div>
    )
  }
}

export default EventDetails;