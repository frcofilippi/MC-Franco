import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../../NavigationItems/NavigationItems';
import classes from './Sidedrawer.module.css';
import Aux from '../../../hoc/Auxiliary';
import Backdrop from '../../UI/Backdrop/Backdrop';


const sidedrawer = props => {

    let classToApply = [];
    classToApply.push(classes.Sidedrawer);

    if(props.show) {
        classToApply.push(classes.Open)
    } else {
        classToApply.push(classes.Close)
    }

    let content = null;
    if (props.show) {
        content = (<Aux>
            <Backdrop show={props.show} clicked={props.closeClicked} />
            <div className={classToApply.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems clicked={props.closeClicked}/>
                </nav>
            </div>
        </Aux>);
    }

    return content;
}

export default sidedrawer;