import React from "react";
class ImagePopup extends React.Component {
    render() {
        return (
            <div className="popup popup_type_image">
                <form className="popup__content-image" name="ImageCard">
                    <button className="popup__close-button" type="button" aria-label="Закрыть"></button>
                    <figure className="popup__figure">
                        <img className="popup__image" src="#" alt="" />
                        <figcaption className="popup__caption"></figcaption>
                    </figure>
                </form>
            </div>
        )
    }
}
export default ImagePopup;