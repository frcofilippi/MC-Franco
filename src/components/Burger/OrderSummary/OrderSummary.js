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
            <p>Your Order</p>
            <p>Ingredients of your burger:</p>
            <ul>
                {ingredients}
            </ul>
            <p>Total: ${props.price}</p>
            <Button clicked={props.continueClicked} type={'success'}>CONTINUE</Button>
            <Button clicked={props.purchaseCanceled} type={'cancel'}>CANCEL</Button>
        </Aux>
    );
}

export default orderSummary;