// Middleware to check if the /student/getData is the admin only...

const connect = require('../database/studentList');
const student = require('../model/student');

function adminSender(req, res, next) {
    // Extracting input data...
    const admin = req.query.name;
    const id = req.query.id;

    // Checking if admin...
    if(admin === "Vishu Kalier" && id === "18082003")
        next();     // Move to the function call (middleware passed)...
    else    // Otherwise mark as access denied...
        res.status(403).json({error : "Access denied : Invalid Credentials !!"});
}

async function studentSender(req, res, next) {
    await connect();
    const studentId = req.query.studentID;
    let stu = await student.find({studentID : studentId});
    if(stu != null) {
        next();
        res.status(200).json(stu);
    }
    else    res.status(503).send("Not Found !!");
}

// Importing the Middleware...

module.exports = {adminSender, studentSender};