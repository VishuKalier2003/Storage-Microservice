const express = require('express');
const app = express();
const cors = require('cors');
const routerStudentList = require('./controller/studentListController');
const routerLogs = require('./controller/logsController');
const routerStudentID = require('./controller/studentIDController');
const routerAdmin = require('./controller/adminController');
const searchEngine = require('./tool/searchEngine');
const routerProduct = require('./controller/productController');
const routerTransaction = require('./controller/transactionController');
const port = process.env.PORT || 8000;

app.use(express.json());

// Routes definitions
app.use(routerStudentList);
app.use(routerLogs);
app.use(routerStudentID);
app.use(routerAdmin);
app.use(routerProduct);
app.use(routerTransaction);
app.use(searchEngine);

// Health check route
app.get('/', async(req, res) => {
    res.status(200).send("Entered the Storage Microservice !!");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
