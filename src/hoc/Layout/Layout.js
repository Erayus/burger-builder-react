import React, {Component} from 'react';
import Auxiliary from '../Auxiliary';
import styles from './Layout.module.css';
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import {connect} from 'react-redux';

class Layout extends Component  {
    state = {
        isDrawerOpen: false
    };

    closeSideDrawerHandler = () =>{
        this.setState({isDrawerOpen: false})
    };
    openSideDrawerHandler = () => {
      this.setState({isDrawerOpen: true})
    };
    render (){
        return (
            <Auxiliary>
                <Toolbar
                    isAuth={this.props.isAuthenticated} 
                    openSideDrawer={this.openSideDrawerHandler}/>
                <SideDrawer show={this.state.isDrawerOpen}
                            closeDrawer={this.closeSideDrawerHandler}/>
                <main className={styles.Content}>
                   {this.props.children}
                </main>
            </Auxiliary>
        )
    }
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);
