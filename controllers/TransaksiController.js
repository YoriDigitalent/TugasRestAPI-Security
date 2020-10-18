import express from 'express'
import Transaksi from './../models/transaksi.js'

const transRouter = express.Router()

//@desc Create new transaksi
transRouter.post('/add', async(req, res) => {
    try {
        
        const {id, jenis_transaksi} = req.body

        const newtransaksi = new Transaksi({
            id,
            jenis_transaksi
        })

        const createdTransaksi = await newtransaksi.save()

        res.status(201).json(createdTransaksi)

    } catch (error) {
        
        console.log(error)
        res.status(500).json({ error: 'Database creation failed'})

    }
})


//@desc GET all transaksi
transRouter.get('/get', async(req, res) => {
    const getTransaksi = await Transaksi.find({}) //kosong => if([]) =true

    if (getTransaksi && getTransaksi.length !== 0) {
        res.json(getTransaksi)

    }else {
        res.status(404).json({
            message: 'Transaksi not found'
        })
    }

})

//@desc Get Transaksi by id
//router GET /api/transaksi/:id
transRouter.get('/:id', async(req, res) => {

    const getTransaksi = await Transaksi.findById(req.params.id)

    if (getTransaksi) {
        res.json(getTransaksi)

    }else {
        res.status(404).json({
            message: 'Transaksi not found'
        })
    }

})

export default transRouter