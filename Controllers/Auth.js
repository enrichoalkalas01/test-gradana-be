const Express = require('express')
const Cryptr = require('cryptr')
const CryptE = new Cryptr(process.env.SecretKey)
const JWT = require('jsonwebtoken')

// Models
const AuthModels = require('../Models/Auth')
const DetailModels = require('../Models/ProfileDetail')

exports.Register = async (req, res) => {
    let status = false
    for ( let data in req.body ) {
        if ( req.body[data] === '' ) {
            status = false
        } else {
            status = true
        }
    }

    if ( !status ) {
        res.send({ message: `input field cannot be empty`, statusCode: 406 }) 
    } else {
        const DataUser = await AuthModels.find({ 'username': req.body.username }).then(response => response).catch(err => false)
        if ( !DataUser || DataUser.length > 0 ) {
            res.send({ message: `username is exist`, statusCode: 406 })
        } else {
            const Register = new AuthModels({
                username: req.body.username,
                password: CryptE.encrypt(req.body.password),
                fullname: req.body.fullname,
                email: req.body.email,
                age: req.body.age,
                no_hp: req.body.no_hp
            })

            await Register.save(Register).then(async response => {
                const NewSaldo = new DetailModels({
                    userId: response._id,
                    saldo: 1000000
                })

                await NewSaldo.save(NewSaldo).then(resSaldo => {
                    res.send({
                        message: `successfull to create data`,
                        statusCode: 200,
                        result: response
                    })
                }).catch(err => {
                    res.sendStatus(500).send({ message: `failed to save data` })    
                })
            }).catch(err => {
                res.sendStatus(500).send({ message: `failed to save data` })
            })
        }
    }
}

exports.Login = async (req, res) => {
    const DataUser = await AuthModels.findOne({ 'username': req.body.username }).then(response => response).catch(err => false)
    
    if ( !DataUser ) {
        res.send({ message: `username is not exist`, statusCode: 406 })
    } else {
        if ( CryptE.decrypt(DataUser.password) !== req.body.password ) {
            res.send({
                message: `failed to login user, wrong username or password`,
                statusCode: 406,
            })
        } else {
            let DataPassing = {
                username: DataUser.username,
                fullname: DataUser.fullname,
                email: DataUser.email,
                age: DataUser.age,
                token_type: 'Bearer',
                token: JWT.sign(
                    { 
                        _id: DataUser._id,
                        username: DataUser.username,
                        email: DataUser.email,
                        fullname: DataUser.fullname
                    },
                    process.env.SecretKey,
                    { expiresIn: '1h' }
                )
            }

            res.send({
                message: `success to login user`,
                statusCode: 200,
                result: DataPassing
            })
        }
    }
}

