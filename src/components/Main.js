import React from 'react';
import api from '../utils/Api';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

class Main extends React.Component {
  static contextType = CurrentUserContext;
  constructor(props) {
    super(props);
  /*  this.state = {
      cards: []
    }*/
  }
  /*componentDidMount() {
    api.getCardsInfo()
      .then((data) => {
        const newCards = data.map((card) => {
          return {
            id: card._id,
            link: card.link,
            name: card.name,
            likes: card.likes,
            likesCount: card.likes.length,
            ownerId: card.owner._id
          }
        })
        this.setState({ cards: newCards })
      })
  }*/

  render() {
    return (
      <main className="content">
        <section className="profile">
          <div className="profile__avatar-block" onClick={this.props.onEditAvatar}>
            <img className="profile__avatar" src={this.context.avatar} alt="" />
          </div>
          <div className="profile__info">
            <div className="profile__string">
              <h1 className="profile__name">{this.context.name}</h1>
              <button className="profile__edit-button" type="button" onClick={this.props.onEditProfile}></button>
            </div>
            <p className="profile__about">{this.context.about}</p>
          </div>
          <button className="profile__add-button" type="button" onClick={this.props.onAddPlace}></button>
        </section>
        <section className="elements">
          {this.props.cards.map((card) => {
            return <Card key={card._id}
            data={card}
            onCardClick={this.props.onCardClick}
            onCardLike={this.props.onLikeClick}/>
          })
          }
        </section>
      </main>
    )
  }
}

export default Main;
