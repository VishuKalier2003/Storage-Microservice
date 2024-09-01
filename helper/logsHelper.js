const axios = require('axios');

// Function to create the log Requests...
async function logRequests(type, path, res) {
    const logData = {
        type : type,
        path : path,
        // Converting date to string format...
        time : new Date().toISOString()
    }
    try {
        // Using POST on deployed microservice url...
        await axios.post('https://storage-microservice-rxap.onrender.com/log', logData);
    }
    catch(error) {
        res.send(400).send(error);
    }
}

module.exports = { logRequests }