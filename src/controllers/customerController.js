const httpStatus = require('http-status');
const { createCustomerModel } = require('../models/CustomerModel');

const createCustomerController = async (req, res) => {
  try {
    const requestBody = req.body;

    const customer = await createCustomerModel(requestBody);

    const [rows, fields] = customer;

    if (!rows || !rows.affectedRows) return res.sendWrapped('Fail to create customer', {}, httpStatus.CONFLICT);

    const data = {
      id: rows.insertId,
      ...requestBody,
    };

    res.sendWrapped('Success create customer', data, httpStatus.CREATED);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createCustomerController,
};
