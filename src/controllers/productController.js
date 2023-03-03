const httpStatus = require('http-status');
const { 
  createProductModel,
  getAllProductModel,
  getProductByIdModel,
  updateProductByIdModel,
  deleteProductByIdModel,
} = require('../models/ProductModel');

const craeteProductController = async (req, res) => {
  try {
    const requestBody = req.body;
    const product = await createProductModel(requestBody);

    const [rows, fields] = product;

    if (!rows.affectedRows) return res.sendWrapped('Fail to create product', {}, httpStatus.CONFLICT);

    const data = {
      id: rows.insertId,
      ...requestBody,
    };
  
    res.sendWrapped('Success create product', data, httpStatus.CREATED);
  } catch (error) {
    throw error;
  }
};

const getAllProductController = async (req, res) => {
  try {
    const products = await getAllProductModel();

    const [rows, fields] = products;

    res.sendWrapped('List of product', rows, httpStatus.OK);
  } catch (error) {
    throw error;
  }
};

const getProductByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await getProductByIdModel(id);

    const [rows, field] = product;

    if (!rows || !rows.length) return res.sendWrapped('Not found', {}, httpStatus.NOT_FOUND);

    res.sendWrapped(`Product with ID ${id}`, rows[0], httpStatus.OK);
  } catch (error) {
    throw error;
  }
};

const updateProductByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const requestBody = req.body;

    const product = await getProductByIdModel(id);

    const [rows, fields] = product;

    if (!rows || !rows.length) return res.sendWrapped('Not found', {}, httpStatus.NOT_FOUND);
    
    const data = {
      ...rows[0],
      ...requestBody,
    };

    const update = await updateProductByIdModel(id, data);

    if (!update || !update.length || !update[0].affectedRows) return res.sendWrapped('Fail to update product', {}, httpStatus.CONFLICT);

    res.sendWrapped('Update product successfully', data, httpStatus.OK);
  } catch (error) {
    throw error;
  }
};

const deleteProductByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await getProductByIdModel(id);

    const [rows, fields] = product;

    if (!rows || !rows.length) return res.sendWrapped('Not found', {}, httpStatus.NOT_FOUND);

    await deleteProductByIdModel(id);

    res.sendWrapped(`Product with ID ${id} deleted`, {}, httpStatus.OK);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  craeteProductController,
  getAllProductController,
  getProductByIdController,
  updateProductByIdController,
  deleteProductByIdController,
};
