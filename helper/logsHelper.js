const axios = require('axios');

async function logRequests(type, path, res) {
    const logData = {
        type : type,
        path : path,
        time : new Date().toISOString()
    }
    try {
        console.log("Helper called !!");
        await axios.post('http://localhost:8000/log', logData);
        console.log("Helper completed !!");
    }
    catch(error) {
        res.send(400).send(error);
    }
}

module.exports = { logRequests }