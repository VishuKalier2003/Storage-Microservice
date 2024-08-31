const mongoose = require('mongoose');

const connection = async () => {
    try {
        // Connecting the mongo DB server with database name mongoStudent...
        await mongoose.connect('mongodb+srv://root:root@storage.a9sgi.mongodb.net/studentList');
        console.log("Database connected !!");       // Logging statement for databse connection...
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error; // Propagate the error so that it can be handled in the calling function...
    }
}

// Export the database connection...

module.exports = connection;
