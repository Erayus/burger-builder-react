import * as actionTypes from '../actions/actionTypes';
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
  };
  

const initialState = {
    ingredients: null,
    totalPrice: 0,
    error: false
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
        case actionTypes.REMOVE_INGREDIENT:
             return {
                 ...state,
                 ingredients: {
                     ...state.ingredients,
                     [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                 },
                 totalPrice: Math.abs(state.totalPrice - INGREDIENT_PRICES[action.ingredientName])
             }
        case actionTypes.SET_INGREDIENTS:
            const ingredients = action.ingredients;
            let price = 0;
            for (let ingredientName in ingredients){
                price += INGREDIENT_PRICES[ingredientName] * ingredients[ingredientName]
            }
            return {
                ...state,
                ingredients: ingredients,
                totalPrice: price,
                error: false
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }
        default:
            return state
    }
}

export default reducer;