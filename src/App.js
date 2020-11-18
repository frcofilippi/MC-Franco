import React, { Component, Suspense } from 'react';
import Layout from './containers/Layout/Layout';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import Spinner from './components/UI/Spinner/Spinner';
import { connect } from 'react-redux'
import { checkAuthenticatedUser, logoutUser } from './store/actions/index';

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Orders from './containers/Orders/Orders';
import Authentication from './containers/Auth/Authentication';
import Logout from './containers/Auth/Logout/Logout';



const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));


class App extends Component {

  componentDidMount() {
    this.props.checkForAuthenticatedUser();
  }

  render() {

    let routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/checkout" render={(props) => <Suspense fallback={<Spinner />}>
          <Checkout {...props} />
        </Suspense>} />
        <Route path="/auth" exact component={Authentication} />
        <Redirect to='/' />
      </Switch>
    );

    if (this.props.authenticated) {
      routes = (
        <Switch>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/checkout" render={(props) => <Suspense fallback={<Spinner />}>
            <Checkout {...props} />
          </Suspense>} />
          <Route path="/orders" component={Orders} />
          <Route path="/auth/logout" component={Logout} />
          <Redirect to='/' />
        </Switch>
      );
    }


    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    )
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    checkForAuthenticatedUser: () => dispatch(checkAuthenticatedUser()),
    logOutUser: () => dispatch(logoutUser())
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.user && true
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
