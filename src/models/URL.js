const mongoose = require('mongoose')
const URLSchema = new mongoose.Schema({
    urlCode: {type: String, require: true}, 
    longUrl: String,
    shortUrl: String,
    date: {type: String, default: Date.now}
})

module.exports = mongoose.model('URL', URLSchema)