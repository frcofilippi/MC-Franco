import * as actionType from './types/burgerBuilderActionTypes';
import axios from '../../axiosOrders';


export const addIngredientes = (ingrName) => {
    return {
        type: actionType.ADD_INGREDIENTE,
        ingredientName: ingrName
    }
}

export const removeIngredientes = (ingrName) => {
    return {
        type: actionType.REMOVE_INGREDIENTE,
        ingredientName: ingrName
    }
}


const setIngredients = (ingredients) => {
    return {
        type: actionType.INITIALIZE_INGREDIENTS,
        burgerIngredients: ingredients
    }
}

const setErrorState = () => {
    return {
        type: actionType.SET_ERROR
    }
}

export const initializeIngredientes = () => {
    return dispatch => {
        axios.get('/ingredients.json')
            .then(resp => dispatch(setIngredients(resp.data)))
            .catch(err => dispatch(setErrorState()))
    }
}
