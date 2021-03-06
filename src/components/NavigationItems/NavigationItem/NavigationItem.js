import React from 'react';
import classes from './NavigationItem.module.css';
import { NavLink } from 'react-router-dom';

const navigationItem = (props) => {
    return (
        <li className={classes.NavItem}>
            <NavLink to={props.href} 
                    activeClassName={classes.active}
                    exact
                    onClick={props.clicked}
                    >{props.children}</NavLink>
        </li>
    );
}

export default navigationItem;