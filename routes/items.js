const express = require('express');
const router = express.Router();
const controller = require('../controllers/items');

router.get('/', controller.listItems);
router.get('/new', controller.newItemForm);
router.post('/', controller.createItem);
router.get('/:id', controller.viewItem);
router.get('/:id/edit', controller.editItemForm); // Now implemented
router.post('/:id', controller.updateItem);       // Now implemented
router.post('/:id/delete', controller.deleteItem); // Now implemented

module.exports = router;