const express = require('express');
const connection = require('../database/studentList');
const student = require('../model/student');
const middleware = require('../middleware/studentWare');
const studentHelper = require('../helper/studentHelper');
const {logRequests} = require('../helper/logsHelper');

// Routing the necessary api's...
const router = express.Router();

/** Each Function maintains a log */

//! GET    
router.get('/student/getOwn', middleware.studentSender, async (req, res) => {
    try {
        // After passing the middleware...
        await connection();
        const stuId = req.body?.studentID;
        // Extract the element with the given studentID...
        const dataJSON = await student.findOne({studentID : stuId});
        await logRequests('GET', '/student/getOwn', res);
        // Then, we extract only the required parameters...
        res.send(`${dataJSON.name} with ID ${dataJSON.studentID} and age ${dataJSON.age} is present in Storage !!`);
    }
    catch(e) {
        console.log("Error : "+e);
        res.status(500).send("Database connection failed !!");
    }
});

//! GET    
router.get('/student/getAll', middleware.adminSender, async(req, res) => {
    try {
        await connection();
        const data = await student.find();      // Extracting all students...
        await logRequests('GET', '/student/getAll', res);
        res.send(data);
    }
    catch(error) {
        console.log(error);
        res.status(500).send("Database connection failed !!");
    }
});

//! POST    
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
        // Generate the studentID...
        studentData.studentID = studentHelper.generateStudentID(dataBody.name);
        // Generate the accountID...
        studentData.accID = studentHelper.generateAccID(dataBody.accNo);
        await studentData.save();  // Update the student details into the database...
        await logRequests('POST', '/student/add', res);
        res.status(200).send("Student data pushed !!"); // Return the saved student data with a 201 status...
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Database connection or saving failed');
    }
});

//! DELETE    
router.delete('/student/clear', middleware.adminSender, async(req, res) => {
    try {
        await connection();
        const result = await student.deleteMany({});        // Clear all entries...
        await logRequests('DELETE', '/student/clear', res);
        res.status(200).send(`${result.deletedCount} students cleared from database !!`);
    }
    catch(error) {
        console.log("Error :"+error);
        res.status(500).send("Database Error !!");
    }
})

// Exporting all the routes...
module.exports = router;