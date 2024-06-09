const express = require('express');
const categoryController = require("../controllers/category_controller")
const router = express.Router()

router.get('/', categoryController.getCategories)
router.get('/:id', categoryController.getCategoriesById)
router.post('/', categoryController.createCategories)
router.put('/:id', categoryController.updateCategories)
router.delete('/:id', categoryController.deleteCategories)
module.exports = router
