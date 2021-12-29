const Mongoose = require('mongoose')

const Schema = new Mongoose.Schema({
    userId: { type: String },
    saldo: { type: String },
})

const ProfileDetail = Mongoose.model('profiledetail', Schema)
module.exports = ProfileDetail