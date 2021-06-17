import mongoose from 'mongoose'

const Schema = mongoose.Schema

const taskSchema = new Schema(
    {
        content: String,
        general: {
            type: Boolean,
            default: true
        }

    },
    {
        timestamps: true,
    }
)



const userSchema = new Schema(
    {
        username: String,
        password: String,
        albumTitle: String,
        Tasks: [taskSchema],

    },
    {
        timestamps: true,
    }
)

const User = mongoose.model('User', userSchema)

export default User