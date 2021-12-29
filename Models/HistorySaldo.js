const Mongoose = require('mongoose')

const Schema = new Mongoose.Schema({
    saldoId: { type: String },
    saldo: { type: String },
    tgl_topup: { type: Date },
})

const HistorySaldo = Mongoose.model('historysaldo', Schema)

module.exports = HistorySaldo