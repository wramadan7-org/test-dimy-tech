const db = require('../configurations/db');

/**
 * Model create payment method
 * @param {Object} param0 
 * @returns Array
 */
const createPaymentMethodModel = async ({name, is_active}) => {
  try {
    const payment = await (await db).execute('INSERT INTO payment_method (name, is_active) VALUES (?, ?)', [name, is_active]);

    return payment;
  } catch (error) {
    throw error;
  }
};

/**
 * Model get all payment method
 * @returns Array
 */
const getAllPaymentMethodModel = async () => (await db).execute('SELECT * FROM payment_method');

/**
 * Model get payment method by ID
 * @param {Number} id 
 * @returns Array
 */
const getPaymentMethodByIdModel = async (id) => {
  try {
    const paymentMethod = await (await db).execute('SELECT * FROM payment_method WHERE id = ?', [id]);
  
    return paymentMethod;
  } catch (error) {
    throw error;
  }
};

/**
 * Model update payment method by ID
 * @param {Number} id 
 * @param {Object} param1 
 * @returns Array
 */
const updatePaymentMethodByIdModel = async (id, {name, is_active}) => {
  try {
    const paymentMethod = await (await db).execute('UPDATE payment_method SET name = ?, is_active = ? WHERE id = ?', [name, is_active, id]);

    return paymentMethod;
  } catch (error) {
    throw error;
  }
};

/**
 * Model delete payment method by ID
 * @param {Number} id 
 * @returns Array
 */
const deletPaymentMethodByIdModel = async (id) => {
  try {
    const paymentMethod = await (await db).execute('DELETE FROM payment_method WHERE id = ?', [id]);

    return paymentMethod;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createPaymentMethodModel,
  getAllPaymentMethodModel,
  getPaymentMethodByIdModel,
  updatePaymentMethodByIdModel,
  deletPaymentMethodByIdModel,
};
