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

// Allow requests from specified origins
app.use(cors({
  origin: ['http://localhost:3000', 'https://front-end-microservice-student-purchase.vercel.app'], // Allow specific origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these HTTP methods
  credentials: true, // Allow credentials (e.g., cookies, authorization headers)
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow custom headers
}));

// Handle preflight requests globally
app.options('*', cors()); // This handles preflight requests for all routes

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
