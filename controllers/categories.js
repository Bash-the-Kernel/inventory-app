const Category = require('../models/category');
const Item = require('../models/item');

module.exports = {
  listCategories: async (req, res) => {
    try {
      const categories = await Category.getAll();
      res.render('categories/index', { 
        categories,
        success: req.flash('success'),
        error: req.flash('error')
      });
    } catch (err) {
      req.flash('error', 'Error loading categories');
      res.redirect('/');
    }
  },

  // Show form to create new category
  newCategoryForm: (req, res) => {
    res.render('categories/new');
  },

  // Create new category
  createCategory: async (req, res) => {
    try {
      const { name, description } = req.body;
      await Category.create(name, description);
      req.flash('success', 'Category created!');
      res.redirect('/categories');
    } catch (err) {
      req.flash('error', 'Error creating category: ' + err.message);
      res.redirect('/categories/new');
    }
  },

  // View single category (CRUCIAL MISSING METHOD)
  viewCategory: async (req, res) => {
    try {
      const category = await Category.getById(req.params.id);
      const items = await Item.getByCategory(req.params.id);
      res.render('categories/show', { category, items });
    } catch (err) {
      req.flash('error', 'Category not found');
      res.redirect('/categories');
    }
  },

  // Show edit form
  editCategoryForm: async (req, res) => {
    try {
      const category = await Category.getById(req.params.id);
      res.render('categories/edit', { category });
    } catch (err) {
      req.flash('error', 'Category not found');
      res.redirect('/categories');
    }
  },

  // Update category
  updateCategory: async (req, res) => {
    try {
      const { name, description } = req.body;
      await Category.update(req.params.id, name, description);
      req.flash('success', 'Category updated!');
      res.redirect(`/categories/${req.params.id}`);
    } catch (err) {
      req.flash('error', 'Update failed');
      res.redirect(`/categories/${req.params.id}/edit`);
    }
  },

  // Delete category
  deleteCategory: async (req, res) => {
    try {
      if (req.body.adminPassword !== process.env.ADMIN_PW) {
        req.flash('error', 'Invalid admin password');
        return res.redirect(`/categories/${req.params.id}`);
      }

      const items = await Item.getByCategory(req.params.id);
      if (items.length > 0) {
        req.flash('error', 'Delete items first!');
        return res.redirect(`/categories/${req.params.id}`);
      }

      await Category.delete(req.params.id);
      req.flash('success', 'Category deleted');
      res.redirect('/categories');
    } catch (err) {
      req.flash('error', 'Deletion failed');
      res.redirect('/categories');
    }
  }
};