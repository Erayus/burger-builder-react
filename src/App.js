import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import {Route, Switch} from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Checkout from './containers/Checkout/Checkout';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Layout>
          <Switch>
            <Route path="/orders"  component={Orders}/>
            <Route path="/checkout"  component={Checkout}/>
            <Route path="/" exact component={BurgerBuilder}/>
          </Switch>
        </Layout>
      </React.Fragment>
    );
  }
}

export default App;
