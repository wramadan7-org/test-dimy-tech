const httpStatus = require('http-status');
const { createCustomerModel, getAllCustomerModel, getCustomerByIdModel } = require('../models/CustomerModel');

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

const getAllCustomerController = async (req, res) => {
  try {
    const customers = await getAllCustomerModel();

    const [rows, fields] = customers;

    res.sendWrapped('List of customer', rows, httpStatus.OK);
  } catch (error) {
    throw error;
  }
};

const getCustomerByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await getCustomerByIdModel(id);

    const [rows, fields] = customer;

    if (!rows || !rows.length) return res.sendWrapped('Not found', {}, httpStatus.NOT_FOUND);

    res.sendWrapped(`Customer with ID ${id}`, rows[0], httpStatus.OK);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createCustomerController,
  getAllCustomerController,
  getCustomerByIdController,
};
