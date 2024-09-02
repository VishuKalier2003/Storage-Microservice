const mongoose = require('mongoose');

const trashConnection = mongoose.createConnection('mongodb+srv://root:root@storage.a9sgi.mongodb.net/trash');

module.exports = trashConnection;