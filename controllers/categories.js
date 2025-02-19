const Category = require('../models/category');
const Item = require('../models/item');

module.exports = {
  deleteCategory: async (req, res) => {
    try {
      // Admin password check
      if (req.body.adminPassword !== process.env.ADMIN_PW) {
        req.flash('error', 'Invalid admin password');
        return res.redirect(`/categories/${req.params.id}`);
      }

      // Check for items in category
      const items = await Item.getByCategory(req.params.id);
      if (items.length > 0) {
        req.flash('error', 'Category has items! Delete them first.');
        return res.redirect(`/categories/${req.params.id}`);
      }

      await Category.delete(req.params.id);
      req.flash('success', 'Category deleted');
      res.redirect('/categories');
    } catch (err) {
      req.flash('error', 'Deletion failed');
      res.redirect('/categories');
    }
  },

  // Add other controller methods here
  listCategories: async (req, res) => {
    const categories = await Category.getAll();
    res.render('categories/index', { categories });
  },
  
  // ... rest of your controller methods
};