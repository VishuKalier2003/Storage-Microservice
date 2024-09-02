const mongoose = require('mongoose');

const studentListConnection = mongoose.createConnection('mongodb+srv://root:root@storage.a9sgi.mongodb.net/studentList');

module.exports = studentListConnection;
