import React from 'react';
import GoogleLogin from 'react-google-login';


export default class Login extends React.Component {

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
            <GoogleLogin
                clientId="632331231557-utvqe8utmdfqd779sj892h04356nm3j7.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={this.successResponseGoogle}
                onFailure={this.failureResponseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        );
    }

}
