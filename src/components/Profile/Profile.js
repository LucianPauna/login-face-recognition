import React from 'react';
import './Profile.css';

class Profile extends React.Component {

    deleteAccount = () => {
        fetch('https://hidden-bayou-04591.herokuapp.com/delete', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.props.user.email,
            })
        })
            .then(() => {
                this.props.onRouteChange('signin');
            })
    }

    render() {
        const { user } = this.props;
        return (
            <div className="Profile">
                <div className="Profile-inner">
                    <h2>{user.name}</h2> 
                    <p>Email: {user.email}</p>
                    <p>Entries: {user.entries}</p>
                    <p>Joined: {user.joined}</p>
                    <input type="submit" value="Delete Account" onClick={this.deleteAccount} />
                </div>
            </div>
        )
    }
}

export default Profile;