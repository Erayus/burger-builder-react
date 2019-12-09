import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
// import logo from './logo.svg';
import './App.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import {Route, Switch, Redirect} from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Checkout from './containers/Checkout/Checkout';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

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
            <Route path="/orders"  component={Orders}/>
            <Route path="/checkout"  component={Checkout}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/auth"  component={Auth}/>
            <Route path="/" exact component={BurgerBuilder}/>
        </Switch>
      )
    }

    return (
      <React.Fragment>
        <Layout>
          {routes}
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
