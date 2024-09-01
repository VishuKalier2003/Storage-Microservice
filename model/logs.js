const Mongoose = require('mongoose');

const logSchema = new Mongoose.Schema({
    log : {type : "String", required : true},
    time : {type : "String", required : true}
});

module.exports = Mongoose.model("log", logSchema);