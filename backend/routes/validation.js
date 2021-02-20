const isEmpty = require('is-empty');

function validateRegistration(data){
    let errors = {}
    //check if data is empty
    if(isEmpty(data)){
        errors.err = "no data provided";
    }
    //convert values to string to check for length
    const name = data.username + ''
    const password = data.password + ''

    if(name.length <= 0){
        errors.username = "name must be provided"
    }

    if(password.length <= 0){
        errors.password = "password must be provided"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
/*
function validateLogin(data){
    let errors = {}

    const name = data.name + ''
    const password = data.password + ''

    console.log(name)
    console.log(password)

    return {
        errors,
        isValid: isEmpty(errors)
    }
}*/

exports.validateRegistration = validateRegistration;
//exports.validateLogin = validateLogin;