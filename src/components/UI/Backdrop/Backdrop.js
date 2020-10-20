import React from 'react';
import classes from './Backdrop.module.css';

const backdrop = (props) => {

    let bp = null;
    if (props.show) {
        bp = <div className={classes.Backdrop} onClick={props.clicked}></div>;
    }
    return (bp);
}

export default backdrop;