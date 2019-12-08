import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import classes from "./NavigationItems.module.css";


const navigationItems = (props)=> {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" >Home</NavigationItem>
            <NavigationItem link="/orders">Orders</NavigationItem>
            {props.isAuthenticated 
                ?<NavigationItem link="/logout">Logout</NavigationItem> 
                : <NavigationItem link="/auth">Authenticate</NavigationItem>
            }
        </ul>
    )
};

export default navigationItems;
