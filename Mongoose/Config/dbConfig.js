const mongoose = require("mongoose")

const dbConn = async ()=>{
    try {
        mongoose.connect("mongodb+srv://khouloud:khouloud@cluster0.ygzpech.mongodb.net/Film")
        console.log("connected to DB")
    } catch (error) {
        console.log(error);
        
        
    }
}

module.exports = dbConn