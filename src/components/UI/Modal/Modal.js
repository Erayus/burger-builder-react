import React, {Component} from 'react'
import classes from './Modal.module.css';
import Aux from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component{

    //Only update when this 'show' property is different than the last show property (only update when the modal is open or close)
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.show !== nextProps.show && this.props !== nextProps ;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('did update!')
    }
    render() {
        return (
            <Aux>
                <div className={classes.Modal}
                     style={{
                         transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                         opacity: this.props.show ? '1' : '0'
                     }}
                >
                    {this.props.children}
                </div>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
            </Aux>
        )
    }

};

export default Modal;
