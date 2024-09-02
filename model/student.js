const mongoose = require('mongoose');
const studentListConnection = require('../database/studentList');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    studentID: { type: String },
    accNo: { type: String, required: true },
    age: { type: Number, required: true },
    accID: { type: String },
    monCredit: { type: Number },
    monDebit: { type: Number }
});

const Student = studentListConnection.model('Student', studentSchema);
module.exports = Student;
