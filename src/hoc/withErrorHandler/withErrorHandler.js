import React, { Component } from 'react';
import Aux from '../Auxiliary';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHanlder = (WrappedComponent, axios) => {
    return class extends Component {

        constructor(props){
            super(props);
            this.respInterceptor = axios.interceptors.response.use(resp => resp, err => this.setState({ error: err }));
            this.reqInterceptor = axios.interceptors.request.use(req => req, err => this.setState({error: err}))
        }

        state = {
            error: null
        }

        onErrorCloseModalHandler = () => {
            this.setState({error: null});
        }

        componentWillUnmount(){
            axios.interceptors.response.eject(this.respInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
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