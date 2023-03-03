const httpStatus = require('http-status');
const {
  createCustomerAddressModel,
  getAllCustomerAddressModel,
  getCustomerAddressByIdModel,
  updateCustomerAddressByIdModel,
  deleteCustomerAddressByIdModel
} = require('../models/CustomerAddressModel');
const {
  getCustomerByIdModel
} = require('../models/CustomerModel');

const createCustomerAddressController = async (req, res) => {
  try {
    const requestBody = req.body;

    const isCustomerValid = await getCustomerByIdModel(requestBody.customer_id);

    const [rows, fields] = isCustomerValid;

    if (!rows || !rows.length) return res.sendWrapped('Customer not found', {}, httpStatus.NOT_FOUND);

    const customerAddress = await createCustomerAddressModel(requestBody);

    if (!customerAddress[0] || !customerAddress[0].affectedRows) return res.sendWrapped('Fail to create customer addres', {}, httpStatus.CONFLICT);

    const data = {
      ...requestBody,
      customer: rows[0],
    };

    res.sendWrapped('Success create customer address', data, httpStatus.CREATED);
  } catch (error) {
    throw error;
  }
};

const getAllCustomerAddressController = async (req, res) => {
  const customerAddresses = await getAllCustomerAddressModel();

  const [rows, fields] = customerAddresses;

  const mapRows = rows.map((o) => {
    const data = {
      id: o.id,
      customer_id: o.customer_id,
      address: o.address,
      customer: {
        id: o.customer_id,
        customer_name: o.customer_name,
      }
    };

    return data;
  });

  res.sendWrapped('List customer address', mapRows, httpStatus.OK);
};

module.exports = {
  createCustomerAddressController,
  getAllCustomerAddressController,
}
