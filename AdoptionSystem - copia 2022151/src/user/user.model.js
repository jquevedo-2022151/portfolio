import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
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
        unique: true, //Unique solo puede existir un registro único
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
   address: {
        type: String,
        required: true
   },
   role: {
        type: String,
        uppercase: true,
        enum: ['ADMIN','CLIENT'], // El enum se utiliza para Solo los datos que estén en el arreglo son válidos.
        required: true
   }
})


// Pre mongoose
                             //Pluralizar
export default mongoose.model('user', userSchema)

