import mongoose from "mongoose"

const clienteSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        minlength: [8, 'Password must be 8 characters'],
        required: true
    },
    phone: {
        type: String,
        minlength: 8,
        maxlength: 8,
        required: true
    },
    role: {
        type: String,
        uppercase: true,
        enum: ['CLIENT'],
        required: true
    }
})

export default mongoose.model('cliente', clienteSchema)