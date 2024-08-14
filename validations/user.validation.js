const joi = require('joi')
const userValidation = (user) => {
    const userSignUp = joi.object({
        firstName : joi.string().min(3).max(50).trim().required(),
        lastName : joi.string().min(3).max(50).trim().required(),
        email : joi.string().email().required(),
        password : joi.string().min(8).max(50).required()
    })
    const userSignIn = joi.object({
        email : joi.string().email().required(),
        password : joi.string().min(8).max(50).required()
    })
    return {
        userSignUp : userSignUp.validate(user),
        userSignIn : userSignIn.validate(user)
    }
}
module.exports = userValidation;