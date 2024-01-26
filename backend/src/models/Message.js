const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        minlength: 1
    },
    fecha: {
        type: Date,
        required: true,
    },
    to:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    from:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
})

module.exports = mongoose.model('Message', schema);