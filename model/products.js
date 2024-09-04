const Mongoose = require('mongoose');

const storeConnection = require('../database/stores');

const storeSchema = new Mongoose.Schema({
    product : {type : "String", required : true},
    totalCost : {type : "Number", required : true},
    cost : {type : []}
});

const stores = storeConnection.model('stores', storeSchema);
module.exports = stores;