import React from 'react'
import BurgerIngredient from '../Burger/BurgerIngredients/BurgerIngredients'

import classes from './Burger.module.css'

const burger = (props) => {

    let transformedIngredients = Object.keys(props.burgerIngredients)
        .map(ingKey => {
            return [...Array(props.burgerIngredients[ingKey])].map((_, index) => {
                console.log(`ingKey: ${ingKey} - _: ${_} - index: ${index}`)
                return <BurgerIngredient key={ingKey + index} type={ingKey} />
            })
        })
        .reduce((arr, el) => {
            return arr.concat(el);
        }, []);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <h4>Please add your ingredients!!</h4>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient key="topbread" type="top-bread" />
            {transformedIngredients}
            <BurgerIngredient key="bottombread" type="bottom-bread" />
        </div>
    );
}

export default burger;