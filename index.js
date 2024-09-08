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

app.use(cors({
    origin: ['http://localhost:3000', 'https://front-end-microservice-student-purchase.vercel.app'], // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
    credentials: true, // Allow credentials (e.g., cookies, authorization headers)
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow custom headers
  }));
// student Controller routes...
app.use(routerStudentList);
// log Controller routes...
app.use(routerLogs);
app.use(routerStudentID);
app.use(routerAdmin);
app.use(routerProduct);
app.use(routerTransaction);
// Search Engine route...
app.use(searchEngine);

app.options('/student/add', cors()); // Handle OPTIONS request
app.options('/student/getAll', cors());

app.get('/', async(req, res) => {
    res.status(200).send("Entered the Storage Microservice !!");
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});