const express = require('express');
const connection = require('../database/studentList');
const studentMap = require('../model/studentID');

const router = express.Router();

router.get('/find/id', async(req, res) => {
    try {
        await connection();
        const { name, password } = req.body; // Destructuring the request body
        if (!name || !password) {
            return res.status(400).send("Incomplete credentials sent!!");
        }
        // Await the findOne operation...
        let student = await studentMap.findOne({ name: name, password: password });
        if (!student) {
            return res.status(404).send("No such student found!!");
        } else {
            return res.status(200).json({"studentID" : student.studentID}); // If student is found, send it back
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error"); // 500 for unexpected server errors
    }
});


router.get('/find/password', async(req, res) => {
    try{
        await connection();
        const id = req.body?.studentID;
        if(!id)   return res.status(400).send("No complete credentials send !!");
        // Asynchronous hence wait it for querying, otherwise will be null...
        let student = await studentMap.findOne({studentID : id});
        if(!student) {
            return res.status(503).json("No such student exists !!");
        }
        else res.status(200).json({
            "name" : student.name,
            "password" : student.password
        });
    }
    catch(error) {
        res.status(400).send(error);
    }
})

module.exports = router;