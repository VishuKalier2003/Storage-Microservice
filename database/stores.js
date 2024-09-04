const mongoose = require('mongoose');

const storeConnection = mongoose.createConnection('mongodb+srv://root:root@transactions.a9sgi.mongodb.net/stores');

module.exports = storeConnection;