import React from "react";
class PopupWithForm extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    if (this.props.isOpen) {
      return (
        <div className={`popup popup_type_${this.props.name} popup_opened`}>
          <form className="popup__content" name={this.props.name}>
            <button aria-label="Закрыть" className="popup__close-button" type="button" onClick={this.props.onClose}></button>
            <h2 className="popup__title">{this.props.title}</h2>
            {this.props.children}
          </form>
        </div>
      )
    }
  }
}
export default PopupWithForm;