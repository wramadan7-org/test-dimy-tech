const db = require('../configurations/db');

const createProductModel = async ({name, price}) => {
  try {
    const result = await (await db).execute(`INSERT INTO product (name, price) VALUES (?, ?)`, [name, price]);

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createProductModel,
};
