import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {

    const ingredients = Object.keys(props.ingredients)
        .map(ingrKey => {
            return (<li key={ingrKey}><span style={{ textTransform: 'capitalize' }}>{ingrKey}: {props.ingredients[ingrKey]}</span></li>);
        });

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>Ingredients of your burger:</p>
            <ul>
                {ingredients}
            </ul>
            <p><strong>Total: ${props.price.toFixed(2)}</strong></p>
            <Button clicked={props.purchaseCanceled} type={'cancel'}>CANCEL</Button>
            <Button clicked={props.continueClicked} type={'success'}>CONTINUE</Button>
        </Aux>
    );
}

export default orderSummary;