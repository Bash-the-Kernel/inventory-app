const pool = require('../db');

module.exports = {
  // Existing methods
  getAll: async () => {
    const { rows } = await pool.query('SELECT * FROM items');
    return rows;
  },

  // Add these new methods
  getById: async (id) => {
    const { rows } = await pool.query('SELECT * FROM items WHERE id = $1', [id]);
    return rows[0];
  },

  update: async (id, name, description, price, quantity, category_id) => {
    await pool.query(
      `UPDATE items SET
        name = $1,
        description = $2,
        price = $3,
        quantity = $4,
        category_id = $5
      WHERE id = $6`,
      [name, description, price, quantity, category_id, id]
    );
  },

  delete: async (id) => {
    await pool.query('DELETE FROM items WHERE id = $1', [id]);
  }
};