import React from 'react';
import classes from './Toggle.module.css';

const toggle = (props) => {

    const toggleButtonClasses = [];
    toggleButtonClasses.push(classes.ToggleButton);
    if (props.active) {
        toggleButtonClasses.push(classes.Active)
    }

    return (
        <div onClick={props.toggleClicked} className={classes.Container}>
            <label className={classes.Label}>{props.label}</label>
            <div className={toggleButtonClasses.join(' ')}>
                <div className={classes.InnerCircle}></div>
            </div>
        </div>
    );
}

export default toggle;