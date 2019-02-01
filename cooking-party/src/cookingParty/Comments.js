import React, { Component } from 'react';
import firebase from 'firebase';
import guestAvatar from '../assets/guest.jpg';
import swal from 'sweetalert';

const moment = require('moment');
moment().format();

class Comments extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      comment: '',
      date: '',
      newPost: {}
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.firebaseKey !== prevProps.firebaseKey && this.props.firebaseKey !== null) {
      const dbRef = firebase.database().ref(`/${this.props.firebaseKey}/comments`);
      dbRef.on('value', (snapshot) => {
        this.setState({
          newPost: snapshot.val()
        })
      })
    }
  }
  componentDidMount() {
    const currentDate = moment().format('dddd, MMMM Do, YYYY');
    this.setState({
      date: currentDate,
    })
    const dbRef = firebase.database().ref(`/${this.props.firebaseKey}/comments`);
    dbRef.on('value', (snapshot) => {
      this.setState({
        newPost: snapshot.val()
      })
    })
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.comment === '') {
      swal(`Why don't you say what's on your mind?`);
      return null;
    }
    const name = this.props.user.displayName || 'Guest';
    const nameArray = name.split(' ');
    const tempNewNameArray = [];
    for (let i in nameArray) {
      tempNewNameArray.push(nameArray[i].charAt(0).toUpperCase() + nameArray[i].slice(1));
    }
    const finalName = tempNewNameArray.join(' ');
    const comment = {
      name: finalName,
      comment: this.state.comment,
      date: this.state.date,
      avatar: this.props.user.photoURL ? this.props.user.photoURL : guestAvatar
    }
    const commentRef = firebase.database().ref(`/${this.props.firebaseKey}/comments`)
    commentRef.push(comment);
    this.setState({
      name: '',
      comment: ''
    })
  }
  render() {
    return (
      <div className="comment">
        <h2 className="event-details-main__title">Discussion</h2>
        <form action="" className="comment__form" onSubmit={this.handleSubmit}>

          <label htmlFor="comment" className="visuallyhidden">Comment: </label>
          <textarea type="textarea" id="comment" value={this.state.comment} onChange={this.handleChange} className="comment__input" cols="40" rows="3" placeholder="What's happening?" />

          <input type="submit" className="comment__button" value="Post" />
        </form>
        <ul className="comment__list">
          {
            this.state.newPost &&
            (
              Object.entries(this.state.newPost).map((post) => {
                return (
                  <li className="comment__item" key={post[0]}>
                    <div className="comment__post-details">
                      <img
                        src={post[1].avatar}
                        alt={this.props.user.photoURL ? post[1].name : 'Guest'}
                        className="comment__avatar"/>
                      <div className="comment__details-container">
                        <p className="comment__author">{post[1].name}</p>
                        <p className="comment__date">{post[1].date}</p>
                      </div>
                    </div>
                    <p className="comment__post">{post[1].comment}</p>
                  </li>
                )
              })
            )
          }
        </ul>

      </div>
    )
  }
}

export default Comments;