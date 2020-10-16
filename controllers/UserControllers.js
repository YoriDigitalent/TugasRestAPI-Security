import User from './../models/user.js'
import express from 'express'
import bcrypt from 'bcrypt'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import Config from './../config/cofig.js'

const userRouter = express.Router()

var router = express.Router()

router.use(bodyParser.urlencoded({ extended: false}))
router.use(bodyParser.json())

//ADD NEW USER
userRouter.post('/add', (req, res) => {
    try {
        
        var hashedPassword = bcrypt.hashSync(req.body.password, 8)

        User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        },

        function (err, user) {
            
            if (err) return res.status(500).send("There was a problem registering the user")

            //CREATE A TOKEN
            var token = jwt.sign({id: user._id}, Config.secret, {
                expiresIn: 86400 //expires in 24 hours
            })

            res.status(200).send({auth: true, token: token})
        })

    } catch (error) {
        res.status(500).json({error: error})
    }

}) 

export default userRouter