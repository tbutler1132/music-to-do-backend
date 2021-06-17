import mongoose from 'mongoose'

const Schema = mongoose.Schema

const taskSchema = new Schema(
    {
        content: String,
        general: Boolean

    },
    {
        timestamps: true,
    }
)

const songSchema = new Schema(
    {
        title: String,
        tasks: [taskSchema]
    }
)



const userSchema = new Schema(
    {
        username: String,
        password: String,
        albumTitle: String,
        tasks: [taskSchema],
        songs: [songSchema]

    },
    {
        timestamps: true,
    }
)

const User = mongoose.model('User', userSchema)

export default User