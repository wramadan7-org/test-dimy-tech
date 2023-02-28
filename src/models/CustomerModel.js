const db = require('../configurations/db');

/**
 * Model create customer
 * @param {Object} param0 
 * @returns Array
 */
const createCustomerModel = async ({customer_name}) => {
  try {
    const customer = await (await db).execute('INSERT INTO customer (customer_name) VALUES (?)', [customer_name]);

    return customer;
  } catch (error) {
    throw error;
  }
};

/**
 * Model get all customer
 * @returns Array
 */
const getAllCustomerModel = async () => (await db).execute('SELECT * FROM customer');

/**
 * Model get customer by ID
 * @param {Number} id 
 * @returns Array
 */
const getCustomerByIdModel = async (id) => {
  try {
    const customer = await (await db).execute('SELECT * FROM customer WHERE id = ?', [id]);
  
    return customer;
  } catch (error) {
    throw error;
  }
};

/**
 * Model update customer by ID
 * @param {Number} id 
 * @param {Object} param1 
 * @returns Array
 */
const updateCustomerByIdModel = async (id, {customer_name}) => {
  try {
    const customer = await (await db).execute('UPDATE customer SET customer_name = ? WHERE id = ?', [customer_name, id]);
  
    return customer;
  } catch (error) {
    throw error;
  }
};

/**
 * Model delete customer by ID
 * @param {Number} id 
 * @returns Array
 */
const deleteCustomerByIdModel = async (id) => {
  try {
    const customer = await (await db).execute('DELETE FROM customer WHERE id = ?', [id]);
  
    return customer;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createCustomerModel,
  getAllCustomerModel,
  getCustomerByIdModel,
  updateCustomerByIdModel,
  deleteCustomerByIdModel
};
