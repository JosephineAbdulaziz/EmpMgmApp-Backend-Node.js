const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fname: {
        type : String,
        required: true,
        maxlength: 100,

    },lname: {
        type : String,
        required: true,
        maxlength: 100,

    },
    email: {
        type : String,
        required: true,
        unique: true,
        maxlength: 100,
        primaryKey: true,

    },
    password: {
        type: String,
        required: true,
        maxlength: 50

    }

})

module.exports = mongoose.model("user",userSchema)