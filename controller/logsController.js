const express = require('express');
const Log = require('../model/logs');  // Updated import for the Log model
const middleware = require('../middleware/studentWare');  // Middleware for authorization

const router = express.Router();

// POST endpoint to create a log entry
router.post('/log', async (req, res) => {
    try {
        console.log("logs start");
        const data = req.body;
        
        // Create the log entry
        const log = new Log({
            log: `${data.type} request from ${data.path}`,
            time: data.time
        });
        
        await log.save();  // Save the log entry to the database
        console.log("logs completed !!");
        res.send("Everything ok !!");
    } catch (error) {
        console.log("Error: " + error);
        res.status(400).send("Error Occurred while Logging !!");
    }
});

// GET endpoint to retrieve all log entries (admin access only)
router.get('/log/getAll', middleware.adminSender, async (req, res) => {
    try {
        // Get all logs
        const data = await Log.find();
        res.send(data);
    } catch (error) {
        console.log("Error: " + error);
        res.status(400).send("Error retrieving logs");
    }
});

router.delete('/log/clear', middleware.adminSender, async (req, res) => {
    try {
        const data = await Log.deleteMany({});
        res.send(`${data.deletedCount} logs sent to bin !!`);
    }
    catch(error) {
        res.status(400).send("Error while deleting : "+error);
    }
})

module.exports = router;
