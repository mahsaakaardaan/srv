const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
    userId: {type: String},
    apiKey: {type: String},
    minTemp: {type: Number,default: 18},
    maxTemp: {type: Number,default: 23},
    minHum: {type: Number, default: 30},
    maxHum: {type: Number, default: 40},
    sensive: {type: Number, default: 1},
    phoneNumber: {type: String}
})

const Setting = mongoose.model("Setting",settingSchema);
module.exports = Setting; 