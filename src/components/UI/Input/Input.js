import React from  'react';
import classes from "./Input.module.css"

const input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement]
    let errorMessage = null;
    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid);
        errorMessage = <span style={{color: 'red'}}>Please input a valid value</span>
    }

    switch (props.elementType){
        case('input'):
            inputElement = <input className={inputClasses.join(' ')} 
                                  {...props.elementConfig}
                                  onChange={props.changed}
                                            value={props.value}/>;
            break;
        case('textarea'):
            inputElement = <textarea  className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>;
            break;
        case('select'):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option value={option.value} key={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                

                </select>
            )
            break;
        default:
            inputElement = <input 
                            className={inputClasses.join(' ')}
                            {...props.elementConfig}
                            onChange={props.changed}
                            value={props.value}/>
            break;
    }

    return (
        <div className={classes.Input}> 
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {errorMessage}
        </div>
    )
    
}
export default input;