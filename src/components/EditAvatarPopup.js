import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditAvatarPopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [avatar, setAvatar] = React.useState(currentUser.avatar);
  const avatarRef = React.useRef();

  React.useEffect(() => { setAvatar(currentUser.avatar) }, [currentUser]);

  function handleChangeAvatar(event) {
    setAvatar(event.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar(avatarRef.current.defaultValue)
  }

  return (
    <PopupWithForm title='Обновить аватар' name='editAvatarPhoto'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      children=<fieldset className="popup__fieldset">
        <div className="popup__field">
          <input ref={avatarRef} type="url" className="popup__item popup__item_el_about" id="avatar" name="avatar"
            placeholder="Ссылка на картинку" value={avatar} onChange={handleChangeAvatar} required />
          <p className="popup__error avatar-error"></p>
        </div>
        <button type="submit" className="popup__save-button">Сохранить</button>
      </fieldset>
    />
  )

}
export default EditAvatarPopup;
