import mongoose from "mongoose"

const empresaSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    impactlevel: {
        type: String,
        required: true
    },
    trajectoryyear: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    }
})

export default mongoose.model('empresa', empresaSchema)