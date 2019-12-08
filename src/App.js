import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
// import logo from './logo.svg';
import './App.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import {Route, Switch} from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Checkout from './containers/Checkout/Checkout';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

class App extends Component {

  componentDidMount() {
    this.props.onTryToAutoSignUp();
  }

  render() {
    return (
      <React.Fragment>
        <Layout>
          <Switch>
            <Route path="/orders"  component={Orders}/>
            <Route path="/checkout"  component={Checkout}/>
            <Route path="/auth"  component={Auth}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/" exact component={BurgerBuilder}/>
          </Switch>
        </Layout>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryToAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default connect(null, mapDispatchToProps)(App);
