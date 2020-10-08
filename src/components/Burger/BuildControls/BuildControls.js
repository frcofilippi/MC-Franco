import React from 'react'

import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const buildControls = (props) => {

    const controls = [
        { label: "Salad", type: 'salad' },
        { label: "Cheese", type: 'cheese' },
        { label: "Meat", type: 'meat' },
        { label: "Bacon", type: 'bacon' }
    ]

    return (
        <div className={classes.ControlPanel}>
            <p>Current Price: <strong>$ {props.totalPrice.toFixed(2)}</strong></p>
            {controls.map(ctrl => (
                <BuildControl 
                key={ctrl.label} 
                label={ctrl.label} 
                type={ctrl.type} 
                lessClicked={props.lessButtonClicked}
                moreClicked={props.moreButtonClicked}
                disabled={props.disabledInfo[ctrl.type]} />
            ))}
            <button 
            disabled={!props.purchasable}
            className={classes.CheckoutButton}
            onClick={props.purchasing}>CHECKOUT</button>
        </div>
    );
}

export default buildControls;