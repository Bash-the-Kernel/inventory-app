const express = require('express');
const router = express.Router(); // <-- This was missing!
const controller = require('../controllers/categories');

router.get('/', controller.listCategories);
router.get('/new', controller.newCategoryForm);
router.post('/', controller.createCategory);
router.get('/:id', controller.viewCategory);
router.get('/:id/edit', controller.editCategoryForm);
router.post('/:id', controller.updateCategory);
router.post('/:id/delete', controller.deleteCategory);

module.exports = router; // <-- Make sure this exists
