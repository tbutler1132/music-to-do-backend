import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const signin = async (req, res) => {
    const {username, password} = req.body

    try {
        const existingUser = await User.findOne({username})

        if(!existingUser) return res.status(404).json("User does not exist")

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if(!isPasswordCorrect) return res.status(400).json('Invalid Credentials')

        console.log(existingUser)
        const token = jwt.sign({username: existingUser.username, _id: existingUser._id}, 'test', {expiresIn: "1h"})

        res.status(200).json({result: existingUser, token})
    } catch (error) {
        res.status(500).json('Woops')
        
    }
}

export const signup = async (req, res) => {
    const {username, password} = req.body

    try {
        const existingUser = await User.findOne({username})

        if(existingUser) return res.status(400).json("User exists")

        const hashedPassword = await bcrypt.hash(password, 12)

        const result = await User.create({username, password: hashedPassword})

        const token = jwt.sign({username: result.username, _id: result._id}, 'test', {expiresIn: "1h"})

        res.status(200).json({result, token})
    } catch (error) { 
        res.status(500).json('Woops')
    }
}

export const getUser = async (req, res) => {
    const { id } = req.params

    try {
        const user = await User.findById(id)

        res.status(200).json(user)
    } catch (error) {
        res.status(404).json("Failed to get user")
    }
}


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

export const addSongTask = async (req, res) => {
    console.log(req.body)
    const task = req.body.task
    const user = await User.findById(req.params.id)
    const song = user.songs.id(req.body.song._id)

    song.tasks.push(task)

    try {
        user.save()

        res.status(200).json(song.tasks[song.tasks.length - 1])
    } catch (error) {

        res.status(404).json("Failed")
    }
}

export const deleteSongTask = async (req, res) => {
    const song = req.body.song._id
    const task = req.body.task
    const user = await User.findById(req.params.id)

    user.songs.id(song).tasks.id(task._id).remove()

    try {
        await user.save()

        res.status(200).json(task)
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

export const createUser = async (req, res) => {
    const {username, password, albumTitle, tasks, songs } = req.body
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = new User({
        username,
        password: hashedPassword,
        albumTitle,
        tasks,
        songs
    });
    try {
        await newUser.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}