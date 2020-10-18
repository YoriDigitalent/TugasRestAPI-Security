import mongoose from 'mongoose'

const transaksiSchema = mongoose.Schema (
    {
        id: {
            type: String,
            required: true,
            unique: true
        },
        jenis_transaksi: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
)

const Transaksi = mongoose.model('Transaksi', transaksiSchema)

export default Transaksi