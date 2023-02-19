import React from "react";
class ImagePopup extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (Object.entries(this.props.card).length !== 0) {
            return (
                <div className="popup popup_type_image popup_opened">
                    <form className="popup__content-image" name="ImageCard">
                        <button className="popup__close-button" type="button" aria-label="Закрыть"
                            onClick={this.props.onClose}></button>
                        <figure className="popup__figure">
                            <img className="popup__image" src={this.props.card.link} alt={this.props.card.name} />
                            <figcaption className="popup__caption">{this.props.card.name}</figcaption>
                        </figure>
                    </form>
                </div>
            )
        }
    }
}
export default ImagePopup;