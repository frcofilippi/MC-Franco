import React from 'react'
import classes from './BuildControl.module.css'


const buildControl = (props) => {
    return (
        <div className={classes.BuildControl}>
            <label className={classes.Label}>{props.label}</label>
            <button className={classes.Less} onClick={() => props.lessClicked(props.type)} disabled={props.disabled}>Less</button>
            <button className={classes.More} onClick={() => props.moreClicked(props.type)}>More</button>
        </div>
    );
}

export default buildControl;