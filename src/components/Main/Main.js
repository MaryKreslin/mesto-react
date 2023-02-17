import React from 'react';
import api from '../../utils/Api';
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            userDescription: '',
            userAvatar: ''
        }
    }
    componentDidMount() {
        api.getUserInfo()
            .then((data) => {
                this.setState({
                    userName: data.name,
                    userDescription: data.about,
                    userAvatar: data.avatar
                })
            })
    }
    render() {
        return (
            <main className="content">
                <section className="profile">
                    <div className="profile__avatar-block" onClick={this.props.onEditAvatar}>
                        <img className="profile__avatar" src={this.state.userAvatar} alt="" />
                    </div>
                    <div className="profile__info">
                        <div className="profile__string">
                            <h1 className="profile__name">{this.state.userName}</h1>
                            <button className="profile__edit-button" type="button" onClick={this.props.onEditProfile}></button>
                        </div>
                        <p className="profile__about">{this.state.userDescription}</p>
                    </div>
                    <button className="profile__add-button" type="button" onClick={this.props.onAddPlace}></button>
                </section>

                <section className="elements">

                </section>
            </main>
        )
    }
}

export default Main;