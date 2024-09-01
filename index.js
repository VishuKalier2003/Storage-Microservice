const express = require('express');
const axios = require('axios');
const app = express();
const routerStudentList = require('./controller/studentListController');
const routerLogs = require('./controller/logsController');
const port = process.env.PORT || 8000;

app.use(express.json());
// student Controller routes...
app.use(routerStudentList);
// log Controller routes...
app.use(routerLogs);

app.get('/', async(req, res) => {
    res.status(200).send("Entered the Storage Microservice !!");
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});