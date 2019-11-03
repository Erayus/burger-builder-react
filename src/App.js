import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
<<<<<<< HEAD
=======
import Checkout from './containers/Checkout/Checkout';
import {Route, Switch} from 'react-router-dom';
import Orders from './containers/Orders/Orders';
>>>>>>> ef25edd34cddc20ae5a9f9c14718fba9e19f0a3d

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
<<<<<<< HEAD
          <BurgerBuilder/>
=======
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/" exact component={BurgerBuilder} />
>>>>>>> ef25edd34cddc20ae5a9f9c14718fba9e19f0a3d
        </Layout>
      </div>
    );
  }
}

export default App;
