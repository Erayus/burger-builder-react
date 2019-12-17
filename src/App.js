import React, { Component, Suspense } from 'react';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';

import './App.css';
import Layout from './hoc/Layout/Layout';
import {Route, Switch, Redirect} from 'react-router-dom';


const Auth = React.lazy(() => import('./containers/Auth/Auth'));
const BurgerBuilder = React.lazy(() => import('./containers/BurgerBuilder/BurgerBuilder'));
const Orders = React.lazy(() => import('./containers/Orders/Orders'));
const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));
const Logout = React.lazy(() => import('./containers/Auth/Logout/Logout'));

class App extends Component {

  componentDidMount() {
    this.props.onTryToAutoSignUp();
  }

  render() {
    


    let routes = (
      <Switch>
        <Route path="/auth"  component={Auth}/>
        <Route path="/" exact component={BurgerBuilder}/>
        <Redirect to="/"/>
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route  path='/orders' component={Orders}/>
          <Route  path='/checkout' component={Checkout}/>
          <Route  path='/logout' component={Logout}/>
          <Route  path='/auth' component={Auth}/>
          <Route  path='/' component={BurgerBuilder}/>
        </Switch>
      )
    }

    return (
      <React.Fragment>
        <Layout>
          <Suspense fallback="Loading">
            {routes}
          </Suspense>
      
        </Layout>
      </React.Fragment>
    );
  }
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryToAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
