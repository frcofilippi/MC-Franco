import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axiosOrders';


const INGREDIENTS_PRICES = {
    salad: 0.4,
    cheese: 0.5,
    bacon: 0.3,
    meat: 1.5
};

class BurgerBuilder extends Component {

    state = {
        burgerIngredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: null
    }

    componentDidMount() {
        axios.get(`https://react-mc-franco.firebaseio.com/ingredients.json`)
            .then(resp => this.setState({ burgerIngredients: resp.data }))
            .catch(err => {
                this.setState({error: err});
             }); //need to create an error state for the app to handle this
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

    continuePurchaseHandler = () => {
        this.setState({ loading: true })

        const order = {
            ingredients: this.state.burgerIngredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Franco Filippi',
                address: {
                    street: 'test strreet 222',
                    zipCode: 32825,
                    country: 'Argentina'
                }
            },
            deliveryMethod: 'express'
        };
        axios.post('/orders.json', order)
            .then(resp => {
                this.setState({ loading: false, purchasing: false })
            })
            .catch(err => {
                this.setState({ loading: false, purchasing: false })
            });
    }

    render() {
        const disableInfo = { ...this.state.burgerIngredients };

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0 ? true : false;
        }

        let orderSummary = <OrderSummary
            ingredients={this.state.burgerIngredients}
            purchaseCanceled={this.cancelPurchasingHandler}
            continueClicked={this.continuePurchaseHandler}
            price={this.state.totalPrice} />;

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        let burger = this.state.error ? 'There was an error' : <Spinner />;
        if (this.state.burgerIngredients) {
            burger = (<Aux>
                <Burger burgerIngredients={this.state.burgerIngredients} />
                <BuildControls
                    lessButtonClicked={this.clickLessHandler}
                    moreButtonClicked={this.clickMoreHandler}
                    disabledInfo={disableInfo}
                    totalPrice={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    purchasing={this.purchasingHandler}
                    cancelPurchasing={this.cancelPurchasingHandler} />
            </Aux>);
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);