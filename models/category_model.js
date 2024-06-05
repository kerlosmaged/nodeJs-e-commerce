const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: { type: String }
})

const categoryModel = mongoose.model("category", schema)

module.exports = categoryModel