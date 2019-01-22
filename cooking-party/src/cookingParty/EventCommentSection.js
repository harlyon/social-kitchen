import React, { Component } from 'react';
import firebase from 'firebase';
import guestAvatar from '../assets/guest.jpg';

class EventCommentSection extends Component {
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
    const currentDate = this.getDate();
    this.setState({
      date: currentDate,
    })
  }
  getDate = () => {
    const today = new Date();
    const currentDay = today.getDay();
    const currentMonth = today.getMonth();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const year = today.getFullYear();
    const dayOfMonth = today.getDate();
    return `${days[currentDay]} ${months[currentMonth]} ${dayOfMonth}, ${year}`
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const name = this.props.user.displayName || 'Guest';
    const nameArray = name.split(' ');
    const tempNewNameArray = []
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
      <div className="eventCommentSection">
        <form action="" className="commentSection" onSubmit={this.handleSubmit}>

          <label htmlFor="comment" className="visuallyhidden">Comment: </label>
          <textarea type="textarea" id="comment" value={this.state.comment} onChange={this.handleChange} className="comment" cols="40" rows="3" placeholder="Post a Comment" />

          <input type="submit" className="BTN__submit--comment" value="Post" />
        </form>
        {
          this.state.newPost &&
          (
            Object.entries(this.state.newPost).map((post) => {
              return (
                <div className="commentPost" key={post[0]}>
                  <div className="commentPostDetails">
                    <div className="commentAvatar">
                      <img
                        src={post[1].avatar}
                        alt={this.props.user.photoURL ? post[1].name : 'Guest'}
                        className="commentAvatar--img"/>
                    </div>
                    <div className="commentDetails">
                      {this.props.user.photoURL ? <p className="sub__text">{post[1].name}</p> : <p className="sub__text" style={{paddingLeft:'30px'}}>{post[1].name}</p>}
                      <p className="detail__text detail__text--date">{post[1].date}</p>
                    </div>
                  </div>
                  <div className="commentPosted">
                    <p>{post[1].comment}</p>
                  </div>
                </div>
              )
            })
          )
        }

      </div>
    )
  }
}

export default EventCommentSection;