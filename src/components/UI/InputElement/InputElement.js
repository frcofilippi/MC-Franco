import React from 'react';
import classes from './InputElement.module.css';

const inputElement = (props) => {

    let inputElementStyle = [];
    if (!props.valid) {
        inputElementStyle.push(classes.Invalid)
    }

    let element = null;

    switch (props.inputType) {
        case 'input':
            inputElementStyle.push(classes.InputBox);
            element = <input className={inputElementStyle.join(' ')} {...props.elementConfig} value={props.value} onChange={(event) => props.changed(event, props.id)} />
            break;
        case 'dropdown':
            inputElementStyle.push(classes.Dropdown);
            element = (
                <select className={inputElementStyle.join(' ')} value={props.value} onChange={(event) => props.changed(event, props.id)}>
                    {props.elementConfig.options.map(option => {
                        return <option key={option.value} value={option.value}>{option.displayValue}</option>
                    })}
                </select>
            );
            break;
        default:
            break;
    }

    return (
        <div key={props.id} className={classes.InputElement}>
            <label className={classes.Label} hidden={true}>{props.label}</label>
            {element}
        </div>
    );
}

export default inputElement;