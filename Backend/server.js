const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const createError = require('http-errors');

// Connect with MongoDB
mongoose
  .connect('mongodb://localhost:27017/test')
  .then((x) => {
    console.log(`Connected to MongoDB! Database name: "${x.connection.name}"`);
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message || err);
  });

// Setting up port with Express.js
const employeeRoute = require('./routes/employee.route');  // Adjust the path as necessary
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(express.static(path.join(__dirname, 'dist/tutorial')));
app.use('/', express.static(path.join(__dirname, 'dist/tutorial')));
app.use('/api', employeeRoute);

// Create port
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log('Connected to port ' + port);
});

// Handle 404 - Not Found
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error status code:', err.status || 500);
  console.error('Error message:', err.message);
  console.error('Stack trace:', err.stack);

  res.status(err.status || 500).json({
    error: {
      message: err.message,
    },
  });
});
