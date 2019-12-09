import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css"
import Backdrop from "../../UI/Backdrop/Backdrop";
import Auxiliary from "../../../hoc/Auxiliary";

const sideDrawer = (props) => {
    return (
        <Auxiliary>
            <div className={[classes.SideDrawer, props.show ? classes.Open : classes.Close].join(' ')}
                onClick={props.closeDrawer}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
            <Backdrop show={props.show} clicked={props.closeDrawer}/>
        </Auxiliary>
    )
};

export default sideDrawer;
