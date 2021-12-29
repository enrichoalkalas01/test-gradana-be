const Express = require('express')
const Http = require('http')
const App = Express()
const Server = Http.createServer(App)
const Morgan = require('morgan')
const Dotenv = require('dotenv')
const Cors = require('cors')
const Path = require('path')

Dotenv.config({ path: './Config/Config.env' })

App.use(Morgan('dev'))
App.use(Express.urlencoded({ extended: true }))
App.use(Express.json())
App.set('view engine', 'ejs')

const PORT = process.env.PORT || 7777

Server.listen(PORT, () => { console.log(`Server running in port : ${ PORT }`) })

// Database Mongo
const ConnectionDB = require('./Models/Connection')
ConnectionDB()

// Routes
const Routes = require('./Routes/Routes')
App.use(Routes)

App.use(Express.static(Path.join(__dirname, './angular/dist/angular')))
App.get('*', (req, res) => {
    res.sendFile(Path.join(__dirname, './angular/dist/angular/index.html'))
})


