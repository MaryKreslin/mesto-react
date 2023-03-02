import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.about);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]
  );

  function handleChangeName(event) {
    setName(event.target.value)
  }

  function handleChangeDescription(event) {
    setDescription(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateUser(name, description);
  }

  return (
    <PopupWithForm title='Редактировать профиль' name='edit'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      children=<fieldset className="popup__fieldset">
        <div className="popup__field">
          <input type="text" className="popup__item popup__item_el_name" id="avatar-name" name="name"
            placeholder="Имя" minLength="2" maxLength="40" required value={name} onChange={handleChangeName} />
          <p className="popup__error avatar-name-error"></p>
        </div>
        <div className="popup__field">
          <input type="text" className="popup__item popup__item_el_about" id="avatar-about" name="description"
            placeholder="Вид деятельности" minLength="2" maxLength="200" required value={description} onChange={handleChangeDescription} />
          <p className="popup__error avatar-about-error"></p>
        </div>
        <button type="submit" className="popup__save-button">Сохранить</button>
      </fieldset>
    />)
}

export default EditProfilePopup;

