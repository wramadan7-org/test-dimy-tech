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

module.exports = {
  createCustomerModel,
  getAllCustomerModel,
};
