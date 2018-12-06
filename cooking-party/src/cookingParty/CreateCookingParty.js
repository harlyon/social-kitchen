import React, { Component }from 'react';
import firebase from '../firebase';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import UserParties from '../UserParties';

const dbRef = firebase.database().ref();

class CreateCookingParty extends Component {
  constructor() {
    super();
    this.state = {
      makePartyName: '',
      makePartyDate: '',
      makePartyEmail: '',
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const newParty = {
      name: this.state.makePartyName,
      date: this.state.makePartyDate,
      email: this.state.makePartyEmail
    }
    dbRef.push(newParty);
    this.setState({
      makePartyName: '',
      makePartyDate: '',
      makePartyEmail: '',
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
          <input type="text" id="makePartyName" onChange={this.handleChange} value={this.state.makePartyName}/>
          <label htmlFor="makePartyName">Enter Party Name</label>
          <input type="date" id="makePartyDate" onChange={this.handleChange}/>
          <label htmlFor="makePartyDate">Enter date of Party</label>
          <input type="email" id="makePartyEmail" onChange={this.handleChange}/>
          <label htmlFor="makePartyEmail">Enter your one friend's email</label>
          <input type="submit" onClick={this.clearForm}/>
        </form>

        <Link to="/userparties">See Parties!</Link>
        <Route path="/userparties" component={UserParties} />
      </div>

      

    )
  }
}

export default CreateCookingParty;