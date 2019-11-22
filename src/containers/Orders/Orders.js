import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import classes from './Orders.module.css'
class Orders extends Component {
    state = {
        orders: [],
        loading:true
    }
    componentDidMount(){
        axios.get('./orders.json').then(
            (res) => {
                const fetchOrders = [];
                for (let key in res.data){
                    fetchOrders.push({
                        ...res.data[key],
                        id: key
                    })   
                }
                this.setState({orders: fetchOrders, loading: false})
            }
        )
        .catch(err => {this.setState({loading: true})})
    }


    render(){
        return (
            <div className={classes.Orders}>
                {this.state.orders.map( order => (
                    <Order 
                        key={order.id} 
                        ingredients= {order.ingredients}
                        price={order.price}
                    />
                ))
            }
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);
