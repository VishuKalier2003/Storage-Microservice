const Mongoose = require("mongoose");

// Defining the student Schema for the database...

const StudentSchema = new Mongoose.Schema({
    name : {type : String, required : true},
    studentID : {type : String},
    accNo : {type : String, required : true},
    age : {type : Number, required : true},
    accID : {type : String},
    monCredit : {type : Number},
    monDebit : {type : Number},
    query : {type : Number, required : false}
});

// Mongoose Schema imported...

// Document named as student(s)...
module.exports = Mongoose.model('student', StudentSchema);