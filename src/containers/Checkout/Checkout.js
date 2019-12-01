import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { connect } from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import * as actions from '../../store/actions/index'

class Checkout extends Component {

    // // Before rendering the child's element
    // componentWillMount(){
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for (let param of query.entries()){
    //         if (param [0] === 'price'){
    //             price = +param[1];
    //         }else {
    //             ingredients[param[0]] = +param[1];
    //         }  
    //     }
    //     this.setState({ingredients: ingredients, totalPrice: price});
    // }

    checkoutContinuedHandler= () => {
        this.props.history.replace('/checkout/contact-data')
    }
    checkoutCancelledHandler= () => {
        this.props.history.goBack();
    }

    render(){
        let  summary = <Redirect to="/" />;
        if (this.props.ings){
            const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null;
            
            summary = (
            <div>
                {purchasedRedirect}
                <CheckoutSummary 
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                    totalPrice={this.props.price}
                ></CheckoutSummary>
                <hr/>
                <Route 
                    path={this.props.match.path + '/contact-data'} component={ContactData}/>
            </div>
            )
        }
        return (
            summary
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased: state.orders.purchased
    }
}



export default connect(mapStateToProps )(Checkout);