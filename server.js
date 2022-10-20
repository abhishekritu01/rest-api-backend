const express = require('express')
const app = express()

import { APP_PORT, DB_URL } from './config'
import routes from './routes'
import errorHandler from './middlewares/errorHandler'
import mongoose from 'mongoose'
import path from 'path';

// const mongoose = require("mongoose");

// Database connection
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    // useFindAndModify: false,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('DB connected...');
});

global.appRoot = path.resolve(__dirname);
app.use(express.urlencoded({extended:false}));




app.use(express.json());         //use for enable json data  
app.use('/api', routes);
app.use('/uploads',express.static('uploads'))

app.use(errorHandler);
app.listen(APP_PORT, () => {
    console.log(` app listening on port ${APP_PORT}`)
})
