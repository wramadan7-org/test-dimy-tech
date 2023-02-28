require('dotenv').config();
const express = require('express');
const cors = require('cors');
const httpStatus = require('http-status');

const app = express();
const { NODE_PORT } = process.env;

app.use(cors());
app.options('*', cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', async (req, res) => {
  const data = {
    status: httpStatus.OK,
    message: 'Success',
    data: {
      name: 'Wahu Ramadan',
      email: 'wramadan1203@gmail.com',
    },
  };

  res.status(httpStatus.OK).send(data);
});

app.listen(NODE_PORT, () => {
  console.log(`Server running at port ${NODE_PORT}`);
});

module.exports = app;
