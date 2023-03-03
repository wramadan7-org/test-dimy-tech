const db = require('../configurations/db');

/**
 * Model create customer address
 * @param {Object} param0 
 * @returns Array
 */
const createCustomerAddressModel = async ({customer_id, address}) => {
  try {
    const customer = await (await db).execute('INSERT INTO customer_address (customer_id, address) VALUES (?, ?)', [customer_id, address]);

    return customer;
  } catch (error) {
    throw error;
  }
};

/**
 * Model get all customer address
 * @returns Array
 */
const getAllCustomerAddressModel = async () => {
  const customerAddresses = await (await db).execute('SELECT customer_address.id, customer_address.address, customer_address.customer_id, customer.customer_name FROM customer_address INNER JOIN customer ON customer_address.customer_id = customer.id');

  return customerAddresses;
}

/**
 * Model get customer by ID
 * @param {Number} id 
 * @returns Array
 */
const getCustomerAddressByIdModel = async (id) => {
  try {
    const customer = await (await db).execute('SELECT * FROM customer_address WHERE id = ?', [id]);
  
    return customer;
  } catch (error) {
    throw error;
  }
};

/**
 * Model update customer address by ID
 * @param {Number} id 
 * @param {Object} param1 
 * @returns Array
 */
const updateCustomerAddressByIdModel = async (id, {customer_id, address}) => {
  try {
    const customer = await (await db).execute('UPDATE customer SET customer_id = ?, address = ? WHERE id = ?', [customer_id, address, id]);
  
    return customer;
  } catch (error) {
    throw error;
  }
};

/**
 * Model delete customer address by ID
 * @param {Number} id 
 * @returns Array
 */
const deleteCustomerAddressByIdModel = async (id) => {
  try {
    const customer = await (await db).execute('DELETE FROM customer_address WHERE id = ?', [id]);
  
    return customer;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createCustomerAddressModel,
  getAllCustomerAddressModel,
  getCustomerAddressByIdModel,
  updateCustomerAddressByIdModel,
  deleteCustomerAddressByIdModel
};
