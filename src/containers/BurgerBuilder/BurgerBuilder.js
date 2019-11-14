import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger'
import classes from './BurgerBuilder.module.css';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component{
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 0,
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
        this.setState({purchasable: sum > 0})
    };

    addIngredientHandler = (type) => {
        let oldCount = this.state.ingredients[type];
        let newCount = oldCount + 1;

        let updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = newCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice})
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        let oldCount = this.state.ingredients[type];
        if (oldCount ===  0){
         return;
        }
        let newCount = oldCount - 1;
        let updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = newCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;
        this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
        this.updatePurchaseState(updatedIngredients);
    };

    purchaseHandler= () => {
        this.setState({purchasing: true})
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    };

    purchaseContinueHandler = () =>{
        // this.setState({loading: true});
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: "Raymond",
        //         address: {
        //             street: 'Test street 1',
        //             zipCode: '41352',
        //             country:"Australia"
        //         },
        //         email: 'test@gmail.com'
        //     },
        //     deliveryMethod: "fatest"
        // };
        // axios.post('/orders.json', order)
        //     .then(response => {
        //         // console.log(response);
        //         this.setState({loading: false, purchasing: false});
        //     })
        //     .catch(error => {
        //         this.setState({loading: false, purchasing: false});
        //         // console.log(error)
        //     })
        const queryParams = []; 
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        })
    };


    render(){
        const disabledInfo = {
          ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }


        let orderSummary = null;
        let burger = <Spinner/>;
        if (this.state.ingredients){
            burger = (
                <Auxiliary>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        ingredientAdded = {this.addIngredientHandler}
                        ingredientRemoved = {this.removeIngredientHandler}
                        totalPrice = {this.state.totalPrice}
                        purchasable = {this.state.purchasable}
                        disabledInfo = {disabledInfo}
                        ordered = {this.purchaseHandler}
                    />
                </Auxiliary>
            );
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                totalPrice = {this.state.totalPrice}
                purchaseCanceled = {this.purchaseCancelHandler}
                purchaseContinued = {this.purchaseContinueHandler}
            />;
        }
        if (this.state.loading) {
            console.log(this.state.loading);
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

export default withErrorHandler(BurgerBuilder, axios);
