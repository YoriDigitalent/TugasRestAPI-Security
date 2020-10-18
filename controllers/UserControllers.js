import User from './../models/user.js'
import express from 'express'
import bcrypt from 'bcrypt'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import Conf from './../config/config.js'

const userRouter = express.Router()

var router = express.Router()

router.use(bodyParser.urlencoded({ extended: false}))
router.use(bodyParser.json())

//ADD NEW USER
userRouter.post('/add', async(req, res) => {
    /*try {
        
        const hashedPassword = bcrypt.hashSync(req.body.pass, 8);

        User.create({
            lastname: req.body.lastname,
            username: req.body.username,
            passwprd: hashedPassword,
            jabatan: req.body.jabatan
        },
        
        function (err, user) {
            
            if (err) return res.status(500).send("There was a problem registering the user")

            //CREATE A TOKEN
            var token = jwt.sign({id: user._id}, Conf.secret, {
                expiresIn: 86400 //expires in 24 hours
            })

            res.status(200).send({auth: true, token: token})
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({error: error})
    }

})*/
try {
        
    const{
        lastname,
        username,
        password,
        jabatan
    } = req.body;

    //digit angka mau berapa banyak
    var saltRounds = 10;
    const hashedPw = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
        "lastname": lastname,
        "username":username,
        "password": hashedPw,
        "jabatan": jabatan
    });

    const createdUser = await newUser.save()

    res.status(201).json(createdUser)

} catch (error) {
    
    console.log(error)
    res.status(500).json({ error: 'Database creation failed'})

}
})

//Get All users
//router GET /api/users/update
userRouter.get('/get', async(req, res) => {
    
    const updateUsers = await User.find({}) //kosong => if([]) =true

    if (updateUsers && updateUsers.length !== 0) {
        res.json(updateUsers)

    }else {
        res.status(404).json({
            message: 'user not found'
        })
    }
})

//get user by id
//@route GET api/users/get/:id
userRouter.get('/get/:id', async(req, res) => {

    const getUser = await User.findById(req.params.id)

    if (getUser) {
        res.json(getUser)

    }else {
        res.status(404).json({
            message: 'User not found'
        })
    }
})

//updat users
//@route PUT/api/users/update
userRouter.put('/update/:id', async(req,res) => {

    const {username, password, jabatan} = req.body

    const updateUser = await User.findById(req.params.id)

    if (updateUser) {
        updateUser.username = username;
        updateUser.pass = password;
        updateUser.jabatan = jabatan;

        const updateUsers = await updateUser.save()

        res.json(updateUsers)

    }else {
        res.status(404).json({
            message: 'user not found'
        })
    }
})

//delete user by id
//@route DELETE /api/users/delete/:id
userRouter.delete('/delete/:id', async(req, res) => {

    const deleteUser = await User.findById(req.params.id)

    if(deleteUser) {
        await deleteUser.remove()
        res.json({
            message: 'User removed'
        })

    }else {
        res.status(404).json({
            message: 'User not found'
        })
    }
})

//CHECK TOKEN
userRouter.get('/check', (req, res) => {

    //header apabila akan melakukan akses
    var token = req.headers['x-access-token']
    if (!token) return res.status(401).send({
        auth: false,
        message: 'No token provided.'
    })

    //verifikasi jwt
    jwt.verify(token, Conf.secret, function(err, decoded) {
        if (err) return res.status(500).send({
            auth: false,
            message: 'Failed to authentication token.'
        })

        res.status(200).send(decoded)
    })
})

export default userRouter