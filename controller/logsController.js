const express = require('express');
const logs = require('../model/logs');
const middleware = require('../middleware/studentWare');
const connection = require('../database/studentList');

const router = express.Router();

//! POST    
router.post('/log', async (req, res) => {
    try{
        console.log("logs start");
        const data = req.body;
        // Create the schema...
        const log = new logs({
            log : `${data.type} request from ${data.path}`,
            time : data.time
        });
        await log.save();       // saving the data into the database...
        console.log("logs completed !!");
        await res.send("Everything ok !!");
    }
    catch(error) {
        console.log("Error : "+error);
        await res.status(400).send("Error Occured while Logging !!");
    }
});

//! GET    
router.get('/log/getAll', middleware.adminSender, async(req, res) => {
    try {
        await connection();
        // Getting all logs...
        const data = await logs.find();
        res.send(data);
    }
    catch(error) {
        console.log(error);
        res.sendStatus(400);
    }
})

// exporting the routes...
module.exports = router;