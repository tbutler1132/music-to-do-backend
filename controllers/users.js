import User from '../models/user.js'

export const getUsers = async  (req, res) => {
    try {
        const users = await User.find()

        console.log(users)

        res.status(200).json(users)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const addSong = async (req, res) => {
    const song = req.body

    const user = await User.findById(req.params.id)

    user.songs.push(song)

    try {
        await user.save()

        res.status(200).json(user.songs[user.songs.length - 1])
    } catch (error) {
        res.status(404).json("Failed to add song")
        
    }
}

export const deleteSong = async (req, res) => {
    const song = req.body._id
    const user = await User.findById(req.params.id)

    user.songs.id(song).remove()

    try {
        await user.save()

        res.status(200).json("Song deleted")
    } catch (error) {
        
        res.status(404).json("Failed")
    }
}

export const addGeneralTask = async (req, res) => {
    const task = req.body
    console.log(req.body)
    const user = await User.findById(req.params.id)
    user.tasks.push(task)
    try {
        await user.save()

        res.status(200).json(user.tasks[user.tasks.length - 1])
    } catch (error) {
        
    }
}


export const deleteGeneralTask = async (req, res) => {
    console.log("req body", req.body)
    const task = req.body._id
    const user = await User.findById(req.params.id)

    user.tasks.id(task).remove()
    
    try {
        
        await user.save()
    
        res.status(200).json("Task Deleted");
    } catch (error) {

        res.status(404).json("Can't delete")
        
    }
}

export const createUsers = async (req, res) => {

    console.log(req.body)
    const user = req.body

    console.log(user)

    const newUser = new User(user)
    try {
        await newUser.save()

        res.status(201).json(newUser)
        
    } catch (error) {
        res.status(409).json({message: error.message})
        
    }

}