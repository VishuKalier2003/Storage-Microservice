// Mongoose model...
const Mongoose = require('mongoose');

// Student to StudentID mapping...

const studentIDSchema = new Mongoose.Schema({
    name : {type : String, required : true},
    studentID : {type : String, required : true},
    password : {type : String, required : true}
});

// Mapping of the studentMap...
module.exports = Mongoose.model('studentMap', studentIDSchema);