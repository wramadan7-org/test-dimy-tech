const db = require('../configurations/db');

const createOrderModel = async (data) => {
  try {
    // Need backtip (`) at column
    // Use .query, because .execute is excape the values for multiple row
    const order = await (await db).query('INSERT INTO `order` (`order_code`, `customer_address_id`, `product_id`, `payment_method_id`) VALUES ?', [data]);
  
    return order;
  } catch (error) {
    throw error;
  }
};

const getAllOrderModel = async () => {
  try {
    // const orders = await (await db).execute('SELECT order_code, group_concat(customer_address_id) AS customer_address, group_concat(product_id) AS product, group_concat(payment_method_id) AS payment_method FROM `order` GROUP BY order_code');
    const orders = await (await db).execute('SELECT order.order_code, customer.id AS customer_id, order.customer_address_id, order.product_id, order.payment_method_id, customer.customer_name, customer_address.address, product.name AS product_name, product.price AS product_price, payment_method.name AS payment_method_name, payment_method.is_active AS payment_method_is_active FROM `order` INNER JOIN `customer_address` ON order.customer_address_id = customer_address.id INNER JOIN `customer` ON customer_address.customer_id = customer.id INNER JOIN `product` ON order.product_id = product.id INNER JOIN `payment_method` ON order.payment_method_id = payment_method.id ORDER BY order_code');

    return orders;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createOrderModel,
  getAllOrderModel,
};
