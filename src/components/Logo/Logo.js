import React from'react';
import BurgerLogo from '../../assests/images/burger-logo.png';
import classes from "./Logo.module.css"
const logo = (props)=> {
    return (
        <div className={classes.Logo}>
            <img src={BurgerLogo} alt="Burger Logo" />
        </div>
    )
};

export default logo;
