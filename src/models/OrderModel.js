const db = require('../configurations/db');

const createOrderModel = async (data) => {
  try {
    const order = await (await db).execute('INSERT INTO order (order_code, customer_address_id, product_id, payment_method_id) VALUES(??)', [data]);
  
    return order;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createOrderModel,
};
