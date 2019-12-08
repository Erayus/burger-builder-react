import React from 'react';
import classes from "./Toolbar.module.css";
import Logo from"../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems"
const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <button className={classes.MobileOnly} onClick={props.openSideDrawer}>Toggle</button>
            <div className={[classes.Logo, classes.DesktopOnly].join(' ')}>
                <Logo/>
            </div>
            <h1 className={classes.Title}>The Burger Builder</h1>
            <nav className={classes.DesktopOnly}>
                <NavigationItems isAuthenticated={props.isAuth}/>
            </nav>
        </header>
    )
};

export default toolbar;
