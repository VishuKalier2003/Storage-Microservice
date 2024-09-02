const mongoose = require('mongoose');

const adminConnection = mongoose.createConnection('mongodb+srv://root:root@storage.a9sgi.mongodb.net/admin');

module.exports = adminConnection;
