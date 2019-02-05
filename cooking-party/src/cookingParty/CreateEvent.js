import React, { Component }from 'react';
import firebase from '../firebase/firebase';
import DisplayEvents from './DisplayEvents';
import swal from 'sweetalert';

const dbRef = firebase.database().ref();

const moment = require('moment');
moment().format();

class CreateEvent extends Component {
  constructor() {
    super();
    this.state = {
      makePartyName: '',
      makePartyDate: '',
      makePartyEmail: [],
      dishes: {},
      listOfCookingParties: {},
    }
  }
  componentDidMount() {
    dbRef.on("value", snapshot => {
      const newPartyList = snapshot.val() === null ? {} : snapshot.val();
      const newState = [];
      for (let itemKey in newPartyList) {
        newPartyList[itemKey].key = itemKey
        newState.push(newPartyList[itemKey])
      }
      this.setState({
        listOfCookingParties: newState
      });
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const emailArray = this.state.makePartyEmail.replace(/\s/g, "").split(',');

    // Capitalize creator's name if signed in
    const name = this.props.user.displayName || 'Guest';
    const nameArray = name.split(' ');
    const tempNewNameArray = [];
    for (let i in nameArray) {
      tempNewNameArray.push(nameArray[i].charAt(0).toUpperCase() + nameArray[i].slice(1));
    }
    const finalName = tempNewNameArray.join(' ');

    // Capitalize party name
    const partyName = this.state.makePartyName;
    const partyNameArray = partyName.split( ' ');
    const tempNewPartyNameArray = [];
    for (let i in partyNameArray) {
      tempNewPartyNameArray.push(partyNameArray[i].charAt(0).toUpperCase() + partyNameArray[i].slice(1));
    }
    const finalPartyName = tempNewPartyNameArray.join(' ');

    // Use moment.js to format date
    const date = moment(this.state.makePartyDate).format('dddd, MMMM Do, YYYY');

    const newParty = {
      name: finalPartyName,
      date: date,
      email: emailArray,
      dishes: this.state.dishes,
      creator: finalName
    }
    dbRef.push(newParty);
    this.setState({
      makePartyName: '',
      makePartyDate: '',
      makePartyEmail: []
    })
    swal(`${finalPartyName}`, `has been created!`);
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  render() {
    return (
      <React.Fragment>
        <div className="wrapper">
          <div className="create-display-event">
            <div className="create-event">
              <h2 className="create-event__title">Create Event</h2>
              <form action="" className="create-event__form" onSubmit={this.handleSubmit}>
                <div className="create-event__form-container">
                  <label htmlFor="makePartyName" className="create-event__label">Event Name</label>
                  <input
                    type="text"
                    className="create-event__input create-event__input--name"
                    id="makePartyName"
                    required
                    onChange={this.handleChange}
                    value={this.state.makePartyName}
                    placeholder="Event Name"/>
                  <label htmlFor="makePartyDate" className="create-event__label">Event Date</label>
                  <input
                    type="date"
                    className="create-event__input create-event__input--date"
                    id="makePartyDate"
                    required
                    onChange={this.handleChange}
                    value={this.state.makePartyDate}
                    placeholder="Event Date" />
                  <label htmlFor="makePartyEmail" className="create-event__label">Guests</label>
                  <input
                    type="text"
                    className="create-event__input create-event__input--email"
                    id="makePartyEmail"
                    required
                    onChange={this.handleChange}
                    value={this.state.makePartyEmail}
                    pattern="^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$"
                    placeholder="Guest Emails (comma seperated)"/>
                </div>
                <input type="submit" value="Create Event" className="create-event__submit" />
              </form>
            </div>
            <DisplayEvents listOfCookingParties={this.state.listOfCookingParties} user={this.props.user}/>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default CreateEvent;