import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENTS_PRICES = {
    salad: 0.4,
    cheese: 0.5,
    bacon: 0.3,
    meat: 1.5
};

class BurgerBuilder extends Component {

    state = {
        burgerIngredients: {
            salad: 0,
            cheese: 0,
            bacon: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    updatePurchasableState(ingredients) {
        const sum = Object.values(ingredients).reduce((sum, el) => sum + el, 0);
        console.log(`PURCHASABLE: ${sum > 0}`);
        this.setState({ purchasable: sum > 0 });
    }

    clickMoreHandler = (type) => {
        const burgerIngredients = { ...this.state.burgerIngredients };
        burgerIngredients[type]++;
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + INGREDIENTS_PRICES[type];
        this.setState({ burgerIngredients: burgerIngredients, totalPrice: newPrice });
        this.updatePurchasableState(burgerIngredients)
    }

    clickLessHandler = (type) => {
        const burgerIngredients = { ...this.state.burgerIngredients };
        const oldPrice = this.state.totalPrice;
        if (burgerIngredients[type] > 0) {
            const newPrice = oldPrice - INGREDIENTS_PRICES[type];
            burgerIngredients[type]--;
            this.setState({ burgerIngredients: burgerIngredients, totalPrice: newPrice });
            this.updatePurchasableState(burgerIngredients)
        }
    }

    purchasingHandler = () => {
        this.setState({ purchasing: true })
    }

    cancelPurchasingHandler = () => {
        this.setState({ purchasing: false })

    }

    render() {
        const disableInfo = { ...this.state.burgerIngredients };

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0 ? true : false;
        }

        console.log(disableInfo);

        return (
            <Aux>
                <Modal show={this.state.purchasing}>
                    <OrderSummary 
                    ingredients={this.state.burgerIngredients}
                    purchaseCanceled={this.cancelPurchasingHandler}
                    continueClicked={() => alert('OK')} 
                    price={this.state.totalPrice}/>
                </Modal>
                <Burger burgerIngredients={this.state.burgerIngredients} />
                <BuildControls
                    lessButtonClicked={this.clickLessHandler}
                    moreButtonClicked={this.clickMoreHandler}
                    disabledInfo={disableInfo}
                    totalPrice={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    purchasing={this.purchasingHandler}
                    cancelPurchasing={this.cancelPurchasingHandler} />
            </Aux>
        );
    }
}

export default BurgerBuilder;