const Item = require('../models/item');
const Category = require('../models/category');

module.exports = {
  listItems: async (req, res) => {
    try {
      const items = await Item.getAll();
      res.render('items/index', { items });
    } catch (err) {
      req.flash('error', 'Error loading items');
      res.redirect('/');
    }
  },

  newItemForm: async (req, res) => {
    try {
      const categories = await Category.getAll();
      res.render('items/new', { categories });
    } catch (err) {
      req.flash('error', 'Error loading form');
      res.redirect('/items');
    }
  },

  createItem: async (req, res) => {
    try {
      const { name, description, price, quantity, category_id } = req.body;
      await Item.create(name, description, price, quantity, category_id);
      req.flash('success', 'Item created successfully');
      res.redirect('/items');
    } catch (err) {
      req.flash('error', 'Error creating item');
      res.redirect('/items/new');
    }
  },

  viewItem: async (req, res) => {
    try {
      const item = await Item.getById(req.params.id);
      const category = await Category.getById(item.category_id);
      res.render('items/show', { item, category });
    } catch (err) {
      req.flash('error', 'Item not found');
      res.redirect('/items');
    }
  },

  // MISSING METHODS
  editItemForm: async (req, res) => {
    try {
      const item = await Item.getById(req.params.id);
      const categories = await Category.getAll();
      res.render('items/edit', { item, categories });
    } catch (err) {
      req.flash('error', 'Item not found');
      res.redirect('/items');
    }
  },

  updateItem: async (req, res) => {
    try {
      const { name, description, price, quantity, category_id } = req.body;
      await Item.update(req.params.id, name, description, price, quantity, category_id);
      req.flash('success', 'Item updated');
      res.redirect(`/items/${req.params.id}`);
    } catch (err) {
      req.flash('error', 'Update failed');
      res.redirect(`/items/${req.params.id}/edit`);
    }
  },

  deleteItem: async (req, res) => {
    try {
      if (req.body.adminPassword !== process.env.ADMIN_PW) {
        req.flash('error', 'Invalid admin password');
        return res.redirect(`/items/${req.params.id}`);
      }

      await Item.delete(req.params.id);
      req.flash('success', 'Item deleted');
      res.redirect('/items');
    } catch (err) {
      req.flash('error', 'Deletion failed');
      res.redirect('/items');
    }
  }
};