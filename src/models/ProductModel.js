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
 * 
 * @param {Number} id 
 * @returns Object
 */
const getProductByIdModel = async (id) => {
  const result = await (await db).execute('SELECT * from product WHERE id = ?', [id]);

  return result;
};

module.exports = {
  createProductModel,
  getAllProductModel,
  getProductByIdModel,
};
