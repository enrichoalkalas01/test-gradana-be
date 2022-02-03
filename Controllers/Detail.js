// Middleware
const JWTCheck = require('../Middleware/JWTCheck')

// Models
const ProfileDetailModels = require('../Models/ProfileDetail')
const HistorySaldoModels = require('../Models/HistorySaldo')

exports.Saldo = async (req, res) => {
    let TokenAuth = req.headers.authorization.split(' ')
    if ( TokenAuth[0] !== 'Bearer' ) {
        res.sendStatus(403)
    } else {
        let Token = JWTCheck.Verify(TokenAuth[1])
        if ( !Token ) {
            res.sendStatus(403)
        } else {
            await ProfileDetailModels.findOne({ 'userId': Token._id }).then(response => {
                res.send(response)
            }).catch(err => {
                res.sendStatus(500)
            })
        }
    }
}

exports.TopUp = async (req, res) => {
    let TokenAuth = req.headers.authorization.split(' ')
    if ( TokenAuth[0] !== 'Bearer' ) {
        res.sendStatus(403)
    } else {
        let Token = JWTCheck.Verify(TokenAuth[1])
        if ( !Token ) {
            res.sendStatus(403)
        } else {
            await ProfileDetailModels.findOne({ 'userId': Token._id }).then(async response => {
                const NewHistorySaldo = new HistorySaldoModels({
                    saldoId: response._id,
                    saldo: Number(req.body.saldo),
                    tgl_topup: Date(),
                })

                await NewHistorySaldo.save(NewHistorySaldo).then(result => {
                    let NewSaldo = ( Number(req.body.saldo) + Number(response.saldo) )
                    ProfileDetailModels.updateOne(
                        { '_id': response._id },
                        {
                            'userId': response.userId,
                            'saldo': NewSaldo 
                        }
                    ).then(newResponse => {
                        res.send({
                            message: `success to topup saldo`,
                            statusCode: 200
                        })
                    })
                }).catch(err => {
                    console.log(err)
                    res.sendStatus(500)
                })
            }).catch(err => {
                res.sendStatus(500)
            })
        }
    }
}

exports.History = async (req, res) => {
    let TokenAuth = req.headers.authorization.split(' ')
    if ( TokenAuth[0] !== 'Bearer' ) {
        res.sendStatus(403)
    } else {
        let Token = JWTCheck.Verify(TokenAuth[1])
        if ( !Token ) {
            res.sendStatus(403)
        } else {
            await ProfileDetailModels.findOne({ 'userId': Token._id }).then(response => {
                HistorySaldoModels.find({ 'saldoId': response._id }).then(result => {
                    res.send({
                        message: `successfull to get saldo history`,
                        statusCode: 200,
                        results: result
                    })
                })
            }).catch(err => {
                res.sendStatus(500)
            })
        }
    }
}