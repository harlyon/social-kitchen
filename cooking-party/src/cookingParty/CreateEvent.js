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
      dishes: this.state.dishes
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
  render() {
    return (
      <div>
        <h1>Create Event</h1>
        <form action="" className="createCookingParty" onSubmit={this.handleSubmit}>
          <input
            type="text"
            id="makePartyName"
            required
            onChange={this.handleChange}
            value={this.state.makePartyName}/>
          <label htmlFor="makePartyName">Enter Party Name</label>

          <input
            type="date"
            id="makePartyDate"
            required
            onChange={this.handleChange}
            value={this.state.makePartyDate}/>
          <label htmlFor="makePartyDate">Enter date of Party</label>

          <input
            type="text"
            id="makePartyEmail"
            required
            onChange={this.handleChange}
            value={this.state.makePartyEmail}
            pattern="^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$"/>
          <label htmlFor="makePartyEmail">Enter emails (comma separated)</label>
          <input type="submit" value="Create Party"/>
        </form>
        <DisplayEvents listOfCookingParties={this.state.listOfCookingParties}/>
      </div>
    )
  }
}

export default CreateEvent;