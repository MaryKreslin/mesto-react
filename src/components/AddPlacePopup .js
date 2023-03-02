import React from "react";
import PopupWithForm from "./PopupWithForm";


function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleChangeName(event) {
    setName(event.target.value)
  }

  function handleChangeLink(event) {
    setLink(event.target.value)
  }

  function handleAddPlaceSubmit(event) {
    event.preventDefault();
    props.onAddPlace(name, link)
  }

  return (
    <PopupWithForm title='Новое место' name='add'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleAddPlaceSubmit}
      children=<fieldset className="popup__fieldset">
        <div className="popup__field">
          <input type="text" className="popup__item popup__item_el_name" id="place-name" name="name"
            placeholder="Название" minLength="2" maxLength="30" value={name} onChange={handleChangeName} required />
          <p className="popup__error place-name-error"></p>
        </div>
        <div className="popup__field">
          <input type="url" className="popup__item popup__item_el_about" id="place-link" name="link"
            placeholder="Ссылка на картинку" value={link} onChange={handleChangeLink} required />
          <p className="popup__error place-link-error"></p>
        </div>
        <button type="submit" className="popup__save-button">Создать</button>
      </fieldset>
    />
  )
}
export default AddPlacePopup;
