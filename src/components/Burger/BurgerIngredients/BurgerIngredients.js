import React, { Component } from 'react'
import classes from './BurgerIngredients.module.css'
import PropTypes from 'prop-types';

class BurgerIngredient extends Component {

    render() {
        let ingredient = null;

        switch (this.props.type) {
            case ('top-bread'):
                ingredient = <div className={classes.BreadTop}></div>
                break;
            case ('bottom-bread'):
                ingredient = <div className={classes.BreadBottom}></div>
                break;
            case ('seed1'):
                ingredient = <div className={classes.Seeds1}></div>
                break;
            case ('meat'):
                ingredient = <div className={classes.Meat}></div>
                break;
            case ('salad'):
                ingredient = <div className={classes.Salad}></div>
                break;
            case ('cheese'):
                ingredient = <div className={classes.Cheese}></div>
                break;
            case ('bacon'):
                ingredient = <div className={classes.Bacon}></div>
                break;
            default:
                ingredient = null;
        }

        return ingredient;
    }
}

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
}

export default BurgerIngredient;