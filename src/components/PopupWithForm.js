import React from "react";

function PopupWithForm(props) {

  const [classOpen, setClassOpen] = React.useState("")

  React.useEffect(() => {
    if (props.isOpen) {
      setClassOpen("popup_opened")
    } else { setClassOpen("") }
  }, [props.isOpen])

  return (
    <div className={`popup popup_type_${props.name} ${classOpen}`}>
      <form className="popup__content" name={props.name} onSubmit={props.onSubmit}>
        <button aria-label="Закрыть" className="popup__close-button" type="button" onClick={props.onClose}></button>
        <h2 className="popup__title">{props.title}</h2>
        <fieldset className="popup__fieldset">
          {props.children}
          <button type="submit" className="popup__save-button">{props.saveButtonText}</button>
        </fieldset>
      </form>
    </div>
  )
}

export default PopupWithForm;
