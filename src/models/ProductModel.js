const db = require('../configurations/db');

/**
 * Model create product
 * @param {Object} param
 * @returns Array
 */
const createProductModel = async ({name, price}) => {
  try {
    const result = await (await db).execute(`INSERT INTO product (name, price) VALUES (?, ?)`, [name, price]);

    return result;
  } catch (error) {
    throw error;
  }
};

/**
 * Model get all product
 * @returns Array
 */
const getAllProductModel = async () => (await db).execute('SELECT * FROM product');

/**
 * Model get product by ID
 * @param {Number} id 
 * @returns Array
 */
const getProductByIdModel = async (id) => {
  try {
    const result = await (await db).execute('SELECT * from product WHERE id = ?', [id]);

    return result;
  } catch (error) {
    throw error;
  }
};

/**
 * Model update product by ID
 * @param {Number} id 
 * @param {Object} param1 
 * @returns Array
 */
const updateProductByIdModel = async (id, {name, price}) => {
  try {
    const product = await (await db).execute(`UPDATE product SET name = ?, price = ? WHERE id = ?`, [name, price, id]);

    return product;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createProductModel,
  getAllProductModel,
  getProductByIdModel,
  updateProductByIdModel,
};
