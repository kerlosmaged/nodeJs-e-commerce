const categoryModel = require('../models/category_models');
const slugify = require('slugify');
const asynchandler = require('express-async-handler');
const mongoose = require('mongoose');
const ApiError = require('../utils/api_error');

// public -> GET all data from database 
const getCategories = asynchandler(async (req, res) => {
    let page = parseInt(req.query.pageNumber) || 1

    let limit = parseInt(req.query.limit) || 5

    const skip = (page - 1) * limit

    const category = await categoryModel.find({}).skip(skip).limit(limit).exec()


    res.status(200).json({ result: category.length, page, data: category })

})

// public -> GET data have id you enterd it 

const getCategoriesById = asynchandler(async (req, res, next) => {

    const id = req.params.id
    const item = await categoryModel.findById(id)

    console.log(`item data is -> ${id.length}`)

    if (!item) {
        // res.status(404).json({ message: "Category Not Found" })

        return next(new ApiError("Item Not Found", 404))
    }
    res.status(200).json({ message: "success", data: item })

})

// admin users only 
const createCategories = asynchandler(async (req, res) => {

    const name = req.body.name
    const createCategory = await categoryModel.create({ name, slug: slugify(name) })
    res.status(201).json({ data: createCategory })
})

const updateCategories = asynchandler(async (req, res, next) => {
    const id = req.params.id
    const data = req.body.name

    const item = await categoryModel.findOneAndUpdate({ _id: id }, { name: data, slug: slugify(data) }, { new: true })

    console.log(`item in update categry will be ${item}`)

    if (item) {
        return res.status(200).json({ updated: item })
    }
    else {
        return next(new ApiError("can't find the item please change id", 404))
    }

})

const deleteCategories = asynchandler(async (req, res, next) => {

    const id = req.params.id
    const item = await categoryModel.findByIdAndDelete({ _id: id })
    if (item) {
        return res.status(200).json({ message: "category deleted success" })
    }
    next(new ApiError(`can't find the item please change ${id}`, 404))
})

module.exports = {
    getCategories,
    createCategories,
    getCategoriesById,
    updateCategories,
    deleteCategories
}