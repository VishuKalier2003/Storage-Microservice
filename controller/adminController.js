const express = require('express');
const adminQueue = require('../model/adminQueue');
const admin = require('../model/admin');
const middleware = require('../middleware/studentWare');
const adminWare = require('../middleware/adminWare');

const router = express.Router();

router.post('/admin/add', adminWare.adminSender, async(req, res) => {
    try{
        const name = req.body.newAdmin.name;
        const password = req.body.newAdmin.password;
        const newAdminQueue = new adminQueue({
            name : name,
            password : password,
            votes : 0,
            voters : []
        });
        await newAdminQueue.save();
        res.status(200).send("Admin Queue updated !!");
    }
    catch(e) {console.log(e);}
});

router.post('/admin/vote', middleware.studentSender, async(req, res) => {
    try {
        const name = req.body.name;
        const studentID = req.body.studentID;
        let neta = await adminQueue.findOne({name : name});
        neta.votes++;
        neta.voters.push(studentID);
        await neta.save();
    }
    catch(e) {console.log("Error in voting : "+e);}
});

router.get('/admin/getQueueAll', middleware.adminSender, async(req, res) => {
    try{
        const data = await adminQueue.find();
        res.status(200).json(data);
    }
    catch(e) {console.log(e);}
});

router.get('/admin/getAll', middleware.constAdminSender, async(req, res) => {
    try{
        const data = await admin.find();
        res.status(200).json(data);
    }
    catch(e) {console.log(e);}
});

async function updateAdmin() {
    try {
    const majorNeta = await adminQueue.find({votes : {$gt : 2}});
    if(majorNeta.length > 0) {
        for(let i = 0; i < majorNeta.length; i++) {
            const neta = majorNeta[i];
            const newAdmin = new admin({
                name : neta.name
            });
            await newAdmin.save();
        }
        const res = await adminQueue.deleteMany({votes : {$gt : 2}});
        console.log("Entries became admin : "+res.deletedCount);
    }
    }
    catch(e) {console.log(e);}
}

setInterval(updateAdmin, 60000);

module.exports = router;