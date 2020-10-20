import React, { Component } from 'react';
import Aux from '../Auxiliary';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHanlder = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        }

        componentDidMount() {
            axios.interceptors.response.use(resp => resp, err => this.setState({ error: err }));
            axios.interceptors.request.use(req => req, err => this.setState({error: err}))
        }

        onErrorCloseModalHandler = () => {
            this.setState({error: null});
        }

        render() {
            return (
                <Aux>
                    <Modal show={this.state.error} closeModal={this.onErrorCloseModalHandler}>
                        Something did not work!
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHanlder;