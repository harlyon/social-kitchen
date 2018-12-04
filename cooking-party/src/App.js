import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  apiCall = () => {
    axios.get('https://api.yummly.com/v1/api/recipes?_app_id=df8e14a9&_app_key=a3cc287f6d68e263afd8945e586bea51&q=chicken', {
    }).then((res) => {
      console.log(res)
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const recipe = e.target.value;
    console.log(recipe);
  }
  render() {
    return (
      <div className="App">
        {this.apiCall()}
        <form action="">
          <input type="text" id="ingredient"/>
          <label htmlFor="ingredient"></label>
          <input type="submit" id="submit"/>
          <label htmlFor="submit" onSubmit={this.handleSubmit}></label>
        </form>
      </div>
    );
  }
}

export default App;
