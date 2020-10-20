import React, { Component } from 'react'
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary';


class Modal extends Component {
    
    // shouldComponentUpdate(nextProps, nextState) {
    //     if (nextProps.show !== this.props.show) {
    //         return true;
    //     }
    //     return false;
    // }

    render() {
        let content = null;
        if (this.props.show) {
            content = (
                <Aux>
                    <Backdrop show={this.props.show} clicked={this.props.closeModal}  />
                    <div className={classes.ModalContainer}>
                        {this.props.children}
                    </div>
                </Aux>
            );
        }
        return (content);
    }

}

export default Modal;