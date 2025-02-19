const pool = require('../db');

module.exports = {
  getAll: async () => {
    const { rows } = await pool.query('SELECT * FROM items');
    return rows;
  },

  create: async (name, description, price, quantity, category_id) => {
    const { rows } = await pool.query(
      `INSERT INTO items 
      (name, description, price, quantity, category_id) 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING *`,
      [name, description, price, quantity, category_id]
    );
    return rows[0];
  },

  getById: async (id) => {
    const { rows } = await pool.query('SELECT * FROM items WHERE id = $1', [id]);
    return rows[0];
  }
};