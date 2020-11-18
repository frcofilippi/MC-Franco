import * as ActionType from '../actions/types/burgerBuilderActionTypes';

const INGREDIENTS_PRICES = {
    salad: 0.4,
    cheese: 0.5,
    bacon: 0.3,
    meat: 1.5
};

const initialState = {
    // burgerIngredients: {
    //     salad: 0,
    //     bacon: 0,
    //     cheese: 0,
    //     meat: 0
    // },
    burgerIngredients: null,
    totalPrice: 4,
    error: false
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case ActionType.ADD_INGREDIENTE:
            return {
                ...state,
                burgerIngredients: {
                    ...state.burgerIngredients,
                    [action.ingredientName]: state.burgerIngredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]
            };
        case ActionType.REMOVE_INGREDIENTE:
            return {
                ...state,
                burgerIngredients: {
                    ...state.burgerIngredients,
                    [action.ingredientName]: state.burgerIngredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName]
            };
        case ActionType.INITIALIZE_INGREDIENTS:
            return {
                ...state,
                burgerIngredients: action.burgerIngredients
            }
        case ActionType.SET_ERROR:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}

export default reducer;