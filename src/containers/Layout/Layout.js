import React, { Component } from 'react'
import Aux from '../../hoc/Auxiliary'
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/Sidedrawer/Sidedrawer';


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
        return (
            <Aux>
                <SideDrawer show={this.state.showSideDrawer} openClicked={this.openSideDrawerHandler} closeClicked={this.closeSideDrawerHandler} />
                <Toolbar show={!this.state.showSideDrawer} drawerToggleClicked={this.drawerTogglerHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;