import React, { Component } from 'react';
import CheckoutSummary from '../../components/Checkout/CheckoutSummary';
import ContactData from '../ContactData/ContactData';
import { Route } from 'react-router-dom';

class Checkout extends Component {

    constructor(props) {
        super(props);
        this.state =  this.loadDatafromQuery();
    }


    loadDatafromQuery() {
        const ingredients = {};
        const queryParams = new URLSearchParams(this.props.location.search);
        let price = 0;
        for (let param of queryParams.entries()) {
            if (param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];

            }
        }
        return { burgerIngredients: ingredients, totalPrice: price };
    }

    continueClickedHandler = () => {
        // this.setState(prevState => ({ showContactForm: !prevState.showContactForm }))
        this.props.history.replace('/checkout/contact-data');
    }

    cancelClickedHandler = () => {
        this.props.history.goBack()
    }

    render() {
        return (
            <React.Fragment>
                <CheckoutSummary
                    burgerIngredients={this.state.burgerIngredients}
                    continueClicked={this.continueClickedHandler}
                    cancelClicked={this.cancelClickedHandler}
                />
                {/* {this.state.showContactForm ? <ContactData /> : null} */}
                <Route
                    path={this.props.match.path + '/contact-data'}
                    render={(props) => (<ContactData {...props} burgerIngredients={this.state.burgerIngredients} totalPrice={this.state.totalPrice} />)}
                />
            </React.Fragment>
        );
    }
}

export default Checkout;