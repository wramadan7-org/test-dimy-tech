const httpStatus = require('http-status');
const {
  createPaymentMethodModel,
  getAllPaymentMethodModel,
  getPaymentMethodByIdModel,
  updatePaymentMethodByIdModel,
  deletPaymentMethodByIdModel,
} = require('../models/PaymentMethodModel');

const createPaymentMethodController = async (req, res) => {
  try {
    const requestBody = req.body;

    const paymentMethod = await createPaymentMethodModel(requestBody);

    const [rows, fields] = paymentMethod;

    if (!rows.affectedRows) return res.sendWrapped('Fail to create product', {}, httpStatus.CONFLICT);

    const data = {
      id: rows.insertId,
      ...requestBody,
    };

    res.sendWrapped('Success create payment method', data, httpStatus.CREATED);
  } catch (error) {
    throw error;
  }
};

const getAllPaymentMethodController = async (req, res) => {
  try {
    const paymentmethod = await getAllPaymentMethodModel();

    const [rows, fields] = paymentmethod;

    res.sendWrapped('List of payment method', rows, httpStatus.OK);
  } catch (error) {
    throw error;
  }
}

const getPaymentMethodByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const paymentMethod = await getPaymentMethodByIdModel(id);

    const [rows, fields] = paymentMethod;

    if (!rows || !rows.length) return res.sendWrapped('Not found', {}, httpStatus.NOT_FOUND);

    res.sendWrapped(`Payment method with ID ${id}`, rows[0], httpStatus.OK);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createPaymentMethodController,
  getAllPaymentMethodController,
  getPaymentMethodByIdController
};
