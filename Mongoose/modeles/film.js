const mongoose = require("mongoose")

const filmSchema = mongoose.Schema({

    title: String,
    rate: Number,
    date: Number,
    imgUrl: String,
    description: String,
    category: String


})

module.exports = mongoose.model('films', filmSchema, 'Films')