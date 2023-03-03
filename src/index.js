require('dotenv').config();
const express = require('express');
const cors = require('cors');
const httpStatus = require('http-status');
const routeV1 = require('./routes/v1/index');
const database = require('./configurations/db');

const app = express();
const { NODE_PORT } = process.env;

app.use(cors());
app.options('*', cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Wrap response
app.response.sendWrapped = function (message, data, statusCode = httpStatus.OK) {
  return this.status(statusCode).send({
    status: statusCode,
    message,
    data
  });
};

app.use('/v1', routeV1);

// Connect database
const connectDB = async () => {
  try {
    const [rows, fields] = await (await database).execute('SELECT 1 + 1 AS solution');
    const { solution } = rows;
    
    console.log('Connect DB successfully');
  } catch (error) {
    throw error;
  }
};

connectDB();

app.listen(NODE_PORT, () => {
  console.log(`Server running at port ${NODE_PORT}`);
});

module.exports = app;
