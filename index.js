const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const cors = require('cors');

dotenv.config()

//setup server

const app = express();
const PORT = 5000;
app.listen(PORT,() => {
    console.log('server is up!')
})

app.use(express.json())
app.use(cors({
    credentials: true
}))

//connect mongodb

mongoose.connect(process.env.DB,(err) => {
    if(err) return console.log('db err',err)
    console.log('mongo db connected')
})

app.use("/main",require('./routers/userRouter'))