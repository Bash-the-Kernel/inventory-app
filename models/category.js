const pool = require('../db');

module.exports = {
  getAll: async () => {
    const { rows } = await pool.query('SELECT * FROM categories');
    return rows;
  },

  delete: async (id) => {
    await pool.query('DELETE FROM categories WHERE id = $1', [id]);
  }
};