import React from 'react';
import GoogleLogin from 'react-google-login';


export default class Logout extends React.Component {

    successResponseGoogle = (googleUser) => {
        console.log(googleUser.getBasicProfile());
        console.log(googleUser.getAuthResponse());
        let id_token = googleUser.getAuthResponse().id_token;
        let userId = googleUser.getBasicProfile().getId();
        this.props.onLoginSuccessfullyChange(userId);
    }
    failureResponseGoogle = (googleUser) => {
        console.log(googleUser);
    }

    render() {
        return (
            <div></div>
        );
    }

}
