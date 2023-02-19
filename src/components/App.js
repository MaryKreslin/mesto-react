import React from "react";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import '../index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      selectedCard: {}
    }
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
    //console.log(this.state.selectedCard)
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
      <body className="page">
        <Header />
        <Main onEditProfile={this.handleEditProfileClick}
          onAddPlace={this.handleAddPlaceClick}
          onEditAvatar={this.handleEditAvatarClick}
          onCardClick={this.handleCardClick} />
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
    )
  };
}

export default App;
