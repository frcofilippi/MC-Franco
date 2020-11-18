import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axiosOrders';
//import * as actionType from '../../store/actions/actionTypes';
import { addIngredientes, removeIngredientes, initializeIngredientes } from '../../store/actions/index';



class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false
    }

    componentDidMount() {
        if (!this.props.ingrs) {
            this.props.fetchIngredients();
        }
    }

    updatePurchasableState(ingredients) {
        const sum = Object.values(ingredients)
            .reduce((sum, el) => sum + el, 0);
        return sum > 0;
    }

    purchasingHandler = () => {
        if (this.props.authenticated) {
            this.setState({ purchasing: true })
        } else {
            this.props.history.push('/auth');
        }
    }

    cancelPurchasingHandler = () => {
        this.setState({ purchasing: false })
    }

    continuePurchaseHandler = () => {
        this.props.history.push('/checkout');
    }

    render() {
        const disableInfo = { ...this.props.ingrs };

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0 ? true : false;
        }

        let orderSummary = <OrderSummary
            ingredients={this.props.ingrs}
            purchaseCanceled={this.cancelPurchasingHandler}
            continueClicked={this.continuePurchaseHandler}
            price={this.props.price} />;

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        let burger = this.state.error ? 'There was an error' : <Spinner />;
        if (this.props.ingrs) {
            burger = (<Aux>
                <Burger burgerIngredients={this.props.ingrs} />
                <BuildControls
                    lessButtonClicked={this.props.onRemoveIngredient}
                    moreButtonClicked={this.props.onAddIngredient}
                    disabledInfo={disableInfo}
                    totalPrice={this.props.price}
                    purchasable={this.updatePurchasableState(this.props.ingrs)}
                    purchasing={this.purchasingHandler}
                    cancelPurchasing={this.cancelPurchasingHandler}
                    authenticated={this.props.authenticated} />
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


const mapStateToProps = state => {
    return {
        ingrs: state.burger.burgerIngredients,
        price: state.burger.totalPrice,
        error: state.burger.error,
        authenticated: state.auth.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingrName) => dispatch(addIngredientes(ingrName)),
        onRemoveIngredient: (ingrName) => dispatch(removeIngredientes(ingrName)),
        fetchIngredients: () => dispatch(initializeIngredientes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));