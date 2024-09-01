// Mongoose model...
const Mongoose = require('mongoose');

// Student to StudentID mapping...

const studentIDSchema = new Mongoose.Schema({
    name : {type : String},
    studentID : {type : String},
    password : {type : String}
});

// Mapping of the studentMap...
module.exports = Mongoose.model('studentMap', studentIDSchema);