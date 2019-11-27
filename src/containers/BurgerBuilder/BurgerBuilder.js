import React, {Component} from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger'
import classes from './BurgerBuilder.module.css';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions/actionTypes';


class BurgerBuilder extends Component{
    state = {
        purchasable: false,
        purchasing: false,
        loading: false
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
        let burger = <Spinner/>;
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
        if (this.state.loading) {
            orderSummary = <Spinner />
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
        // this.updatePurchaseState(this.state.ingredients);
        // axios.get('/ingredients.json')
        //     .then(res => {
        //         if (res){
        //             this.setState({ingredients: res.data});
        //             console.log(res)
        //         }
        //     })
    }
}
const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        totalPrice: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
