const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type : String,
        required: true,
        unique: true,
        maxlength: 100,
        primaryKey: true,

    },
    email: {
        type: String,
        unique: true,
        maxlength: 50

    },
    password: {
        type: String,
        required: true,
        maxlength: 50

    }

})

module.exports = mongoose.model("user",userSchema)