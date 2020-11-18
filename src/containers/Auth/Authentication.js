import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import InputElement from '../../components/UI/InputElement/InputElement';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Authentication.module.css';
import Toggle from '../../components/UI/Toggle/Toggle';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axiosOrders';
import { loginUser, signUpUser } from '../../store/actions/index';

class Authentication extends Component {
    state = {
        loginForm: {
            email: {
                inputType: 'input',
                value: '',
                label: 'Username',
                elementConfig: {
                    placeholder: 'Enter your email',
                    type: 'email',
                    validationRules: {
                        required: true,
                        minLength: 5,
                        isEmail: true
                    }
                },
                touched: false,
                valid: true
            },
            password: {
                inputType: 'input',
                value: '',
                label: 'Password',
                elementConfig: {
                    placeholder: 'Enter your password',
                    type: 'password',
                    validationRules: {
                        required: true,
                        minLength: 6
                    }
                },
                touched: false,
                valid: true
            },
        },
        loginFormValid: false,
        isSignUp: false
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        console.log('[FORM SUBMITTED]', this.state.loginForm['email'].value, this.state.loginForm['password'].value);
        const username = this.state.loginForm['email'].value;
        const password = this.state.loginForm['password'].value;
        this.state.isSignUp ?
            this.props.signupUser(username, password) : this.props.loginUser(username, password);

    }

    inputChangeHandler = (event, inputElement) => {
        const updatedLoginForm = { ...this.state.loginForm };
        const value = event.target.value;
        updatedLoginForm[inputElement].value = value;
        updatedLoginForm[inputElement].touched = true;
        updatedLoginForm[inputElement].valid = this.validateInput(inputElement, value);
        const formValid = this.checkFormValidity();
        this.setState({ loginForm: updatedLoginForm, loginFormValid: formValid });
    }

    checkFormValidity() {
        let valid = true;
        for (let key in this.state.loginForm) {
            if (this.state.loginForm[key].valid === false || this.state.loginForm[key].touched === false) {
                valid = false;
            }
        }
        return valid;
    }

    validateInput(inputElment, value) {
        const rules = this.state.loginForm[inputElment].elementConfig.validationRules;
        let valid = true;
        if (rules && rules.required) {
            if (value === '' && this.state.loginForm[inputElment].touched === true) {
                valid = false;
            }
        }

        if (rules && rules.minLength) {
            if (value.length < rules.minLength) {
                valid = false;
            }
        }

        if (rules && rules.maxLength) {
            if (value.length > rules.maxLength) {
                valid = false;
            }
        }

        if (rules && rules.isEmail) {
            const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            valid = regex.test(value);
        }

        return valid;
    }

    onToggleButtonChange = (event) => {
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            }
        })
    }

    render() {

        let formFieldsArray = [];

        for (let key in this.state.loginForm) {
            formFieldsArray.push({ id: key, input: this.state.loginForm[key] })
        }

        const formFields = formFieldsArray.map((field) => {
            return (
                <InputElement
                    key={field.id}
                    id={field.id}
                    {...field.input}
                    changed={this.inputChangeHandler}
                />
            );
        })

        const LOGIN = 'LOGIN';
        const SIGN_UP = 'SIGN UP';
        let buttonText = LOGIN;
        if (this.state.isSignUp) {
            buttonText = SIGN_UP;
        }

        const spinner = (<div className={classes.InsideSpinner}>
            <Spinner />
        </div>);

        return (
            <React.Fragment>
                <div className={classes.Authentication}>
                    <form onSubmit={this.onSubmitHandler}>
                        {formFields}
                        <span style={{ color: 'red' }}>{this.props.error}</span>
                        <button disabled={!this.state.loginFormValid}>{this.props.loading ? spinner : buttonText}</button>
                    </form>
                    <Toggle
                        label={`Switch to ${this.state.isSignUp ? LOGIN : SIGN_UP}`}
                        active={this.state.isSignUp}
                        toggleClicked={this.onToggleButtonChange}
                    />
                </div>
                {this.props.user ? <Redirect to='/' /> : null}
            </React.Fragment>

        );
    }
}


const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        user: state.auth.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginUser: (user, pwd) => dispatch(loginUser(user, pwd)),
        signupUser: (user, pwd) => dispatch(signUpUser(user, pwd))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Authentication, axios));