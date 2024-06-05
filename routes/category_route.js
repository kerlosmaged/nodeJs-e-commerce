const express = require('express');
const categoryController = require("../controllers/category_controller")
const router = express.Router()

router.get('/', categoryController)


module.exports = router
