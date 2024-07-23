const mongoose = require("../config/dbConfig");
const {isEmail} = require('validator')
const verifyCodeSchema = mongoose.Schema({
    verifyCode:{type: 'number', required: true, unique: true },
    userId: {type: 'string', required: false}
},{ timestamps: true })
module.exports = mongoose.model("verifyCode",verifyCodeSchema)