import dotenv from 'dotenv'
dotenv.config()

import transRouter from './controllers/TransaksiController.js'
import userRouter from './controllers/UserControllers.js'
import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'

const app = express()

// Connect to DB
const URI = process.env.MONGODB_URI
mongoose.connect(URI,
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    }

).then(() => {
    console.log('Connect to DB success')

}).catch(err => {
    console.log('Connect to failed ' + err)
})

//Middleware
app.use(morgan('dev'))
app.use(express.json())

//Routers
app.get('/', (req, res) => {
    res.json({
        message: 'success'
    })
})

app.use('/api/user', userRouter)

app.use('/api/check-token', userRouter)

app.use('/api/transaksi', transRouter)

//listen to port
//const PORT = process.env.PORT || '4000'

app.listen(8080, () => {
    console.log('App Listen to port 8080')
})
