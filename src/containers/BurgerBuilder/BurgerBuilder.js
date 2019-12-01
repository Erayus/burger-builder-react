import React, {Component} from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger'
import classes from './BurgerBuilder.module.css';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';


class BurgerBuilder extends Component{
    state = {
        purchasable: false,
        purchasing: false,
    };

    updatePurchaseState = (ingredients) => {
      const sum = Object.keys(ingredients)
          .map( igKey => {
              return ingredients[igKey];
          })
          .reduce((sum, el)=> {
              return sum + el;
          },0);
        return  sum > 0;
    };


    purchaseHandler= () => {
        this.setState({purchasing: true})
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    };

    purchaseContinueHandler = () =>{
        // const queryParams = []; 
        // for (let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        // }
        // queryParams.push(encodeURIComponent('price')+ '=' + encodeURIComponent(this.state.totalPrice))
        // const queryString = queryParams.join('&');
        // this.props.history.push({
        //     pathname: '/checkout'
        //     search: '?' + queryString
        // })
        this.props.onInitPurchase();
        this.props.history.push('/checkout')
    };


    render(){
        const disabledInfo = {
          ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }


        let orderSummary = null;
        let burger = this.props.error ? "Error Loading The Burger's Ingredients": <Spinner/>;

        if (this.props.ings){
            burger = (
                <Auxiliary>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        ingredientAdded = {this.props.onIngredientAdded}
                        ingredientRemoved = {this.props.onIngredientRemoved}
                        totalPrice = {this.props.totalPrice}
                        purchasable = {this.updatePurchaseState(this.props.ings)}
                        disabledInfo = {disabledInfo}
                        ordered = {this.purchaseHandler}
                    />
                </Auxiliary>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                totalPrice = {this.props.totalPrice}
                purchaseCanceled = {this.purchaseCancelHandler}
                purchaseContinued = {this.purchaseContinueHandler}
            />;
        }

        return (
            <Auxiliary className={classes.Content}>

                <Modal show={this.state.purchasing}
                       modalClosed = {this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}

            </Auxiliary>
        )
    }


    //Check if the burger is purchasable after rendering it
    componentDidMount() {
        this.props.onInitIngredients();
    }
}
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => {dispatch(actions.purchaseInit())}

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
