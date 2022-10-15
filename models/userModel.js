const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: {type: String},
    password: {type: String}
})

const User = mongoose.model("user",userSchema)

module.exports = User