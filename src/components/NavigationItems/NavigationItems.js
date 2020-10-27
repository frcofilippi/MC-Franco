import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = (props) => {
    return (
        <ul className={classes.NavItems}>
            <NavigationItem href={"/"} clicked={props.clicked}>Burger</NavigationItem>
            {/* <NavigationItem href={"/checkout"}>Checkout</NavigationItem>  */}
            <NavigationItem href={"/orders"} clicked={props.clicked}>Orders</NavigationItem>
            {/* TODO - this link will be ORDERS (lits orders) */}
        </ul>
    );
}

export default navigationItems;
