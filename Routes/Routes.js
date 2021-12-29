const Express = require('express')
const Routes = Express.Router()

// Controllers
const AuthControllers = require('../Controllers/Auth')
const UserControllers = require('../Controllers/User')
const DetailControllers = require('../Controllers/Detail')

// Routes.get('/', (req, res) => {
//     res.render('homepages')
// })

// Views
// Routes.get('/register', UserControllers.Register)
// Routes.get('/login', UserControllers.Login)
// Routes.get('/dashboard', UserControllers.Dashboard)

// API
Routes.post('/dev/register', AuthControllers.Register)
Routes.post('/dev/login', AuthControllers.Login)
Routes.get('/dev/saldo', DetailControllers.Saldo)
Routes.post('/dev/saldo/topup', DetailControllers.TopUp)
Routes.get('/dev/saldo/history', DetailControllers.History)

module.exports = Routes