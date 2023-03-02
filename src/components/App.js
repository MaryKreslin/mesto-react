import React from "react";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup ";
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
      .catch((err) => console.log(err))
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
      .catch((err) => console.log(err))
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
        .catch((err) => console.log(err))
    } else {
      api.putLike(card._id)
        .then((data) => {
          this.setCard(data)
        })
        .catch((err) => console.log(err))
    }
  }

  handleCardDelete = (card) => {
    api.deleteCard(card._id)
      .then((data) => {
        const newCards = this.state.cards.filter(item => item._id !== card._id);
        this.setState({ cards: newCards })
      })
      .catch((err) => console.log(err))
  }

  handleUpdateUser = (name, about) => {
    api.patchUserInfo(name, about)
      .then((data) => {
        this.setState({ currentUser: data })
      })
      .catch((err) => console.log(err))
    this.closeAllPopups();
  }

  handleUpdateAvatar = (newAvatar) => {
    api.pacthAvatarImg(newAvatar)
      .then((data) => {
        this.setState(prevState => ({ currentUser: { ...prevState.currentUser, avatar: data.avatar } }))
      })
      .catch((err) => console.log(err))
    this.closeAllPopups();
  }

  handleAddPlace = (name, link) => {
    api.addNewCard(name, link)
      .then((data) => {
        const newCard = {
          _id: data._id,
          link: data.link,
          name: data.name,
          likes: data.likes,
          likesCount: data.likes.length,
          ownerId: data.owner._id
        }
        this.setState(prevState => ({ cards: [newCard, ...prevState.cards] }))
      })
      .catch((err) => console.log(err))
    this.closeAllPopups();
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
          <EditProfilePopup
            isOpen={this.state.isEditProfilePopupOpen}
            onClose={this.closeAllPopups}
            onUpdateUser={this.handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={this.state.isAddPlacePopupOpen}
            onClose={this.closeAllPopups}
            onAddPlace={this.handleAddPlace}
          />
          <EditAvatarPopup
            isOpen={this.state.isEditAvatarPopupOpen}
            onClose={this.closeAllPopups}
            onUpdateAvatar={this.handleUpdateAvatar}
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
