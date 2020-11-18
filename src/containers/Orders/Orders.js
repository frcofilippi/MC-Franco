import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import axios from '../../axiosOrders';
import * as actions from '../../store/actions/index';



class Orders extends Component {

    // state = {
    //     orders: [],
    //     loading: false
    // }

    componentDidMount() {
        this.props.loadOrders(this.props.user);
    }

    render() {
        let orders = <Spinner />;

        if (!this.props.loading) {
            orders = (<div>
                {this.props.orderArray.map(order => {
                    return (
                        <Order
                            key={order.id}
                            price={+order.price}
                            ingredients={order.ingredients}
                            orderDate={order.date}
                        />
                    )
                })}
            </div>);
        }

        return (
            <React.Fragment>
                {orders}
            </React.Fragment>
        );
    }
}


const mapStateToProops = state => {
    return {
        orderArray: state.orders.orders,
        loading: state.orders.loading,
        user: state.auth.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadOrders: (user) => dispatch(actions.loadOrders(user.idToken, user.uid))
    }
}

export default connect(mapStateToProops, mapDispatchToProps)(withErrorHandler(Orders, axios));