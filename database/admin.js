const mongoose = require('mongoose');

const adminConnection = mongoose.createConnection('mongodb+srv://root:root@storage.a9sgi.mongodb.net/adminStore', {
    serverSelectionTimeoutMS: 5000 // Timeout after 5 seconds...
});

module.exports = adminConnection;
