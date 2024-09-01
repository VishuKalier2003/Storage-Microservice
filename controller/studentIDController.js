const express = require('express');
const connection = require('../database/studentList');
const studentMap = require('../model/studentID');

const router = express.Router();

router.get('/find/id', async(req, res) => {
    try{
        await connection();
        const name = req.body.name;
        const password = req.body.age;
        if(!name || !password)   return res.status(400).send("No complete credentials send !!");
        let student = studentMap.findOne({name : name, password : password});
        if(!student) {
            res.status(200).json(student);
        }
        else res.status(503).send("No such student !!");
    }
    catch(error) {
        res.status(400).send(error);
    }
});

router.get('/find/password', async(req, res) => {
    try{
        await connection();
        const id = req.body.studentID;
        if(!id)   return res.status(400).send("No complete credentials send !!");
        let student = studentMap.findOne({studentID : id});
        if(!student) {
            res.status(200).json(student);
        }
        else res.status(503).send("No such student !!");
    }
    catch(error) {
        res.status(400).send(error);
    }
})

module.exports = router;