const Mongoose = require('mongoose')

const ConnectDB = async () => {
    try {
        const Connected = await Mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Has Connected : ${ Connected.connection.host }`)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

module.exports = ConnectDB