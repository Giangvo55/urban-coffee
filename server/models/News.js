const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'This field is required.'
    },
    content: {
        type: String, 
        required: 'This field is required'
    },
    img: {
        type: String,
        required: 'This field is required.'
    }
})

module.exports = mongoose.model('news', newsSchema)