// import mongoose...

const Mongoose = require('mongoose');
const studentConnection = require('../database/studentList');

// Define the log Schema...

const logSchema = new Mongoose.Schema({
    log : {type : "String", required : true},
    time : {type : "String", required : true},
    logtype : {type : "String", required : true}
});

// Document named as log(s)...

const Logss = studentConnection.model("log", logSchema);
module.exports = Logss;