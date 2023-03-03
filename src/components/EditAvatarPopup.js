import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const [avatar, setAvatar] = React.useState('');
  const avatarRef = React.useRef();

  function handleChangeAvatar(event) {
    setAvatar(event.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    setAvatar('');
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
        <button type="submit" className="popup__save-button">{props.saveButton}</button>
      </fieldset>
    />
  )

}
export default EditAvatarPopup;
