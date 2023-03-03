const httpStatus = require('http-status');
const { randomString } = require('../helpers/randomString');
const { getCustomerAddressByIdModel } = require('../models/CustomerAddressModel');
const { createOrderModel, getAllOrderModel } = require('../models/OrderModel');
const { getPaymentMethodByIdModel } = require('../models/PaymentMethodModel');
const { getProductByIdModel } = require('../models/ProductModel');

const createOrderController = async (req, res) => {
  try {
    const { customer_address_id } = req.params;
    const requestBody = req.body;

    const isCustomerAddressValid = await getCustomerAddressByIdModel(customer_address_id);

    const [rowsCustomerAddress, fieldsCustomerAddress] = isCustomerAddressValid;

    if (!rowsCustomerAddress || !rowsCustomerAddress.length) return res.sendWrapped('Customer address not found', {}, httpStatus.NOT_FOUND);

    const random = await randomString(10);

    // Use async in loop
    const promises = requestBody.map(async (o) => {
      const isProductValid = await getProductByIdModel(o.product_id);

      const [rowsProduct, fieldsProduct] = isProductValid;

      if (!isProductValid || !isProductValid.length) return res.sendWrapped('Product not found', {}, httpStatus.NOT_FOUND);

      const isPaymentMethodValid = await getPaymentMethodByIdModel(o.payment_method_id);

      const [rowsPaymentMethod, fieldsPaymentMethod] = isPaymentMethodValid;

      if (!isPaymentMethodValid || !isPaymentMethodValid.length) return res.sendWrapped('Payment method not found', {}, httpStatus.NOT_FOUND);

      const data = {
        order_code: random,
        customer_address_id: parseInt(customer_address_id),
        ...o,
      };

      // Return only the value of data
      return Object.values(data);
    });

    // await the result of all loop and catch in promise.all
    const data = await Promise.all(promises);

    const order = await createOrderModel(data);

    const [rowsOrder, fieldsOrder] = order;

    if (!rowsOrder || !rowsOrder.affectedRows) return res.sendWrapped('Fail to create order', {}, httpStatus.CONFLICT);

    res.sendWrapped('Order successfully', rowsOrder, httpStatus.CREATED);
  } catch (error) {
    throw error;
  }
};

const getAllOrderController = async (req, res) => {
  const orders = await getAllOrderModel();

  const [rowsOrder, fieldsOrder] = orders;

  res.sendWrapped('List of order', rowsOrder, httpStatus.OK);
};

module.exports = {
  createOrderController,
  getAllOrderController,
};
