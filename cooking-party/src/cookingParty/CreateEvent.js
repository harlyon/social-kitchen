import React, { Component }from 'react';
import firebase from '../firebase/firebase';
import DisplayEvents from './DisplayEvents';

const dbRef = firebase.database().ref();

class CreateEvent extends Component {
  constructor() {
    super();
    this.state = {
      makePartyName: '',
      makePartyDate: '',
      makePartyEmail: [],
      dishes: {},
      listOfCookingParties: {}
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
    const newParty = {
      name: this.state.makePartyName,
      date: this.state.makePartyDate,
      email: emailArray,
      dishes: this.state.dishes,
      // JONATHAN'S CHANGE
      creator: this.props.user.displayName
      // JONATHAN'S CHANGE
    }
    dbRef.push(newParty);
    this.setState({
      makePartyName: '',
      makePartyDate: '',
      makePartyEmail: []
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  clearForm = (e) => {
    
  }

  render() {
    return (
  
      <div className="createEvent">
      <div className="wrapper">
        <h2>Create Event</h2>
        <form action="" className="createCookingParty" onSubmit={this.handleSubmit}>

          <input
            type="text"
            className="partyForm"
            id="makePartyName"
            required
            onChange={this.handleChange}
            value={this.state.makePartyName}
            placeholder="Event Name"/>
          <label htmlFor="makePartyName"></label>

          <input
            type="date"
            className="partyForm"
            id="makePartyDate"
            required
            onChange={this.handleChange}
            value={this.state.makePartyDate}
             placeholder="Event Date" />
          <label htmlFor="makePartyDate"></label>

          <input
            type="text"
            className="partyForm partyEmail"
            id="makePartyEmail"
            required
            onChange={this.handleChange}
            value={this.state.makePartyEmail}
            pattern="^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$"
            placeholder="Guest Emails (comma seperated)"/>
          <label htmlFor="makePartyEmail"></label>

          <input type="submit" value="Create Event" className="BTN__submit--createEvent" />
        </form>

        <DisplayEvents listOfCookingParties={this.state.listOfCookingParties}/>
        </div>
      </div>

    )
  }
}

export default CreateEvent;