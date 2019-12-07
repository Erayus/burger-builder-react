import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import classes from './Orders.module.css';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'
class Orders extends Component {

    componentDidMount(){
        this.props.onFetchOrders(this.props.token)
    }


    render(){
        let orders = <Spinner/>;
        if (!this.props.loading & !this.pr) {
            orders = (
                <div className={classes.Orders}>
                    {this.props.orders.map( order => (
                        <Order 
                            key={order.id} 
                            ingredients= {order.ingredients}
                            price={order.price}
                        />
                    ))
                    }
                </div>
            )
        }
        return orders;
    }
}
export const mapStateToProps = (state) =>{
    return {
        orders: state.orders.orders,
        loading: state.orders.loading,
        token: state.auth.token
    }
}

export const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: (token)=> {dispatch(actions.fetchOrders(token))}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
