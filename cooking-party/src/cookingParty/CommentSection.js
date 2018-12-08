import React, {Component} from 'react';
import firebase from 'firebase';

class CommentSection extends Component {
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
    const comment = {
      name: this.state.name,
      comment: this.state.comment,
      date: this.state.date,
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
      <div>
        <h1>I am the comment section</h1>

        <form action="" className="commentSection" onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={this.state.name} onChange={this.handleChange}/>
          
          <label htmlFor="comment">Comment</label>
          <input type="textarea" id="comment" value={this.state.comment} onChange={this.handleChange}/>

          <input type="submit"/>
        </form>
        {Object.entries(this.state.newPost).map((post) => {
          return (
            <div key={post[0]}>
              <h2>{post[1].name}</h2>
              <p>{post[1].date}</p>
              <p>{post[1].comment}</p>
            </div>
          )
        })}
      </div>
    )
  }
}

export default CommentSection;