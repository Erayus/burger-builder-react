import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Meat', type: 'meat'}
];

const BuildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Current price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
            {controls.map((control) =>{
               return  <BuildControl
                   key={control.label}
                   label={control.label}
                   type={control.type}
                   added = {() => props.ingredientAdded(control.type)}
                   disabled = {props.disabledInfo[control.type]}
                   removed = {() => props.ingredientRemoved(control.type)}
               />
            })}
            <button
                className={classes.OrderButton}
                onClick={props.ordered}
                disabled={!props.purchasable}
            >ORDER NOW</button>
        </div>
    )
};

export default BuildControls;
