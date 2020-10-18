import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const saltRounds = 8

const userSchema = mongoose.Schema (
    {
        lastname: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        jabatan: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    })

//hash user password
userSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, saltRounds)
    next()
})

const User = mongoose.model('User', userSchema)

export default User