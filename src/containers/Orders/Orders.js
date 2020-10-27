import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axiosOrders';

class Orders extends Component {

    state = {
        orders: [],
        loading: false
    }

    componentDidMount() {
        //fetch orders from server
        axios.get('/orders.json')
            .then(resp => {
                const response = resp.data;
                let fetchedOrders = [];
                for (let order in response) {
                    fetchedOrders.push({
                        id: order,
                        ...response[order]
                    })
                }
                this.setState({ orders: fetchedOrders });
            })
            .catch(err => {
                console.log(err)
            });

    }

    render() {
        let orders = <Spinner />;

        if (!this.state.loading) {
            orders = (<div>
                {this.state.orders.map(order => {
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

export default withErrorHandler(Orders, axios);