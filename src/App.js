import React, { Component, Suspense } from 'react';
import Layout from './containers/Layout/Layout';
import { Route, Switch } from 'react-router-dom';
import Spinner from './components/UI/Spinner/Spinner';

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Orders from './containers/Orders/Orders';


const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));


class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/checkout" render={(props) => <Suspense fallback={<Spinner />}>
              <Checkout {...props} />
            </Suspense>} />
            <Route path="/orders" component={Orders} />
          </Switch>
        </Layout>
      </div>
    )
  }

}

export default App;
