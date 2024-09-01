// import mongoose...

const Mongoose = require('mongoose');

// Define the log Schema...

const logSchema = new Mongoose.Schema({
    log : {type : "String", required : true},
    time : {type : "String", required : true}
});

// Document named as log(s)...

module.exports = Mongoose.model("log", logSchema);