const mongoose = require('mongoose');
mongoose.connect(process.env.LOCAL_CONNECT,{
    serverSelectionTimeoutMS:5000
})
mongoose.connection.on('connected', ()=> {
    console.log("connection a la base de donne.")
})
mongoose.connection.on('error', (error)=> {
    console.log("connection error:", error)
});
module.exports =mongoose;
