import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
  };
  

const initialState = {
    ingredients: null,
    totalPrice: 0,
    error: false,
    building: false
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            const newIngredients = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
            const updatedIngredients = updateObject(state.ingredients, newIngredients);
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building: true
            }
            return updateObject(state, updatedState);
        case actionTypes.REMOVE_INGREDIENT:
            const newIng = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
            const updatedIng = updateObject(state.ingredients, newIng);
            const updatedSt = {
                ingredients: updatedIng,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building: true  
            }
            return updateObject(state, updatedSt);
        case actionTypes.SET_INGREDIENTS:
            const ingredients = action.ingredients;
            let price = 0;
            for (let ingredientName in ingredients){
                price += INGREDIENT_PRICES[ingredientName] * ingredients[ingredientName]
            }

            return updateObject(state, {
                ingredients: ingredients,
                totalPrice: price,
                error: false,
                building: false
            })
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state,{
                error: true
            })
        default:
            return state
    }
}

export default reducer;