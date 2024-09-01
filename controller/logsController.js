const express = require('express');
const logs = require('../model/logs');
const middleware = require('../middleware/studentWare');
const connection = require('../database/studentList');

const router = express.Router();

router.post('/log', async (req, res) => {
    try{
        console.log("Logs called");
        const data = req.body;
        const log = new logs({
            log : `${data.type} request from ${data.path}`,
            time : data.time
        });
        const logger = await log.save();
        console.log("logs completed !!");
    }
    catch(error) {
        console.log("Error : "+error);
        res.send(400).send("Error Occured while Logging !!");
    }
    res.sendStatus(200);
});

router.get('/log/getAll', middleware.adminSender, async(req, res) => {
    try {
        await connection();
        const data = await logs.find();
        res.send(data);
    }
    catch(error) {
        console.log(error);
        res.sendStatus(400);
    }
})

module.exports = router;