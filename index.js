const express = require('express');
const axios = require('axios');
const app = express();
const routerStudentList = require('../storage/controller/studentListController');
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(routerStudentList);

app.get('/', async(req, res) => {
    res.status(200).json({"key" : "passed"});
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});