import React, { Component }from 'react';
import firebase from '../firebase/firebase';
import DisplayEvents from './DisplayEvents';
import swal from 'sweetalert';

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
    // Capitalize creator's name
    const name = this.props.user.displayName;
    const nameArray = name.split(' ');
    const tempNewNameArray = [];
    for (let i in nameArray) {
      tempNewNameArray.push(nameArray[i].charAt(0).toUpperCase() + nameArray[i].slice(1));
    }
    const finalName = tempNewNameArray.join(' ');
    console.log(finalName);

    // Capitalize party name
    const partyName = this.state.makePartyName;
    const partyNameArray = partyName.split( ' ');
    const tempNewPartyNameArray = [];
    for (let i in partyNameArray) {
      tempNewPartyNameArray.push(partyNameArray[i].charAt(0).toUpperCase() + partyNameArray[i].slice(1));
    }
    const finalPartyName = tempNewPartyNameArray.join(' ');
    console.log(finalPartyName);

    const newParty = {
      name: finalPartyName,
      date: this.state.makePartyDate,
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
  
      <div className="createEvent">
      <div className="wrapper">
        <h2>Create Event</h2>
        <form action="" className="createCookingParty" onSubmit={this.handleSubmit}>

          <input
            type="text"
            className="partyForm partyName"
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