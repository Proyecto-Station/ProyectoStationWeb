const express = require('express')
const cors = require('cors')

const userRouter = require('./api/user/user.router')
const authRouter = require('./api/user/auth.router')
const accountRouter = require('./api/account/account.router')
const companyRouter = require('./api/company/company.router')
const bussedRouter = require('./api/bussed/bussed.router')
const routeRouter = require('./api/route/route.router')
const driverRouter = require('./api/driver/driver.router')
const operatorRouter = require('./api/operator/operator.router')
const scheduleRouter = require('./api/schedule/schedule.route')

const app = express()

// Settings
app.set('port', process.env.PORT || 5000)

// Middlewares
app.use(express.json())
app.use(cors())

// Routes
app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/account', accountRouter)
app.use('/api/company', companyRouter)
app.use('/api/bussed', bussedRouter)
app.use('/api/route', routeRouter)
app.use('/api/driver', driverRouter)
app.use('/api/operator', operatorRouter)
app.use('/api/schedule', scheduleRouter)

// Starting the server
app.listen(app.get('port'), () => {
  console.log('Server running on port', app.get('port'))
})
