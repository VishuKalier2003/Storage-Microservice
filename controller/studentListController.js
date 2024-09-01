const express = require('express');
const connection = require('../database/studentList');
const student = require('../model/student');
const middleware = require('../middleware/studentWare');

const router = express.Router();

router.get('/student/getAll', middleware.studentSender, async (req, res) => {
    try {
        await connection();
        const dataJSON = await student.find();
        res.json(dataJSON);
    }
    catch(e) {
        console.log("Error : "+e);
        res.status(500).send("Database connection failed !!");
    }
});

router.post('/student/add', async (req, res) => {
    try {
        await connection(); // Ensure the connection is awaited...
        const dataBody = req.body;

        const studentData = new student({
            name : dataBody.name,
            accNo : dataBody.accNo,
            age : dataBody.age,
            studentID : dataBody.studentID | undefined,
            accID : dataBody.accID | undefined,
            monCredit : dataBody.monCredit | undefined,
            monDebit : dataBody.monDebit | undefined
        });
        const savedStudent = await studentData.save();
        res.status(201).json(savedStudent); // Return the saved student data with a 201 status...
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Database connection or saving failed');
    }
});

router.delete('/student/clear', middleware.adminSender, async(req, res) => {
    try {
        await connection();
        const result = await student.deleteMany({});
        res.status(200).send(`${result.deletedCount} students cleared from database !!`);
    }
    catch(error) {
        console.log("Error :"+error);
        res.status(500).send("Database Error !!");
    }
})

module.exports = router;