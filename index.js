// Import necessary modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const routes = require('./routes/book.route');

const app = express();
const PORT = process.env.PORT || 3000;

// Body parser
app.use(bodyParser.json());

// CORS middleware
app.use(cors());

// Books routes
app.use('/books', routes);

// server Creation
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
