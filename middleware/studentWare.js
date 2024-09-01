const connect = require('../database/studentList');
const student = require('../model/student');

function adminSender(req, res, next) {
    // Ensure that req.query exists and contains the necessary properties
    const admin = req.body?.name;
    const id = req.body?.id;

    if (!admin || !id) {
        return res.status(400).json({ error: "Missing query parameters" });
    }

    // Checking if admin...
    if (admin === "Vishu Kalier" && id === "18082003") {
        next(); // Move to the function call (middleware passed)...
    } else {
        // Otherwise mark as access denied...
        res.status(403).json({ error: "Access denied: Invalid Credentials !!" });
    }
}

async function studentSender(req, res, next) {
    await connect();

    // Ensure that req.query exists and contains the necessary properties
    const studentId = req.body.studentID;

    if (!studentId) {
        return res.status(400).send("Missing studentID query parameter");
    }

    let stu = await student.findOne({ studentID: studentId });
    if (stu) {
        next();     // Pass the next function...
    } else {
        res.status(503).send("Not Found !!");
    }
}

// Importing the Middleware...
module.exports = {adminSender, studentSender };
