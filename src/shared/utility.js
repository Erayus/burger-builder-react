export const updateObject = (oldObject, newProperties) => {
    return {
        ...oldObject,
        ...newProperties
    }
};

export const checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required){
        isValid = value.trim() !== '' && isValid ; //.trim() removes any whitespace
    }

    if (rules.minLength){
        isValid = value.length >= rules.minLength && isValid ;
    }

    if (rules.maxLength){
        isValid = value.length <= rules.minLength && isValid;
    }

    if (rules.isEmail) {
        const pattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid;
    }

    return isValid;

}