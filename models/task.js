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

const Task = mongoose.model('Task', taskSchema)

export default Task