const httpStatus = require('http-status');
const { createProductModel } = require('../models/ProductModel');

const craeteProductController = async (req, res) => {
  try {
    const requestBody = req.body;
    const product = await createProductModel(requestBody);

    if (!product[0].affectedRows) return res.sendWrapped('Fail to create product', {}, httpStatus.CONFLICT);
  
    res.sendWrapped('Success create product', product, httpStatus.CREATED);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  craeteProductController,
};
