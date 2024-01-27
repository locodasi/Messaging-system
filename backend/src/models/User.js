const mongoose = require("mongoose");
let uniqueValidator = require("mongoose-unique-validator");

const schema = new mongoose.Schema({
    number: {
        type: String,
        required: true,
        minlength: 8,
        unique: true,
    },
    passwordHash: {
        type: String,
        required: true,
        minlength: 8
    },
    imageURL:{
        type: String
    },
    contacts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Contact"
        }
    ],
});

schema.plugin(uniqueValidator,{ message:"Error, expected {PATH} to be unique" });

module.exports = mongoose.model("User", schema);