const pool = require('../db');

module.exports = {
  // Existing methods
  getAll: async () => {
    const { rows } = await pool.query('SELECT * FROM categories');
    return rows;
  },

  // NEW REQUIRED METHODS
  getById: async (id) => {
    const { rows } = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
    return rows[0];
  },

  create: async (name, description) => {
    const { rows } = await pool.query(
      'INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *',
      [name, description]
    );
    return rows[0];
  },

  update: async (id, name, description) => {
    await pool.query(
      'UPDATE categories SET name = $1, description = $2 WHERE id = $3',
      [name, description, id]
    );
  },

  delete: async (id) => {
    await pool.query('DELETE FROM categories WHERE id = $1', [id]);
  }
};