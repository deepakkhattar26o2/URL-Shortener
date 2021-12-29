const config = require('config')
const mongoose = require('mongoose')
const db = config.get('mongoURI')

const connect = async () =>{
    try{
        await mongoose.connect(db)
    }
    catch(err){
        console.error(err)
        process.exit(1)
    }
}
module.exports = connect
