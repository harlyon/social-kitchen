import React, {Component} from 'react';
import firebase from 'firebase';

class ShowDishDetails extends Component {
  constructor() {
    super()
    this.state = {
      currentDish: {}
    }
  }
  componentDidMount() {
    const dishRef = firebase.database().ref(`/${this.props.match.params.party_id}/dishes/${this.props.match.params.dish_id}`)
    dishRef.on('value', (snapshot) => {
      this.setState({
        currentDish: snapshot.val()
      })
    })
  }
  render() {
    return (
      <h1>I am the show dish details page for {this.state.currentDish.name}</h1>
    )
  }
}

export default ShowDishDetails;