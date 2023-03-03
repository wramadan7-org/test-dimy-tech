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
  try {
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
  } catch (error) {
    throw error;
  }
};

const getCustomerAddressByIdController = async (req, res) => {
  try {
    const { id } = req.params;
  
    const customerAddress = await getCustomerAddressByIdModel(id);
  
    const [rows, fields] = customerAddress;
  
    if (!rows || !rows.length) return res.sendWrapped('Not found', {}, httpStatus.NOT_FOUND);
  
    const data = {
      id: rows[0].id,
      customer_id: rows[0].customer_id,
      address: rows[0].address,
      customer: {
        id: rows[0].customer_id,
        customer_name: rows[0].customer_name,
      },
    };
  
    res.sendWrapped(`Customer with ID ${id}`, data, httpStatus.OK);
  } catch (error) {
    throw error;
  }
};


const updateCustomerAddressByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const requestBody = req.body;
  
    const isCustomerAddressValid = await getCustomerAddressByIdModel(id);
  
    const [rowsCustomerAddress, fieldsCustomerAddress] = isCustomerAddressValid;
  
    if (!rowsCustomerAddress || !rowsCustomerAddress.length) return res.sendWrapped('Not found', {}, httpStatus.NOT_FOUND);
  
    const isCustomerValid = await getCustomerByIdModel(requestBody.customer_id);
  
    const [rowsCustomer, fieldsCustomer] = isCustomerValid;
  
    if (!rowsCustomer || !rowsCustomer.length) return res.sendWrapped('Not found', {}, httpStatus.NOT_FOUND);
  
    const dataUpdate = {
      id: rowsCustomerAddress[0].id,
      customer_id: rowsCustomerAddress[0].customer_id,
      address: rowsCustomerAddress[0].address,
      ...requestBody,
    }
  
    const update = await updateCustomerAddressByIdModel(id, dataUpdate);
  
    if (!update || !update.length || !update[0].affectedRows) return res.sendWrapped('Fail to update customer address');
  
    const data = {
      ...dataUpdate,
      customer: {
        id: rowsCustomer[0].id,
        customer_name: rowsCustomer[0].customer_name
      },
    };
  
    res.sendWrapped('Update customer address successfully', data, httpStatus.OK);
  } catch (error) {
    throw error;
  }
};

const deleteCustomerAddressByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const customerAddress = await getCustomerAddressByIdModel(id);

    const [rows, fields] = customerAddress;

    if (!rows || !rows.length) return res.sendWrapped('Not found', {}, httpStatus.NOT_FOUND);

    await deleteCustomerAddressByIdModel(id);

    res.sendWrapped(`Customer address with ID ${id} deleted`, {}, httpStatus.OK);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createCustomerAddressController,
  getAllCustomerAddressController,
  getCustomerAddressByIdController,
  updateCustomerAddressByIdController,
  deleteCustomerAddressByIdController,
}
