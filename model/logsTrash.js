// import mongoose...

const Mongoose = require('mongoose');
const studentConnection = require('../database/trash');

// Define the log Schema...

const logSchema = new Mongoose.Schema({
    log : {type : "String", required : true},
    time : {type : "String", required : true},
    logtype : {type : "String", required : true}
});

// Document named as log(s)...

const LogsTrash = studentConnection.model("log", logSchema);
module.exports = LogsTrash;