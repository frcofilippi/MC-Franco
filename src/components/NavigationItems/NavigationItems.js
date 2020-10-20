import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = (props) => {
    return (
        <ul className={classes.NavItems}>
            <NavigationItem href={"/"}>Burger</NavigationItem>
            <NavigationItem href={"/"}>Order</NavigationItem>
        </ul>
    );
}

export default navigationItems;
