const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    userContact: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    saved: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model("Contact", schema);