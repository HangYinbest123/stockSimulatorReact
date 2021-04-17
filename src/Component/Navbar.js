import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {Button} from "react-bootstrap";
import {Popover} from "react-bootstrap";
import {OverlayTrigger} from "react-bootstrap";
import BalanceCard from "./BalanceCard";
import TotalAssetCard from "./TotalAssetCard";

export default class NavBar extends React.Component {
    getAccountDropDown = ()=>{
        return (
            <OverlayTrigger
                bg="dark"
                trigger="click"
                key={'bottom'}
                placement={'bottom'}
                overlay={
                    <Popover id={`popover-positioned-bottom`}>
                        <Popover.Title as="h3">{`Account`}</Popover.Title>
                        <Popover.Content>
                            <BalanceCard></BalanceCard>
                            <TotalAssetCard ></TotalAssetCard>
                        </Popover.Content>
                    </Popover>
                }
            >
                <Button bg="dark" variant="dark">Account</Button>
            </OverlayTrigger>
        )
    }


    render() {
        let logoutButton;
        let loginButton;
        if(this.props.isUserLogin){
            logoutButton = <Button onClick={this.props.onLogoutSuccessfullyChange} bg="dark" variant="dark">Logout</Button>;
        }else{
            loginButton = <Button onClick={this.props.onShowLoginModal} bg="dark" variant="dark">Login</Button>;
        }
        // let accountDropDown = this.getAccountDropDown();
        return (
            <Navbar bg="dark" variant="dark" className="justify-content-center">
                <Nav className="ml-auto">
                    {logoutButton}
                    {loginButton}
                </Nav>

            </Navbar>
        );
    }
}

