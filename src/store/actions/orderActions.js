import * as actionTypes from './types/orderActionTypes';
import axios from '../../axiosOrders';


const startOrderProcess = () => {
    return {
        type: actionTypes.BEGIN_ORDER
    }
}

const storeOrder = (id, orderInfo) => {
    return {
        type: actionTypes.ORDER_PLACED_SUCCESFULLY,
        orderId: id,
        orderData: orderInfo
    }
}

const setErrorState = (error) => {
    return {
        type: actionTypes.ORDER_PLACED_ERROR,
        error: error
    }
}

export const beginPlacingOrder = (idToken, orderInfo, history) => {
    return dispatch => {
        dispatch(startOrderProcess());
        axios.post(`/orders.json?auth=${idToken}`, orderInfo)
            .then(resp => {
                console.log('[OrderCreatedResponse]', resp);
                history.push('/');
                dispatch(storeOrder(resp.data.name, orderInfo));
                return dispatch();
            })
            .catch(err => dispatch(setErrorState(err)));
    }
}




const startLoadOrdersProcess = () => {
    return {
        type: actionTypes.LOAD_ORDERS_START
    }
}

const loadOrdersSucess = (loadedOrders) => {
    return {
        type: actionTypes.LOAD_ORDERS_SUCESS,
        fetchedOrders: loadedOrders
    }
}

const loadOrdersFail = (error) => {
    return {
        type: actionTypes.LOAD_ORDERS_FAIL,
        error: error
    }
}


export const loadOrders = (idToken, uid) => {
    return dispatch => {
        dispatch(startLoadOrdersProcess())
        axios.get(`/orders.json?auth=${idToken}&orderBy="userId"&equalTo="${uid}"`)
            .then(resp => {
                const response = resp.data;
                let fetchedOrders = [];
                for (let order in response) {
                    fetchedOrders.push({
                        id: order,
                        ...response[order]
                    })
                }
                dispatch(loadOrdersSucess(fetchedOrders))
            })
            .catch(err => {
                dispatch(loadOrdersFail(err))
            });
    }
}

