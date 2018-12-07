import React, {Component} from 'react';
import firebase from 'firebase';

class CommentSection extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      comment: '',
      date: '',
      newPost: []
    }
  }
  componentDidUpdate() {
    const dbRef = firebase.database().ref(`/${this.props.firebaseKey}/comments`);
    dbRef.on('value', (snapshot) => {
      this.setState({
        newPost: snapshot.val()
      })
    })
  }
  componentDidMount() {
    const currentDate = this.getDate();
    this.setState({
      date: currentDate
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
    const comment = {
      name: this.state.name,
      comment: this.state.comment,
      date: this.state.date,
    }
    const dbRef = firebase.database().ref(`/${this.props.firebaseKey}/comments`)
    dbRef.push(comment);
    this.setState({
      name: '',
      comment: ''
    })
  }
  // printComments = () => {
  //   const dbRef = firebase.database().ref(`/${this.props.firebaseKey}/comments`);
  //   dbRef.on('value', (snapshot) => {
  //     this.setState({
  //       newPost: snapshot.val()
  //     })
  //   })
  // }
  render() {
    return (
      <div>
        <h1>I am the comment section</h1>

        <form action="" className="commentSection" onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={this.state.name} onChange={this.handleChange}/>
          
          <label htmlFor="comment">Comment</label>
          <input type="textarea" id="comment" value={this.state.comment} onChange={this.handleChange}/>

          <input type="submit"/>
        </form>
      </div>
    )
  }
}

export default CommentSection;