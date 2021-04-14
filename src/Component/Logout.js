import React from 'react';
import {GoogleLogout} from 'react-google-login';

export default class Logout extends React.Component {


    failureResponseGoogle = (googleUser) => {
        console.log(googleUser);
    }

    render() {
        return (
            <GoogleLogout
                clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                buttonText="Logout"
                onLogoutSuccess={this.props.onLogoutSuccessfullyChange}
            >
            </GoogleLogout>
        );
    }

}
