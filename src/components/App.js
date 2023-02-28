import React from "react";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import '../index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      selectedCard: {},
      currentUser: {},
      cards: []
    }
  }

  componentDidMount() {
    api.getUserInfo()
      .then((data) => {
        this.setState({ currentUser: data })
      })
    api.getCardsInfo()
      .then((data) => {
        const newCards = data.map((card) => {
          return {
            _id: card._id,
            link: card.link,
            name: card.name,
            likes: card.likes,
            likesCount: card.likes.length,
            ownerId: card.owner._id
          }
        })
        this.setState({ cards: newCards })
      })
  }

  handleEditAvatarClick = () => {
    this.setState({ isEditAvatarPopupOpen: true })
  }
  handleEditProfileClick = () => {
    this.setState({ isEditProfilePopupOpen: true })

  }
  handleAddPlaceClick = () => {
    this.setState({ isAddPlacePopupOpen: true })
  }

  handleCardClick = (data) => {
    this.setState({ selectedCard: data })

  }

  setCard = (data) => {
    const newCard = {
      _id: data._id,
      link: data.link,
      name: data.name,
      likes: data.likes,
      likesCount: data.likes.length,
      ownerId: data.owner._id
    }

    const newCards = this.state.cards.map((item) => {
      if (item._id === data._id) { return newCard } else { return item }
    })
    this.setState({ cards: newCards })
  }

  handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === this.state.currentUser._id);
    if (isLiked) {
      api.deleteLike(card._id)
        .then((data) => {
          this.setCard(data)
        })
    } else {
      api.putLike(card._id)
        .then((data) => {
          this.setCard(data)
        })
    }
  }
  handleCardDelete = (card) => {
    api.deleteCard(card._id)
    .then((data) => {
      const newCards = this.state.cards.filter(item=> item._id !== card._id);
      this.setState({ cards: newCards })
    })
  }

  closeAllPopups = () => {
    this.setState({
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      selectedCard: {}
    })
  }

  render() {
    return (
      <CurrentUserContext.Provider value={this.state.currentUser}>
        <body className="page">
          <Header />
          <Main cards={this.state.cards}
            onEditProfile={this.handleEditProfileClick}
            onAddPlace={this.handleAddPlaceClick}
            onEditAvatar={this.handleEditAvatarClick}
            onCardClick={this.handleCardClick}
            onLikeClick={this.handleCardLike}
            onCardDelete={this.handleCardDelete}
          />
          <Footer />
          <PopupWithForm title='Редактировать профиль' name='edit'
            isOpen={this.state.isEditProfilePopupOpen}
            onClose={this.closeAllPopups}
            children=<fieldset className="popup__fieldset">
              <div className="popup__field">
                <input type="text" className="popup__item popup__item_el_name" id="avatar-name" name="avatar-name"
                  placeholder="Имя" minLength="2" maxLength="40" required />
                <p className="popup__error avatar-name-error"></p>
              </div>
              <div className="popup__field">
                <input type="text" className="popup__item popup__item_el_about" id="avatar-about" name="avatar-about"
                  placeholder="Вид деятельности" minLength="2" maxLength="200" required />
                <p className="popup__error avatar-about-error"></p>
              </div>
              <button type="submit" className="popup__save-button">Сохранить</button>
            </fieldset>
          />
          <PopupWithForm title='Новое место' name='add'
            isOpen={this.state.isAddPlacePopupOpen}
            onClose={this.closeAllPopups}
            children=<fieldset className="popup__fieldset">
              <div className="popup__field">
                <input type="text" className="popup__item popup__item_el_name" id="place-name" name="place-name"
                  placeholder="Название" minLength="2" maxLength="30" required />
                <p className="popup__error place-name-error"></p>
              </div>
              <div className="popup__field">
                <input type="url" className="popup__item popup__item_el_about" id="place-link" name="place-link"
                  placeholder="Ссылка на картинку" required />
                <p className="popup__error place-link-error"></p>
              </div>
              <button type="submit" className="popup__save-button">Создать</button>
            </fieldset>
          />
          <PopupWithForm title='Обновить аватар' name='editAvatarPhoto'
            isOpen={this.state.isEditAvatarPopupOpen}
            onClose={this.closeAllPopups}
            children=<fieldset className="popup__fieldset">
              <div className="popup__field">
                <input type="url" className="popup__item popup__item_el_about" id="avatar" name="avatar"
                  placeholder="Ссылка на картинку" required />
                <p className="popup__error avatar-error"></p>
              </div>
              <button type="submit" className="popup__save-button">Сохранить</button>
            </fieldset>
          />
          <PopupWithForm title='Вы уверены?' name='confirm' isOpen={false}
            onClose={this.closeAllPopups}
            children=<div>
              <h2 className="popup__title">Вы уверены?</h2>
              <button type="submit" className="popup__save-button">Да</button>
            </div>
          />
          <ImagePopup card={this.state.selectedCard} onClose={this.closeAllPopups} />
        </body>
      </CurrentUserContext.Provider >
    )
  };
}

export default App;
