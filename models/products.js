const mongoose = require("../config/dbConfig");
const ProductSchema = mongoose.Schema({
    name:{type: 'string', required: true},
    description:{type: 'string', required: true},
    categoryType:{type: 'string', required: true},
    price:{type: 'decimal', required: true},
    isInStock:{type: 'boolean', required: false, default: false},
    userId: {type: 'string', required: false}
},{ timestamps: true })
module.exports = mongoose.model("products",ProductSchema)