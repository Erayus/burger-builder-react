import React from 'react';
import Auxilary from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';
// import BurgerBuilder from "../../../containers/BurgerBuilder/BurgerBuilder";

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
           return (
               <li key={igKey}>
                   <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
               </li>
           )
        });
    return (
        <Auxilary>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: </strong>${props.totalPrice.toFixed(2)}</p>
            <p>Continue to checkout?</p>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
            <Button btnType="Danger" clicked={props.purchaseCanceled}>CANCEL</Button>
        </Auxilary>
    )
};

export default orderSummary;
 
