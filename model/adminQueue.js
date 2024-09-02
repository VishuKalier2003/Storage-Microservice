const Mongoose = require('mongoose');
const adminDB = require('../database/admin');

const adminQueueSchema = new Mongoose.Schema({
    name : {type : String, required : true},
    password : {type : String, required : true},
    votes : {type : Number},
    voters : {type : []}
});

const adminQueues = adminDB.model('adminQueue', adminQueueSchema);
module.exports = adminQueues;