const db = require('../configurations/db');

const createOrderModel = async (data) => {
  try {
    // Need backtip (`) at column
    // Use .query, because .execute is excape the values
    const order = await (await db).query('INSERT INTO `order` (`order_code`, `customer_address_id`, `product_id`, `payment_method_id`) VALUES ?', [data]);
  
    return order;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createOrderModel,
};
