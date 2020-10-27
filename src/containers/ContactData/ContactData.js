import React, { Component } from 'react';
import Spinner from '../../components/UI/Spinner/Spinner';

import classes from './ContactData.module.css';
import axios from '../../axiosOrders';


class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            zipcode: ''
        },
        loading: false
    }

    componentDidMount() {
        console.log(this.props.burgerIngredients);
    }

    orderClickHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true })

        const order = {
            ingredients: this.props.burgerIngredients,
            price: this.props.totalPrice,
            date: new Date(),
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
                this.setState({ loading: false});
                console.log(this.props)
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({ loading: false});
            });
    }

    render() {
        const contactForm = (
        <div className={classes.ContactData}>
            <h3>Enter your contact information:</h3>
            <form>
                <input type="text" name="name" placeholder='Enter your name' />
                <input type="email" name="email" placeholder='Enter your email' />
                <input type="text" name="street" placeholder='Enter address' />
                <input type="text" name="zipcode" placeholder='Zipcode' />
                <button type='submit' onClick={this.orderClickHandler}>Place Order</button>
            </form>
        </div>);
        return (
            <React.Fragment>
                {this.state.loading ? <Spinner /> : contactForm}
            </React.Fragment>
        );
    }
}

export default ContactData;