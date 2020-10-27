import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
    const ingredients = Object.keys(props.ingredients).map(ingrd => {
        return (
            <span className={classes.OrderLabel} key={ingrd}> {`${ingrd}(${props.ingredients[ingrd]})`}</span>
        )
    });

    let orderDate = new Date(props.orderDate);
    const date = `${orderDate.getDate()}/${orderDate.getMonth()}/${orderDate.getYear()}`;

    return (
        <div className={classes.Order}>
            <p style={{textAlign: 'right'}}><strong>{date}</strong></p>
            <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
            <p>{ingredients}</p>
        </div>
    );
}

export default order;