const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    type: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number
    },
    rating: {
        required: true,
        type: Number
    },
    warranty_years: {
        required: true,
        type: Number
    },
    available: {
        required: true,
        type: Boolean
    },
})

module.exports = mongoose.model('Data', dataSchema)