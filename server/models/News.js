const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This field is required.'
    },
    content: {
        type: String, 
        required: 'This field is required'
    },
    image: {
        type: String,
        required: 'This field is required.'
    }
})

module.exports = mongoose.model('newsSchema', categorySchema)