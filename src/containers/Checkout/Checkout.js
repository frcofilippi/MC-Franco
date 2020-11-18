import React, { Component } from 'react';
import CheckoutSummary from '../../components/Checkout/CheckoutSummary';
import ContactData from '../ContactData/ContactData';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Checkout extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = this.loadDatafromQuery();
    // }


    // loadDatafromQuery() {
    //     const ingredients = {};
    //     const queryParams = new URLSearchParams(this.props.location.search);
    //     let price = 0;
    //     for (let param of queryParams.entries()) {
    //         if (param[0] === 'price') {
    //             price = param[1];
    //         } else {
    //             ingredients[param[0]] = +param[1];

    //         }
    //     }
    //     return { burgerIngredients: ingredients, totalPrice: price };
    // }

    continueClickedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    cancelClickedHandler = () => {
        this.props.history.goBack()
    }

    render() {
        const summary = (
            <React.Fragment>
                <CheckoutSummary
                    burgerIngredients={this.props.ingredients}
                    continueClicked={this.continueClickedHandler}
                    cancelClicked={this.cancelClickedHandler}
                />
                {/* {this.state.showContactForm ? <ContactData /> : null} */}
                {/* <Route
                    path={this.props.match.path + '/contact-data'}
                    render={(props) => (<ContactData {...props} burgerIngredients={this.props.ingredients} totalPrice={this.state.totalPrice} />)}
                /> */}
                <Route
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData}
                />
            </React.Fragment>
        );

        return (
            <React.Fragment>
                { this.props.ingredients ? summary : <Redirect to='/' />}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burger.burgerIngredients
    }
}

export default connect(mapStateToProps)(Checkout);