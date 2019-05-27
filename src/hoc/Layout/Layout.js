import React, {Component} from 'react';
import Auxiliary from '../Auxiliary';
import styles from './Layout.module.css';
import BurgerBuilder from "../../containers/BurgerBuilder/BurgerBuilder";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";


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
                <Toolbar openSideDrawer={this.openSideDrawerHandler}/>
                <SideDrawer show={this.state.isDrawerOpen}
                            closeDrawer={this.closeSideDrawerHandler}/>
                <main className={styles.Content}>
                    {this.props.children}  
                </main>
            </Auxiliary>
        )
    }

};

export default Layout;
