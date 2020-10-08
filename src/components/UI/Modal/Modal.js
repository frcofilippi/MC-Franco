import React from 'react'
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary';


const modal = (props) => {
    let content = null;
    if (props.show) {
        content = (
            <Aux>
                <Backdrop show={true}/>
                <div className={classes.ModalContainer}>
                    {props.children}
                </div>
            </Aux>
        );
    }
    return content;
}

export default modal;