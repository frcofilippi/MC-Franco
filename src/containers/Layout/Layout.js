import React, { Component } from 'react'
import Aux from '../../hoc/Auxiliary'
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/Sidedrawer/Sidedrawer';
import { connect } from 'react-redux';


class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    closeSideDrawerHandler = () => {
        console.log('closeCliked')
        this.setState({ showSideDrawer: false });
    }

    openSideDrawerHandler = () => {
        this.setState({ showSideDrawer: true });
    }

    drawerTogglerHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        })
    }

    render() {
        const authenticated = this.props.user && true;
        return (
            <Aux>
                <SideDrawer
                    show={this.state.showSideDrawer}
                    openClicked={this.openSideDrawerHandler}
                    closeClicked={this.closeSideDrawerHandler}
                    authenticated={authenticated}
                />
                <Toolbar show={!this.state.showSideDrawer}
                    drawerToggleClicked={this.drawerTogglerHandler}
                    authenticated={authenticated}

                />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps)(Layout);