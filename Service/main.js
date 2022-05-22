const express = require('express')
const cors = require('cors')

const userRouter = require('./api/user/user.router')
const accountRouter = require('./api/account/account.router')
const companyRouter = require('./api/company/company.router')
const bussedRouter = require('./api/bussed/bussed.router')
const routeRouter = require('./api/route/route.router')
const driverRouter = require('./api/driver/driver.router')

const app = express()

// Settings
app.set('port', process.env.PORT || 5000)

// Middlewares
app.use(express.json())
app.use(cors())

// Routes
app.use('/api/user', userRouter)
app.use('/api/account', accountRouter)
app.use('/api/company', companyRouter)
app.use('/api/bussed', bussedRouter)
app.use('/api/route', routeRouter)
app.use('/api/driver', driverRouter)

// Starting the server
app.listen(app.get('port'), () => {
  console.log('Server running on port', app.get('port'))
})
