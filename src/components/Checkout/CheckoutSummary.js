import React from 'react';
import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';
import classes from './CheckoutSummary.module.css';


const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h3>Hope this tastes well!</h3>
            <Burger burgerIngredients={props.burgerIngredients} />
            <div className={classes.Controls}>
                <Button type='danger' clicked={props.cancelClicked}>CANCEL</Button>
                <Button type='success' clicked={props.continueClicked}>CONTINUE</Button>
            </div>
        </div>
    );
}

export default checkoutSummary;