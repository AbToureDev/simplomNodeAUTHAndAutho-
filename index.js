const express = require("express");
const {specs, swaggerUi} = require("./config/swagger")
require('dotenv').config();
const cors = require('cors')
const bodyParser = require('body-parser')
const corsConfig = require("./config/corsConfig");
const authRoute = require('./routes/AuthRoute');
const user = require('./routes/userRoute');
const product = require('./routes/ProductRoot');
const app = express();
const port = process.env.PORT || 5000;
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(cors(corsConfig));
app.use(express.json());
app.use('/user', user);
app.use('/product', product);
app.use('/auth', authRoute);

app.get('/', (req, res) =>{
    res.send('welcome page');
})

const server = app.listen(port,()=> {
    console.log(`listening on port ${port}`)
})
module.exports = server;