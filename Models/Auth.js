const Mongoose = require('mongoose')

const Schema = new Mongoose.Schema({
    username: { type: String },
    password: { type: String },
    fullname: { type: String },
    email: { type: String },
    age: { type: String },
    no_hp: { type: String }
})

const Auth = Mongoose.model('auth', Schema)
module.exports = Auth