const express = require('express');
const categoryController = require("../controllers/category_controller")
const router = express.Router()
const { param, body, validationResult } = require("express-validator");
const { checkId, checkCategoryIdValidator, createCategoryValidator, getAllCategoryValidator, updateCategoryValidator } = require('../utils/validator/categoryRulesValidator');
const { checkIdMiddleware } = require('../middlewares/validator/validatorMiddlware');


router
    .route('/')
    .get(getAllCategoryValidator, categoryController.getCategories)
    .post(createCategoryValidator, categoryController.createCategories)

router
    .route('/:id')
    .get(checkCategoryIdValidator,
        categoryController.getCategoriesById)
    .put(updateCategoryValidator, categoryController.updateCategories)
    .delete(checkCategoryIdValidator,
        categoryController.deleteCategories)

module.exports = router
