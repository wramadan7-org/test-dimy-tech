const httpStatus = require('http-status');
const { getCustomerAddressByIdModel } = require('../models/CustomerAddressModel');
const { createOrderModel } = require('../models/OrderModel');

const createOrderController = async (req, res) => {
  try {
    const { customer_address_id } = req.params;
    const requestBody = req.body;

    const isCustomerAddressValid = await getCustomerAddressByIdModel(customer_address_id);

    const [rowsCustomerAddress, fieldsCustomerAddress] = isCustomerAddressValid;

    if (!rowsCustomerAddress || !rowsCustomerAddress.length) return res.sendWrapped('Not found', {}, httpStatus.NOT_FOUND);

    const mapBody = requestBody.map((o) => {
      const data = {
        customer_address_id: parseInt(customer_address_id),
        ...o,
      };

      return data;
    });

    res.sendWrapped('Order successfully', mapBody, httpStatus.CREATED);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createOrderController,
};
