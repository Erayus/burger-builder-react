import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';
const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it taste well</h1>
            <div style={{width: '80%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>

            <p style={{textAlign: "center", fontWeight: "bolder"}}><strong>Price:</strong> ${props.totalPrice.toFixed(2)}</p>
            <Button 
                btnType="Danger"
                clicked={props.checkoutCancelled}
            >CANCEL</Button>
            <Button 
                btnType="Success"
                clicked={props.checkoutContinued}
            >CONTINUE</Button>
        </div>
    )
}

export default checkoutSummary;