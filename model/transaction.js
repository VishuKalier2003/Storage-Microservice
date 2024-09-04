const Mongoose = require('mongoose');

const storeConnection = require('../database/stores');

const storeSchema = new Mongoose.Schema({
    transactionID : {type : "String", required : true},
    transactionType : {type : "Number", required : true},
    amount : {type : "Number", required : true},
    from : {type : "String", required : true},
    to : {type : "String", required : true},
    time : {type : "Date", required : true}
});

const stores = storeConnection.model('stores', storeSchema);
module.exports = stores;