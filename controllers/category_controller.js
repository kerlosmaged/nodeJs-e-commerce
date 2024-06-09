const categoryModel = require('../models/category_models');
const slugify = require('slugify');
const asynchandler = require('express-async-handler');
const mongoose = require('mongoose')

const { ObjectId } = mongoose.Types

// public -> GET all data from database 
const getCategories = asynchandler(async (req, res) => {
    try {

        let page = parseInt(req.query.pageNumber) || 1

        let limit = parseInt(req.query.limit) || 5

        const skip = (page - 1) * limit

        const category = await categoryModel.find({}).skip(skip).limit(limit).exec()


        res.status(200).json({ result: category.length, page, data: category })
    } catch (error) {
        res.status(400).json({ message: "internal server error" })
    }
})

// public -> GET data have id you enterd it 

const getCategoriesById = asynchandler(async (req, res) => {

    try {
        const id = req.params.id
        const item = await categoryModel.findById(id)

        console.log(`item data is -> ${id.length}`)
        if (!item) {
            res.status(404).json({ message: "Category Not Found" })
        }
        res.status(200).json({ message: "success", data: item })
    } catch (error) {
        res.status(500).json({ message: "id is not valid" })
    }
})

// admin users only 
const createCategories = asynchandler(async (req, res) => {

    try {
        const name = req.body.name
        const createCategory = await categoryModel.create({ name, slug: slugify(name) })
        res.status(201).json({ data: createCategory })
    } catch (error) {
        res.status(500).json({ error })
    }


})

const updateCategories = asynchandler(async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body.name

        const item = await categoryModel.findOneAndUpdate({ _id: id }, { name: data, slug: slugify(data) }, { new: true })

        console.log(`item in update categry will be ${item}`)

        if (item) {
            res.status(200).json({ updated: item })
        }
        else {
            res.status(404).json({ message: "category not found to update" })
        }

    } catch (error) {
        console.log(`error when update is ${error}`)
        res.status(400).json({ message: "Error on Update Try again later" })
    }
})

const deleteCategories = asynchandler(async (req, res) => {
    try {
        const id = req.params.id
        const item = await categoryModel.findByIdAndDelete({ _id: id })
        if (item) {
            res.status(200).json({ message: "category deleted success" })
        }
        res.status(404).json({ message: "category not found" })
    } catch (error) {
        res.status(500).json({ message: "Server Error, please try again later" })
    }
})

module.exports = {
    getCategories,
    createCategories,
    getCategoriesById,
    updateCategories,
    deleteCategories
}