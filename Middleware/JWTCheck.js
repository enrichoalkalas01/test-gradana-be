const JWT = require('jsonwebtoken')

// Test JWT
// Wrong Code For Test : eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNjI3NTk4OTAyLCJqdGkiOiIzZDJmMjc5ZC00NGUyLTQxNmUtODc4My1lOGRjNDI0ZjlhNDQiLCJuYmYiOjE2Mjc1OTg5MDIsInR5cGUiOiJhY2Nlc3MiLCJzdWIiOiJhcmp1bmFAa29tcGFzLmNvbSIsImV4cCI6MTYzNjIzODkwMn0.NKHF2O6aXdyAm9eCMzMocMbs72yt4nGlaK7wXnPPbMA

const JWTVerify = (Data) => {
    let Verify = JWT.verify(Data, process.env.SecretKey, (err, ResultVerify) => {
        if ( err ) return { message: err, status: 'error' }
        if ( ResultVerify ) return ResultVerify
    })

    return Verify
}

const JWTCreate = (Data) => {
    let Sign = JWT.sign(Data.toJSON(), process.env.SecretKey, { expiresIn: '7D' })
    return Sign
}

exports.Verify = JWTVerify
exports.Create = JWTCreate