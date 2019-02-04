import React, {Component} from 'react';
import firebase from 'firebase';
import { Link } from "react-router-dom";

class ShowDishDetailsInEvent extends Component {
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
      <React.Fragment>
        <div className="wrapper">
          <div className="dish">
            <h2 className="dish__title">{this.state.currentDish.name}</h2>
            <div className="dish__container">
              <aside className="dish__aside">
                <img src={this.state.currentDish.image} alt={this.state.currentDish.name} className="dish__image" />
                <p className="dish__servings"><span>Number of servings: </span> {this.state.currentDish.servings}</p>
                <div className="dish__buttons-container">
                  <Link to={`/${this.props.match.params.party_id}`} className="dish__back-button"><i className="fas fa-arrow-left"></i></Link>
                  <a href={this.state.currentDish.source} target="_blank" rel="noopener noreferrer" className="dish__directions-button">Directions</a>
                </div>
              </aside>
              <section className="dish__main">
                <h3 className="dish__ingredients-title">Ingredients</h3>
                <ul className="dish__ingredients-list">
                  {this.state.currentDish.ingredients &&
                    (
                      this.state.currentDish.ingredients.map((ingredient) => {
                        return (
                          <li className="dish__ingredients-item" key={ingredient}>{ingredient}</li>
                        )
                      })
                    )}
                </ul>
              </section>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default ShowDishDetailsInEvent;