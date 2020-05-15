require('dotenv').config()


const mongoose = require("mongoose")
const express = require("express")
const app = express();

mongoose.connect(process.env.DATABASE,{ 
    useNewUrlParser: true, 
    useCreateIndex: true,
    useCreateIndex: true, 
}).then(() => {
    console.log("DB CONNECTED")
}).catch(console.log("DB GOT OOPSS"))

const port = 8000;

app.listen(port, () => {
    console.log(`app is running at ${port}`)
})