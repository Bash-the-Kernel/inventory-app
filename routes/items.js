
const express = require('express');
const router = express.Router();
const controller = require('../controllers/items');

router.get('/', controller.listItems);
router.get('/new', controller.newItemForm);
router.post('/', controller.createItem);
router.get('/:id', controller.viewItem);
router.get('/:id/edit', controller.editItemForm);
router.post('/:id', controller.updateItem);
router.post('/:id/delete', controller.deleteItem);


// Add these similar to categories routes
// router.get('/:id/edit', controller.editItemForm);
// router.post('/:id', controller.updateItem);
// router.post('/:id/delete', controller.deleteItem);

module.exports = router;