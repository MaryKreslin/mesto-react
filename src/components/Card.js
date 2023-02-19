import React from 'react';

class Card extends React.Component {
    constructor(props) {
        super(props);
    }
    handleClick = () => {
        this.props.onCardClick(this.props.data)
    }

    render() {
        return (
            <div className="element" key={this.props.data.id}>
                <button className="element__trash" type="button"></button>
                <img className="element__image" src={this.props.data.link} alt={this.props.data.name} onClick={this.handleClick} />
                <div className="element__title">
                    <p className="element__text">{this.props.data.name}</p>
                    <div className="element__block-like">
                        <button className="element__like" type="button"></button>
                        <p className="element__count-like">{this.props.data.likes}</p>
                    </div>
                </div>
            </div>
        )
    }
}
export default Card;