const express = require('express');
const connection = require('../database/studentList');
const student = require('../model/student');
const middleware = require('../middleware/studentWare');
const studentHelper = require('../helper/studentHelper');
const {logRequests} = require('../helper/logsHelper');

const router = express.Router();

router.get('/student/getOwn', middleware.studentSender, async (req, res) => {
    try {

        await connection();
        const stuId = req.body?.studentID;
        const dataJSON = await student.findOne({studentID : stuId});
        await logRequests('GET', '/student/getOwn', res);
        res.send(`${dataJSON.name} with ID ${dataJSON.studentID} and age ${dataJSON.age} is present in Storage !!`);
    }
    catch(e) {
        console.log("Error : "+e);
        res.status(500).send("Database connection failed !!");
    }
});

router.get('/student/getAll', middleware.adminSender, async(req, res) => {
    try {
        await connection();
        const data = await student.find();
        await logRequests('GET', '/student/getAll', res);
        res.send(data);
    }
    catch(error) {
        console.log(error);
        res.status(500).send("Database connection failed !!");
    }
});

router.post('/student/add', async (req, res) => {
    try {
        console.log("main started !!");
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
        studentData.studentID = studentHelper.generateStudentID(dataBody.name);
        studentData.accID = studentHelper.generateAccID(dataBody.accNo);
        const savedStudent = await studentData.save();
        await logRequests('POST', '/student/add', res);
        console.log("main ended !!");
        res.status(200).send("Student data pushed !!"); // Return the saved student data with a 201 status...
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Database connection or saving failed');
    }
});

router.delete('/student/clear', middleware.adminSender, async(req, res) => {
    try {
        await connection();
        const result = await student.deleteMany({});
        await logRequests('DELETE', '/student/clear', res);
        res.status(200).send(`${result.deletedCount} students cleared from database !!`);
    }
    catch(error) {
        console.log("Error :"+error);
        res.status(500).send("Database Error !!");
    }
})

module.exports = router;