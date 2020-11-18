import React from 'react';
import logoImage from '../../assets/img/burger-logo.png';
import classes from './Logo.module.css';

const logo = props => {
    return (
        <div className={classes.Logo}>
            <img src={logoImage} alt="MCFranco" />
        </div>
    );
}

export default logo;