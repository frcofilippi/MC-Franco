import React, { Component } from 'react';
import Spinner from '../../components/UI/Spinner/Spinner';
import InputElement from '../../components/UI/InputElement/InputElement';

import classes from './ContactData.module.css';
import axios from '../../axiosOrders';


class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                inputType: 'input',
                value: '',
                label: 'Name',
                elementConfig: {
                    placeholder: 'Enter your name',
                    type: 'text',
                    validationRules: {
                        required: true,
                        maxLength: 3
                    }
                },
                touched: false,
                valid: true
            },
            email: {
                inputType: 'input',
                value: '',
                label: 'Email',
                elementConfig: {
                    placeholder: 'Enter your email',
                    type: 'email',
                    validationRules: {
                        required: true,
                        minLength: 6
                    }
                },
                touched: false,
                valid: true
            },
            street: {
                inputType: 'input',
                value: '',
                label: 'Street',
                elementConfig: {
                    placeholder: 'Enter your address',
                    type: 'text',
                    validationRules: {
                        required: true,
                        minLength: 10
                    }
                },
                touched: false,
                valid: true
            },
            zipcode: {
                inputType: 'input',
                value: '',
                label: 'Zipcode',
                elementConfig: {
                    placeholder: 'Enter your zipcode',
                    type: 'text',
                    validationRules: {
                        required: true,
                        minLength: 5
                    }
                },
                touched: false,
                valid: true
            }, country: {
                inputType: 'input',
                value: '',
                label: 'Country',
                elementConfig: {
                    placeholder: 'Enter your Country',
                    type: 'text',
                    validationRules: {
                        required: true
                    }
                },
                touched: false,
                valid: true
            },
            deliveryMethod: {
                inputType: 'dropdown',
                value: '',
                label: 'Delivery Method',
                elementConfig: {
                    options: [
                        { value: 'regular', displayValue: 'Regular Delivery (from 1 to 2 hours)' },
                        { value: 'express', displayValue: 'Regular Delivery (within 30 minutes)' },
                    ],
                    validationRules: null
                },
                touched: false,
                valid: true
            }
        },
        loading: false,
        orderFormValid: false
    }

    orderClickHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true })
        const form = { ...this.state.orderForm };
        let customerData = {};
        Object.keys(form)
            .map(field => {
                return customerData[field] = form[field].value
            });

        const order = {
            ingredients: this.props.burgerIngredients,
            price: this.props.totalPrice,
            date: new Date(),
            contact: customerData
        };
        axios.post('/orders.json', order)
            .then(resp => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({ loading: false });
            });
    }

    inputChangeHandler = (event, inputElement) => {
        console.log(event.target)
        const updatedOrderForm = { ...this.state.orderForm };
        const value = event.target.value;
        updatedOrderForm[inputElement].value = value;
        updatedOrderForm[inputElement].touched = true;
        updatedOrderForm[inputElement].valid = this.validateInput(inputElement, value);
        const formValid = this.checkFormValidity();
        this.setState({ orderForm: updatedOrderForm, orderFormValid: formValid});
    }

    checkFormValidity(){
        let valid = true;
        for(let key in this.state.orderForm)
        {
            if(this.state.orderForm[key].valid === false || this.state.orderForm[key].touched === false)
            {
                valid = false;
            }
        }
        return valid;
    }

    validateInput(inputElment, value) {
        const rules = this.state.orderForm[inputElment].elementConfig.validationRules;
        let valid = true;
        console.log(rules, value);
        if ( rules && rules.required) {
            if (value === '' && this.state.orderForm[inputElment].touched === true)
            {   
                valid = false;
            }
        }

        if(rules && rules.minLength) {
            if(value.length < rules.minLength)
            {
                valid = false;
            }
        }

        if(rules && rules.maxLength) {
            if(value.length > rules.maxLength)
            {
                valid = false;
            }
        }

        return valid;
    }

    render() {

        let inputs = [];

        for (let key in this.state.orderForm) {
            inputs.push({
                id: key,
                ...this.state.orderForm[key]
            })
        }

        const formFields = inputs.map(field => {
            return (<InputElement
                key={field.id}
                {...field}
                changed={this.inputChangeHandler}
            />);
        })

        const contactForm = (
            <div className={classes.ContactData}>
                <h3>Enter your contact information:</h3>
                <form onSubmit={this.orderClickHandler}>
                    {formFields}
                    <button type='submit' disabled={!this.state.orderFormValid}>Place Order</button>
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