import * as actionType from '../actions/types/orderActionTypes';

const initialState = {
    orders: [],
    loading: false,
    error: null
}



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.BEGIN_ORDER:
            return {
                ...state,
                loading: true
            }
        case actionType.ORDER_PLACED_SUCCESFULLY:
            const updatedOrders = state.orders.concat({ orderId: action.orderId, orderData: action.orderData });
            return {
                ...state,
                orders: updatedOrders,
                loading: false
            }
        case actionType.ORDER_PLACED_ERROR:
            return {
                ...state,
                loading: true
            }
        case actionType.LOAD_ORDERS_START:
            return {
                ...state,
                loading: true
            }
        case actionType.LOAD_ORDERS_SUCESS:
            return {
                ...state,
                orders: action.fetchedOrders,
                loading: false
            }
        case actionType.LOAD_ORDERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state;
    }
}

export default reducer;

