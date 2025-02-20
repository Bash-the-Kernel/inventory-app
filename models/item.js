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
  
  getAllWithCategory: async () => {
    const { rows } = await pool.query(`
      SELECT items.*, categories.name as category_name 
      FROM items
      LEFT JOIN categories ON items.category_id = categories.id
    `);
    
    // Convert numeric fields to Numbers
    return rows.map(item => ({
      ...item,
      price: Number(item.price),
      quantity: Number(item.quantity)
    }));
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