const mongoose = require("../config/dbConfig");
const {isEmail} = require('validator')
const userSchema = mongoose.Schema({
    email:{type: 'string', required: true, unique: true, validate:[isEmail]},
    firstName:{type: 'string', required: true},
    lastName:{type: 'string', required: true},
    password:{type: 'string', required: true},
    isEmailVerified:{type: 'boolean', required: false, default: false},
    isActive:{type: 'boolean', required: false, default: false},
    role: {type: 'string', enum: ['admin', 'customer'], default: 'customer'}
},{ timestamps: true })
module.exports = mongoose.model("User",userSchema)