const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const cors = require('cors');

dotenv.config()

//setup server

const app = express();
const PORT = process.env.PORT || 80;

app.use(express.json())
app.use(cors({
    credentials: true
}))

app.listen(PORT, async () => {
    console.log(`server is up on ${PORT}!`);

    //connect mongodb
    try {
        await mongoose.connect(process.env.DB);
        console.log('mongo db connected')
    } catch (err) {
        console.log("can't connect to mongodb", err);
    }
})


app.use("/main", require('./routers/userRouter'))