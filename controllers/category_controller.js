const categoryModel = require('../models/category_model');

const getCategories = async (req, res) => {
    try {
        let namev = req.body.name
        console.log(`category_controller.js->${namev}`)

        const newCategory = new categoryModel({ name: namev })
        await newCategory.save()
        res.status(200).json(newCategory)
    } catch (error) {
        res.status(400).json({ message: "internal server error" })
    }
}

module.exports = getCategories