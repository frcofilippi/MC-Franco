import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = (props) => {

    const loggedIn = (<NavigationItem href={"/auth"} clicked={props.clicked}>Login</NavigationItem>);
    const loggedOut = (<NavigationItem href={"/auth/logout"} clicked={props.clicked}>Logout</NavigationItem>);

    return (
        <ul className={classes.NavItems}>
            <NavigationItem href={"/"} clicked={props.clicked}>Burger</NavigationItem>
            {props.authenticated ? <NavigationItem href={"/orders"} clicked={props.clicked}>Orders</NavigationItem> : null}
            {props.authenticated ? loggedOut : loggedIn}
        </ul>
    );
}

export default navigationItems;
