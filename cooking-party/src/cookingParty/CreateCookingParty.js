import React, { Component }from 'react';
import firebase from '../firebase/firebase';
import DisplayCookingParties from './DisplayCookingParties';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const dbRef = firebase.database().ref();

class CreateCookingParty extends Component {
  constructor() {
    super();
    this.state = {
      makePartyName: '',
      makePartyDate: '',
      makePartyEmail: [],
      listOfCookingParties: {}
    }
  }
  componentDidMount() {
    dbRef.on("value", snapshot => {
      const newPartyList = snapshot.val() === null ? {} : snapshot.val();
      console.log(newPartyList);

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
    const emailArray = this.state.makePartyEmail.split(', ');
    const newParty = {
      name: this.state.makePartyName,
      date: this.state.makePartyDate,
      email: emailArray,
    }
    dbRef.push(newParty);
    this.setState({
      makePartyName: '',
      makePartyDate: '',
      makePartyEmail: [],
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
      <div>
        <h1>Create Cooking Party</h1>
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
          <input type="submit"/>
        </form>
  
        <DisplayCookingParties listOfCookingParties={this.state.listOfCookingParties}/>
      </div>

      

    )
  }
}

export default CreateCookingParty;