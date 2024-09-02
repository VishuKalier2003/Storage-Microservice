const Mongoose = require('mongoose');

const adminConnect = require('../database/admin');

const adminSchema = new Mongoose.Schema({
    name : {type : String, required : true}
});

const adminss = adminConnect.model('admins', adminSchema);
module.exports = adminss;