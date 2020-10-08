import React from 'react';
import classes from './Button.module.css';


const button = (props) => {

    let buttonClass = [];
    buttonClass.push(classes.Button);

    props.type === 'success' ? buttonClass.push(classes.Success) : buttonClass.push(classes.Cancel);


    return (
        <button className={buttonClass.join(' ')} onClick={props.clicked}>
            {props.children}
        </button>
    );
}

export default button;