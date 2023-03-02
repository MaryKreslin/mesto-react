import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmPopup(props) {

  function onConfirm(event) {
    event.preventDefault();
    props.onConfirmSubmit(props.cardToDelete)
  }

  return (
    <PopupWithForm title='Вы уверены?' name='confirm'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={onConfirm}
      children=<fieldset className="popup__fieldset">
        <button type="submit" className="popup__save-button">Да</button>
      </fieldset>
    />
  )
}
export default ConfirmPopup;
