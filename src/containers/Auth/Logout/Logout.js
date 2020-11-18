import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logoutUser } from '../../../store/actions/index';


class Logout extends Component {

    componentDidMount(){
        this.props.logoutUser();
    }

    render() {
        return (<Redirect to='/' />)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: () => dispatch(logoutUser())
    }
}

export default connect(null, mapDispatchToProps)(Logout);